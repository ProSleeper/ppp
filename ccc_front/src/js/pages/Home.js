// Home.js

import React from "react";
import { Button } from "react-bootstrap";




const Home = () => {
    const use_url = process.env.REACT_APP_API_URL;

    const store_subscriber_url = use_url + "/store_push_sub_data";

    const store_sub = (reqUrl, subscriber) => {
        fetch(reqUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscriber),
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
                    // console.log("old");
                    // console.log(subscription);
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
                            // console.log("new");
                            // console.log(subscription);
                        });
                }
            });
        });
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
        </div>
    );
};


export default Home;
