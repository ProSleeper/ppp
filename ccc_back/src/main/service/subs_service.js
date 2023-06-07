const subscriber_data = require("../entity/subscriber_data.js");
const subscriber_data_repo = require("../repository/subscriber_data_repo.js");

const add_subscriber = async (subscriber) => {
    try {
        const {
            cookie,
            endpoint,
            expiration_time,
            keys: { p256dh, auth },
        } = subscriber;
        console.log(subscriber);
        const subs_obj = new subscriber_data(cookie, endpoint, expiration_time, p256dh, auth);
        console.log(subs_obj);
        const result = await subscriber_data_repo.save(subs_obj);
        return true;
    } catch (error) {
        return false;
    }
};

const get_total_subscriber = async () => {
    return await url_data_repo.findAll();
};

const getget_one_subscriber = async (url) => {
    return await url_data_repo.findByUrl(url);
};

const remove_subscriber = async (url) => {
    return await url_data_repo.remove(url);
};

module.exports = {
    add_subscriber,
    get_total_subscriber,
    getget_one_subscriber,
    remove_subscriber,
};
