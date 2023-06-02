const fs = require("fs");
const path = require("path");
const url_data = require("../entity/url_data.js");
const url_data_repo = require("../repository/url_data_repo.js");
const { isValidURL, fullAddress } = require("../va/va_utils.js");

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/CCC.json"), "utf8"));
const brand_list = Object.keys(config.parse_brand_selector);

const parse_brand = (url) => {
    for (const brand of brand_list) {
        const brandRegex = new RegExp(`${brand}`, "g");
        if (brandRegex.test(url)) {
            return brand;
        }
    }
};

const add_url = async (urls) => {
    try {
        const arr_url = urls.split(" ");
        for (const url of arr_url) {
            const full_url = fullAddress(url);
            if (await isValidURL(full_url)) {
                const url_obj = new url_data(parse_brand(full_url), full_url);
                const result = await url_data_repo.save(url_obj);
            }
        }
        return true;
    } catch (error) {
        return false;
    }
};

const get_total_url = async () => {
    return await url_data_repo.findAll();
};

const get_one_url = async (url) => {
    return await url_data_repo.findByUrl(url);
};

const remove_url = async (url) => {
    return await url_data_repo.remove(url);
};

const move_and_delete_url = async (receive_remove_url) => {
    const result = await url_data_repo.move(receive_remove_url);
    await remove_url(receive_remove_url);
    return true;
};

module.exports = {
    add_url,
    move_and_delete_url,
    get_total_url,
    get_one_url,
    remove_url,
};
