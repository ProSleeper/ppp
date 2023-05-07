const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const fetchHtml = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if (!error && response.statusCode === 200) {
                resolve(html);
            } else {
                reject(error);
            }
        });
    });
};

const extractData = (html, other_data, elem) => {
    const $ = cheerio.load(html);

    const findSelector = (selectors, cb) => {
        for (const selector of selectors) {
            const value = $(selector).first().text();
            return value && cb(value);
        }
        console.log("not exist element");
    };

    return {
        brand: other_data.parse_brand,
        url: other_data.url,
        title: findSelector(elem.title, (str) => str.trim()),
        price: findSelector(elem.price, removeCommas),
    };
};

const removeCommas = (x) => {
    return Number(
        x
            .toString()
            .trim()
            .match(/[0-9]*/g)
            .join("")
    );
};

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const readJsonData = (urlData) => {
    // const brands = Object.entries(urlData).map(([brand, urls]) => {
    //     const brandUrls = ...urls.map((url) => {
    //         return url;
    //     });
    // });

    const urls = [];
    for (const key in urlData) {
        urls.push(
            ...urlData[key].map((brands) => {
                return brands;
            })
        );
    }
    return urls;
};

const parse_brand = (brands, url) => {
    for (const brand of brands) {
        const brandRegex = new RegExp(`${brand}`, "g");
        if (brandRegex.test(url)) {
            return brand;
        }
    }
};

const createDir = (filePath) => {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        // 경로에 해당하는 디렉토리가 존재하지 않을 때
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
};

const checkNumber = (value) => {
    try {
        return Number(
            value &&
                value.v &&
                    value.v
                        .toString()
                        .match(/[0-9]+/g)
                        .join("")
        );
    } catch (error) {
        console.log(error);
    }
};;

module.exports = {
    fetchHtml,
    extractData,
    readJsonData,
    numberWithCommas,
    removeCommas,
    parse_brand,
    createDir,
    checkNumber,
};
