const subscriber_data = require("../entity/subscriber_data.js");
const subscriber_data_repo = require("../repository/subscriber_data_repo.js");

const add_subscriber = async (subscriber) => {
    try {
        const {
            cookie,
            endpoint,
            expirationTime,
            keys: { p256dh, auth },
        } = subscriber;
        const expiration_time = expirationTime;
        const subs_obj = new subscriber_data(cookie, endpoint, expiration_time, p256dh, auth);
        console.log(subs_obj);
        const result = await subscriber_data_repo.save(subs_obj);
        return true;
    } catch (error) {
        return false;
    }
};

const get_total_subscriber = async () => {
    return await subscriber_data_repo.findAll();
};

const getget_one_subscriber = async (cookie) => {
    return await subscriber_data_repo.findByCookie(cookie);
};

const remove_subscriber = async (data_obj) => {
    return await subscriber_data_repo.remove(data_obj);
};

const remove_subscriber_by_endpoint = async (data_obj) => {
    return await subscriber_data_repo.removeByEndpoint(data_obj);
};

module.exports = {
    add_subscriber,
    get_total_subscriber,
    getget_one_subscriber,
    remove_subscriber,
    remove_subscriber_by_endpoint,
};
