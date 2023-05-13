const { query_exec } = require("./mysql.js");

const behavior = {
    insert: "INSERT",
    update: "UPDATE",
    delete: "DELETE",
    select: "SELECT",
};
Object.freeze(behavior);

const data = (behavior, brand, url) => {
    return {
        behavior: behavior,
        data: {
            brand: brand,
            url: url,
        },
    };
};

// const request_data = data(behavior.insert, "milk", "MAIL");
// const request_data = data(behavior.update, "hunhul", "undefined");
// const request_data = data(behavior.delete, "", "ftp");
// const request_data = data(behavior.select, "", "");
const insert_product_data = (brand, url) => {
    const request_data = data(behavior.insert, brand, url);

    query_exec(request_data).then((result) => {
        if (result !== null) {
            console.log(result);
        }
    });
};

const select_product_data = (brand = "", url = "") => {
    const request_data = data(behavior.select, brand, url);

    const result = query_exec(request_data);
    if (result !== null) {
        return result;
    }
};

module.exports = {
    insert_product_data,
    select_product_data,
};
