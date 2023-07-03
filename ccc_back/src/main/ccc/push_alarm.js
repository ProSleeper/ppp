const webpush = require("web-push");

const push_alarm = async (product_sale_list, total_subscriber_list) => {
    const keys = {
        publicKey: "BKA9rsMuwAfknd92kUS5-PbL2A7P-viDmPh3WxtlrDo-tGH4D-E1H4jrJJRkCm0UBdiDN7Ikw5K35JoaSYVFcAA",
        privateKey: "VKFjaad1SbEcmv3dA4OYBVstwZq8CAeSWuHbMIv46bI",
    };

    webpush.setVapidDetails("mailto:ingn@nate.com", keys.publicKey, keys.privateKey);
    const wrong_subs_obj = [];

    // product_sale_list는 아래 배열 처럼 출력 됨.
    // [
    //     {
    //         brand: "spao",
    //         title: "[데일리지] 루즈핏 진_SPTJD23C52",
    //         url: "https://spao.com/product/%EB%8D%B0%EC%9D%BC%EB%A6%AC%EC%A7%80-%EB%A3%A8%EC%A6%88%ED%95%8F-%EC%A7%84sptjd23c52/10010/category/187/display/1/",
    //         change_date: "2023-06-07 15:00:00",
    //         sale_price: 19900,
    //         prev_price: 29900,
    //     },
    //     {
    //         brand: "spao",
    //         title: "[데일리지] 루즈핏 진_SPTJD23C52",
    //         url: "https://spao.com/product/%EB%8D%B0%EC%9D%BC%EB%A6%AC%EC%A7%80-%EB%A3%A8%EC%A6%88%ED%95%8F-%EC%A7%84sptjd23c52/10010/category/187/display/1/",
    //         change_date: "2023-06-07 15:00:00",
    //         sale_price: "39900",
    //         prev_price: "49900",
    //     },
    // ];
    // product_sale_list = [];
    // product_sale_list.push(1);
    // product_sale_list.push(2);
    for (const subscriber_data of total_subscriber_list) {
        for (const sale_data of product_sale_list) {
            try {
                await webpush.sendNotification(
                    {
                        endpoint: subscriber_data.endpoint,
                        keys: {
                            p256dh: subscriber_data.p256dh,
                            auth: subscriber_data.auth,
                        },
                    },
                    sale_data.title
                    // sale_data.url
                    // JSON.stringify(product_sale_list)
                );
            } catch (error) {
                //다른 에러도 발생하겠지만, 보통 사용자의 구독 정보가 삭제, 변경되면 발생하는 에러가 출력된다.
                // console.error(error); // 에러 출력이 너무 길어서 주석
                console.error(`${subscriber_data.cookie} : 이 쿠키값의 구독객체 삭제, 변경 발생.`);
                wrong_subs_obj.push(subscriber_data.endpoint);
                //여기에는 이 구독객체의 정보를 삭제하는 코드나 list에 저장해서 오류 난 값을 db에서 삭제가 가능하도록 하자.
            }
        }
    }
    return wrong_subs_obj;
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

module.exports = {
    push_alarm,
};

// test_main();
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
