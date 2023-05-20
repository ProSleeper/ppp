const fs = require("fs");
const path = require("path");
const url_data = require("../entity/url_data.js");
const url_data_repo = require("../repository/url_data_repo.js");

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../config/CCC.json"), "utf8"));
const brand_list = Object.keys(config.parse_brand_selector);

const parse_brand = (url) => {
    for (const brand of brand_list) {
        const brandRegex = new RegExp(`${brand}`, "g");
        if (brandRegex.test(url)) {
            return brand;
        }
    }
};

//프로토콜(ftp:// or https:// 이런 문자열이 없으면 new URL이 타입 에러를 발생시킴. 정규표현식이나 HTTP가 없으면 붙여주는 부분이 필요할듯.)
const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

const add_url = async (url) => {
    if (!isValidURL(url)) {
        return "save fail";
    }
    const url_obj = new url_data(parse_brand(url), url);
    const result = await url_data_repo.save(url_obj);
    return result;
};

module.exports = {
    add_url,
};
