const webpush = require("web-push");
const subs_service = require("../service/subs_service.js");

module.exports = (app) => {
    app.post("/store_push_subs_data", async (req, res) => {
        console.log(req.body);

        await subs_service.add_subscriber(req.body);

        // const user_cookie = req.body.cookie;
        // const user_endpoint = req.body.endpoint;
        // const user_expiration_time= req.body.expirationTime;
        // const user_p256dh = req.body.keys.p256dh;
        // const user_auth = req.body.keys.auth;

        // console.log(user_cookie);
        // console.log(user_endpoint);
        // console.log(user_p256dh);
        // console.log(user_auth);

        res.send("sub store ok");
    });
};
