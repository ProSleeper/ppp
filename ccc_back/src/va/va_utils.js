const request = require("request");
const cheerio = require("cheerio");
const fetchHtml = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if ((!error && response.statusCode === 200) || error.code == "ECONNRESET") {
                resolve(html);
            } else {
                reject(error);
            }
        });
    });
};

const fullAddress = (url) => {
    const brandRegex = new RegExp(/^(http:\/\/|https:\/\/).*$/, "g");
    if (!brandRegex.test(url)) {
        url = "http://" + url;
    }

    return url;
};

const isValidURL = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if ((!error && response.statusCode === 200) || error.code == "ECONNRESET") {
                resolve(true);
            } else {
                reject(error);
            }
        });
    });
};

const get_title = (html) => {
    if (html === undefined) {
        return html;
    }

    const $ = cheerio.load(html);
    const title = $("title").text();

    return title;
};

module.exports = {
    fetchHtml,
    get_title,
    isValidURL,
    fullAddress,
};
