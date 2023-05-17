// dateUtil.js
const pad = (number, length) => {
    let str = "" + number;
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
};

const YYYYMMDDHHMMSS = (date) => {
    const ss = pad(date.getSeconds(), 2);

    return YYYYMMDDHHMM(date) + ss;
};

const YYYYMMDDHHMM = (date) => {
    const hh = pad(date.getHours(), 2);
    const mm = pad(date.getMinutes(), 2);

    return YYYYMMDD(date) + hh + mm;
};

const HHMM = (date) => {
    const hh = pad(date.getHours(), 2);
    const mm = pad(date.getMinutes(), 2);

    return hh + ":" + mm;
};

const HH = () => {
    const hh = KST().getHours();
    return hh;
};
const YYYYMMDD = (date) => {
    const dd = pad(date.getDate(), 2);

    return YYYYMM(date) + dd;
};

const YYYYMM = (date) => {
    const yyyy = date.getFullYear().toString();
    const MM = pad(date.getMonth() + 1, 2);

    return yyyy + MM;
};

const YESTERDAY = (date) => {
    const yesterday = KST();
    yesterday.setDate(date.getDate() - 1);
    const yyyy = yesterday.getFullYear().toString();
    const MM = pad(yesterday.getMonth() + 1, 2);
    const dd = pad(yesterday.getDate(), 2);

    return yyyy + MM + dd;
};

const KST = () => {
    const curr = new Date();
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    return new Date(utc + KR_TIME_DIFF);
};

const Parse_Day = (today) => {
    const day = new Date(today);
    return day.getDate();
};

module.exports = {
    YYYYMMDDHHMMSS,
    YYYYMMDDHHMM,
    HHMM,
    HH, //not padding ex) 1시 -> 01 아니고 1 로 표기
    YYYYMM,
    YYYYMMDD,
    YESTERDAY,
    KST,
    Parse_Day,
};
