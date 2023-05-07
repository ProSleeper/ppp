const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const dateUtil = require("../util/date_helper");
const { numberWithCommas, removeCommas, createDir, checkNumber } = require("../util/common_utils.js");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/CCC.json"), "utf8"));

//path
const d_path = path.join(__dirname, config.path.store.day);
const m_path = path.join(__dirname, config.path.store.month);
const y_path = path.join(__dirname, config.path.store.year);
const s_path = path.join(__dirname, config.path.store.sale);

const headers = config.headers;

const urls_header_col = (() => {
    for (let index = 0; index < headers[0].length; index++) {
        const header_name = headers[0][index];
        if (header_name === "URL") {
            return index;
        }
    }
})();

//여기 부분
const logicFunc = (data, workBook, sheet, fileName, curr_date, range) => {
    const curr_data_s_r = range.s.r + 2;
    let curr_e_r = range.e.r;
    const newColIdx = XLSX.utils.encode_col(range.e.c + 1); // 새로운 열 인덱스
    const cellRef = newColIdx + (range.s.r + 1); // 셀 참조
    sheet[cellRef] = { v: curr_date.toString(), t: "s" }; // 시간 입력.
    const alarmData = [];
    data.forEach((product) => {
        let inputRow = curr_e_r + 1;
        for (let curr_data_row = curr_data_s_r; curr_data_row <= inputRow; curr_data_row++) {
            const find_url_cell = XLSX.utils.encode_col(urls_header_col) + curr_data_row;
            // console.log(product.url);
            // console.log(sheet[find_url_cell].v);
            if (sheet[find_url_cell] && product.url === sheet[find_url_cell].v) {
                const curr_price = removeCommas(product.price);
                const prev_price = removeCommas(sheet[XLSX.utils.encode_col(range.e.c) + curr_data_row].v);
                if (curr_price < prev_price) {
                    alarmData.push({
                        ...product,
                        curr_price: curr_price,
                        prev_price: prev_price,
                        check_date: dateUtil.YYYYMMDDHHMM(dateUtil.KST()),
                    });
                }

                inputRow = curr_data_row;
                curr_e_r--;
                break;
            }
        }

        let obj_count = 0;
        Object.keys(product).forEach((key) => {
            if (key !== "price") {
                const productCellRef = XLSX.utils.encode_col(obj_count++) + inputRow; // 셀 참조
                sheet[productCellRef] = { v: product[key], t: "s" }; // 데이터 삽입
            }
        });

        const newPrice = newColIdx + inputRow; // 셀 참조
        sheet[newPrice] = { v: numberWithCommas(product.price), t: "s" }; // 데이터 삽입
        curr_e_r++;
    });
    range.e.c++; // 시트의 끝 열 인덱스 갱신
    range.e.r = curr_e_r < range.e.r ? range.e.r : curr_e_r; //현재 url list가 삭제되어서 이전 list의 크기보다 작아도 이전 list의 값도 모두 보존하기 위한 조건.
    sheet["!ref"] = XLSX.utils.encode_range(range); // 시트의 범위 갱신
    workBook.Sheets[config.sheetName] = sheet;
    XLSX.writeFile(workBook, fileName);
    alarmData.length > 0 && writeToAlarm(alarmData);
};

const fileCreate = (path, date_callback, defaultHeaders = headers) => {
    let workBook, sheet;
    const fileName = path + date_callback(dateUtil.KST()) + ".xlsx";
    let sheetName = config.sheetName;
    if (fs.existsSync(fileName)) {
        workBook = XLSX.readFile(fileName);
        sheetName = workBook.SheetNames[0];
        sheet = workBook.Sheets[sheetName];
    } else {
        createDir(fileName);
        workBook = XLSX.utils.book_new();
        sheet = XLSX.utils.aoa_to_sheet(defaultHeaders);
        XLSX.utils.sheet_add_aoa(sheet, [[]], { origin: -1 }); // 데이터를 시트에 추가
        workBook.Sheets[sheetName] = sheet;
        workBook.SheetNames.push(sheetName);
    }
    return [workBook, sheet, fileName];
};

const writeToAlarm = (data) => {
    const arrHeaders = ["brand", "url", "title", "curr_price", "prev_price", "check_date"];
    const [workBook, sheet, fileName] = fileCreate(
        s_path,
        () => {
            return "saleHistory";
        },
        [arrHeaders]
    );

    const range = XLSX.utils.decode_range(sheet["!ref"]); //행과 열의 최대 index

    data.forEach((product) => {
        range.e.r++;
        arrHeaders.forEach((header, index) => {
            const headerCellRef = XLSX.utils.encode_col(index) + range.e.r; // 셀 참조
            sheet[headerCellRef] = { v: product[header], t: "s" }; // 데이터 삽입
        });
    });
    sheet["!ref"] = XLSX.utils.encode_range(range); // 시트의 범위 갱신
    workBook.Sheets[config.sheetName] = sheet;
    XLSX.writeFile(workBook, fileName);
};

const writeToDaily = (data) => {
    let oldData = [];
    const curr_KST = dateUtil.KST();
    const curr_date = dateUtil.HHMM(curr_KST);
    const oldFileName = d_path + dateUtil.YESTERDAY(curr_KST) + ".xlsx";

    if (fs.existsSync(oldFileName)) {
        oldData = oldFileProcess(oldFileName);
    }
    const [workBook, sheet, fileName] = fileCreate(d_path, dateUtil.YYYYMMDD);
    const range = XLSX.utils.decode_range(sheet["!ref"]); //행과 열의 최대 index

    logicFunc(data, workBook, sheet, fileName, curr_date, range);
    // checkP(data, sheet, range);
};

const oldFileProcess = (oldFileName) => {
    const workbook = XLSX.readFile(oldFileName);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet["!ref"]); //행과 열의 최대 index

    const startRow = range.s.r + 2;
    const endRow = range.e.r;
    const startCol = range.s.c;
    const endCol = range.e.c;
    const priceStartCol = range.s.c + 3;

    // 파싱 시간 입력.
    const totalData = [];
    for (let curr_data_row = startRow; curr_data_row <= endRow; curr_data_row++) {
        const rowData = {};

        config.headers[0].forEach((header, index) => {
            const nameCell = XLSX.utils.encode_col(startCol + index) + curr_data_row; // 셀 참조
            rowData[header.toLowerCase()] = sheet[nameCell].v;
        });
        //헤더 입력.

        let minValue = 1000000000;
        for (let curr_data_col = priceStartCol; curr_data_col <= endCol; curr_data_col++) {
            const nameCell = XLSX.utils.encode_col(curr_data_col) + curr_data_row; // 셀 참조
            const colValue = checkNumber(sheet[nameCell]);
            minValue = Math.min(minValue, colValue);
        }
        rowData["price"] = minValue;
        totalData.push(rowData);
    }
    writeToMothly(totalData);
    fs.unlinkSync(oldFileName);
    return totalData;
};

const writeToMothly = (data) => {
    const curr_date = dateUtil.YESTERDAY(dateUtil.KST());
    const [workBook, sheet, fileName] = fileCreate(m_path, dateUtil.YYYYMM);
    const range = XLSX.utils.decode_range(sheet["!ref"]); //행과 열의 최대 index

    logicFunc(data, workBook, sheet, fileName, curr_date, range);
};

module.exports = {
    writeToDaily,
};
    
