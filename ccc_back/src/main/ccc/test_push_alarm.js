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

// INSERT INTO subscriber_data (created, cookie, endpoint, expiration_time, p256dh, auth) VAL
