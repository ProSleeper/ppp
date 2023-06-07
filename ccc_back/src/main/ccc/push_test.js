const webpush = require("web-push");
const subs_service = require("../service/subs_service.js");
const { connection } = require("../repository/mysql_connector.js");

const test_main = async () => {
    const keys = {
        publicKey: "BKA9rsMuwAfknd92kUS5-PbL2A7P-viDmPh3WxtlrDo-tGH4D-E1H4jrJJRkCm0UBdiDN7Ikw5K35JoaSYVFcAA",
        privateKey: "VKFjaad1SbEcmv3dA4OYBVstwZq8CAeSWuHbMIv46bI",
    };

    webpush.setVapidDetails("mailto:ingn@nate.com", keys.publicKey, keys.privateKey);

    const total_subs_data_list = await subs_service.get_total_subscriber();
    // console.log(total_subs_data_list);

    for (const subscriber_data of total_subs_data_list) {
        await webpush.sendNotification(
            {
                endpoint: subscriber_data.endpoint,
                keys: {
                    p256dh: subscriber_data.p256dh,
                    auth: subscriber_data.auth,
                },
            },
            `mycookie_value: ${subscriber_data.cookie}`
        );
    }
    connection.end();

    //단순 텍스트만 푸시 보내기
    // webpush.sendNotification(
    //     {
    //         endpoint: user_endpoint,
    //         keys: {
    //             p256dh: user_p256dh,
    //             auth: user_auth,
    //         },
    //     },
    //     "sensitive cream!!"
    // );
};

test_main();
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

// INSERT INTO subscriber_data (created, cookie, endpoint, expiration_time, p256dh, auth) VALUES (now(), 'ck1701322967015439al', 'https://fcm.googleapis.com/fcm/send/ckhJbbEIsDA:APA91bGnuEBiWTXA4AI24mv44t0rQt1uznP7wCMv-bG7vtqVKREZUGzj1svbRr6v_lQB8uWOoKKZAOs6dUswsdzVLAXXvKsp7ZR-99jL46tjBBx-lcxvhKtzA9HH4eyPDaKwWo5fVdfd',NULL,'BHxhwcLOof4L-dKh5uDt3VBXBc6kx2VAW4uv_ZbSHVRjoRTPcFJT4hEurAEk6SCzASl5GKlVvCnvBmAhgNedy9o','CRrXVbHZ5iPemuve2o-YGw'),(now(), 'ck1701322993190917al' , 'https://fcm.googleapis.com/fcm/send/dk11zxOokBA:APA91bHaSRGoh-uGUWxoh5I3FKJvt3oLJ0VWdLDOK-SJuxUWdK0T2W8TSdDAgK2AEf0bhXF60GuIF2ilCLiQe4xHlxfRyVZ3h9cRWdmxdjJ6axEcWlDaglfKE0cl46Ubt-E7b2zHUVgP'          , NULL           , 'BMHPRZhqCbu7q6T4HNtlCbxtipL6cB9EQ4UXVPL5MOxNuLPgQkRVUU3r74o-rtVfhrBn3xiEB5kf3UHq6o6xLUw','d67jFHdRJEwjf5i4vzRfJw'),(now(),'ck1701323233232017al' , 'https://web.push.apple.com/QBAvv3LUqJQR-8GMhrv3juzNhbZvCR--P_R95eT2fkX9omYv3gq59SxwfexPBrGVyAdgN80AsJQlqOl-Rz10BwX15OfgIUKZQTItd1tIaXo6JsKaCxjGXQJauxpT0FKY5oXO6Mr54bZszi4u-b6zHE4agb5RWPbgrVCn_BA_66A' , NULL            , 'BNnbRcsfblcKZ68otF-lcgivTglcoqrtSXZF6Ixz-6ayiqqODodIFwI_PttnN_oqygYSAYZVrNmsvbMY3muL0iU' , 'uksqXOMksH93dCRe6Rew0Q');
