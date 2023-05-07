const dateUtil = require("./util/date_helper");
const https = require("https");
const XLSX = require("xlsx");
const KST = (() => {
    const curr = new Date();
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    return new Date(utc + KR_TIME_DIFF);
})();

const url = `https://raw.githubusercontent.com/ProSleeper/CCC/main/sale/saleHistory.xlsx`;
const token = "my_github_api_token";

const options = {
    method: "GET",
    headers: {
        Authorization: `token ${token}`,
        "User-Agent": "node.js",
    },
};

https
    .get(url, options, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed to fetch data. Status code: ${response.statusCode}`);
            return;
        }
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
            const buffer = Buffer.concat(chunks);
            const workbook = XLSX.read(buffer, { type: "buffer" });
            // 엑셀 파일 파싱 결과를 이용하여 필요한 작업을 수행합니다.
            XLSX.writeFile(workbook, "output.xlsx");
        });
    })
    .on("error", (error) => {
        console.error("Error fetching data:", error);
    });
