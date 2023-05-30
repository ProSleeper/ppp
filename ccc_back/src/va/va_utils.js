const request = require("request");
const cheerio = require("cheerio");
const fetchHtml = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if ((!error && response.statusCode === 200) || (error && error.code === "ECONNRESET")) {
                resolve(html);
            } else {
                //url 서버가 불법이거나 이상해서 그런지 접속이 되는데도 403이 뜬다.
                //보통 연속해서 403이 뜨지는 않으니 error === null 일때 statusCode 가 403이면 다시 한번 request하는 방식이 좋을듯.
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
            if ((!error && response.statusCode === 200) || (error && error.code == "ECONNRESET")) {
                resolve(true);
            } else {
                //url 서버가 불법이거나 이상해서 그런지 접속이 되는데도 403이 뜬다.
                //보통 연속해서 403이 뜨지는 않으니 error === null 일때 statusCode 가 403이면 다시 한번 request하는 방식이 좋을듯.
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
