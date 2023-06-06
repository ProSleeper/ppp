const { fetchHtml, get_title, isValidURL, fullAddress } = require("./va_utils.js");
const va_data = require("./va_data.js");
const va_data_repo = require("./va_data_repo.js");

const StoreVAUrl = async (urls) => {
    try {
        const arr_url = urls.split(" ");
        for (const url of arr_url) {
            const full_url = fullAddress(url);
            if (await isValidURL(full_url)) {
                const html = await fetchHtml(full_url);
                const title = get_title(html) || full_url;
                const va_obj = new va_data(title, full_url);
                const result = await va_data_repo.save(va_obj);
            }
        }
        return true;
    } catch (error) {
        return false;
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

const MoveAndDeleteUrl = async (receive_remove_url) => {
    const result = await va_data_repo.move(receive_remove_url);
    await RemoveVAUrl(receive_remove_url);
    return true;
};

module.exports = {
    StoreVAUrl,
    MoveAndDeleteUrl,
    GetOneVAUrl,
    GetTotalVAUrl,
    RemoveVAUrl,
};
