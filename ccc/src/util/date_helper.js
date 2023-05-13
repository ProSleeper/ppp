// dateUtil.js
const pad = (number, length) => {
    var str = "" + number;
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
};

const YYYYMMDDHHMMSS = (date) => {
    var ss = pad(date.getSeconds(), 2);

    return YYYYMMDDHHMM(date) + ss;
};

const YYYYMMDDHHMM = (date) => {
    var hh = pad(date.getHours(), 2);
    var mm = pad(date.getMinutes(), 2);

    return YYYYMMDD(date) + hh + mm;
};

const HHMM = (date) => {
    var hh = pad(date.getHours(), 2);
    var mm = pad(date.getMinutes(), 2);

    return hh + ":" + mm;
};

const HH = (date) => {
    var hh = date.getHours();
    return hh;
};
const YYYYMMDD = (date) => {
    var dd = pad(date.getDate(), 2);

    return YYYYMM(date) + dd;
};

const YYYYMM = (date) => {
    var yyyy = date.getFullYear().toString();
    var MM = pad(date.getMonth() + 1, 2);

    return yyyy + MM;
};

const YESTERDAY = (date) => {
    const yesterday = KST();
    yesterday.setDate(date.getDate() - 1);
    var yyyy = yesterday.getFullYear().toString();
    var MM = pad(yesterday.getMonth() + 1, 2);
    var dd = pad(yesterday.getDate(), 2);

    return yyyy + MM + dd;
};

const KST = () => {
    const curr = new Date();
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    return new Date(utc + KR_TIME_DIFF);
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
};
