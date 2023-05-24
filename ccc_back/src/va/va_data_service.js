const { fetchHtml, get_title, isValidURL, fullAddress } = require("./va_utils.js");
const va_data = require("./va_data.js");
const va_data_repo = require("./va_data_repo.js");
const deleted_va_data_repo = require("./deleted_va_data_repo.js");

const StoreVAUrl = async (url) => {
    const full_url = fullAddress(url);
    try {
        if (!(await isValidURL(full_url))) {
            return false;
        }
    } catch (error) {
        return false;
    }
    try {
        const html = await fetchHtml(full_url);
        const title = get_title(html) || full_url;
        const va_obj = new va_data(title, full_url);
        return await va_data_repo.save(va_obj);
    } catch (error) {
        console.error("Error:", error);
    }
};

const GetTotalVAUrl = async () => {
    return await va_data_repo.findAll();
};

const RemoveVAUrl = async (url) => {
    return await va_data_repo.remove(url);
};

const GetOneVAUrl = async (url) => {
    return await va_data_repo.findByUrl(url);
};

const StoreDeletedVAUrl = async (title, url) => {
    const url_obj = new va_data(title, url);
    const result = await deleted_va_data_repo.save(url_obj);
    return true;
};

module.exports = {
    StoreVAUrl,
    StoreDeletedVAUrl,
    GetOneVAUrl,
    GetTotalVAUrl,
    RemoveVAUrl,
};
