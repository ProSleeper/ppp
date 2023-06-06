const webpush = require("web-push");

module.exports = (app) => {
    const keys = {
        publicKey: process.env.WEB_PUSH_PUK,
        privateKey: process.env.WEB_PUSH_PRK,
    };

    webpush.setVapidDetails("mailto:ingn@nate.com", keys.publicKey, keys.privateKey);

    app.post("/store_push_sub_data", async (req, res) => {
        console.log(req.body);
        const user_endpoint = req.body.endpoint;
        const user_p256dh = req.body.keys.p256dh;
        const user_auth = req.body.keys.auth;

        //단순 텍스트만 푸시 보내기
        webpush.sendNotification(
            {
                endpoint: user_endpoint,
                keys: {
                    p256dh: user_p256dh,
                    auth: user_auth,
                },
            },
            "sensitive cream!!"
        );

        //json 보내기
        //json으로 보내면 클라이언트에서도 json을 받는 부분이 있어야 한다.
        // webpush.sendNotification(
        //     {
        //         endpoint: user_endpoint,
        //         keys: {
        //             p256dh: user_p256dh,
        //             auth: user_auth,
        //         },
        //     },
        //     JSON.stringify({title:"Hello world!", body:"Nice to meet you!"});
        // );
        res.send("sub store ok");
    });
};
