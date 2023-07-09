// Home.js

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import UrlTableSale from "./../module/Url_table_sale";

const Home = () => {
    const use_url = process.env.REACT_APP_API_URL;

    const store_subscriber_url = use_url + "/store_push_subs_data";

    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        // 쿠키가 이미 존재하는지 확인
        const isCookieExists = cookies.push_alarm_cookie !== undefined;

        if (isCookieExists) {
            // 동일한 이름의 쿠키가 이미 존재하는 경우의 처리
            console.log("cookie exist");
            console.log(cookies.push_alarm_cookie);
        } else {
            // 쿠키를 설정
            const value = "ck" + (Date.now() * 1000 + Date.now() * 9) + "al";
            setCookie("push_alarm_cookie", value);
        }
    }, []);

    const store_sub = (reqUrl, subscriber) => {
        const user_subs_data = { cookie: cookies.push_alarm_cookie, ...subscriber.toJSON() };

        fetch(reqUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(subscriber),
            body: JSON.stringify(user_subs_data),
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error("Network response was not ok");
            })
            .then((result) => {
                if (result) {
                    console.log("store_subscriber_ok");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const notiFunc = () => {
        navigator.serviceWorker.ready.then((registration) => {
            registration.pushManager.getSubscription().then((subscription) => {
                if (subscription) {
                    //save subscription on DB
                    store_sub(store_subscriber_url, subscription);
                } else {
                    registration.pushManager
                        .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey:
                                "BKA9rsMuwAfknd92kUS5-PbL2A7P-viDmPh3WxtlrDo-tGH4D-E1H4jrJJRkCm0UBdiDN7Ikw5K35JoaSYVFcAA",
                        })
                        .then((subscription) => {
                            store_sub(store_subscriber_url, subscription);
                            //save subscription on DB
                        });
                }
            });
        });
    };

    const print_total_url = use_url + "/print_total_sale_data";
    const remove_url = use_url + "/remove_sale_data";

    const table_header = {
        brand: "Brand",
        title: "Title",
        url: "Url",
        change_date: "Change Date",
        sale_price: "Sale Price",
        prev_price: "Prev Price",
        low_high_price:"Low High Price",
        delete: "Delete",
    };

    const [data, setData] = useState([]);
    const url_data = {
        data: data,
        setData: setData,
        print_total_url: print_total_url,
    };

    return (
        <div>
            <h1>Welcome to Home</h1>
            <Button
                className="col-md-2 offset-sm-5 btn-submit"
                onClick={() => notiFunc()}
                variant="primary"
                type="button"
            >
                Notification
            </Button>
            <UrlTableSale table_header={table_header} url_data={url_data} remove_va_url={remove_url}></UrlTableSale>
        </div>
    );
};

export default Home;