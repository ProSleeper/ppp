class subscriber_data {
    constructor(cookie, endpoint, expiration_time, p256dh, auth) {
        this.data = {
            cookie: cookie,
            endpoint: endpoint,
            expiration_time: expiration_time,
            p256dh: p256dh,
            auth: auth,
        };
    }
}

module.exports = subscriber_data;
