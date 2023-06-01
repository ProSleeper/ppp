// Home.js

import React from "react";
import { Button } from "react-bootstrap";

const Home = () => {
    const notiFunc = () => {
        navigator.serviceWorker.ready.then((registration) => {
            registration.pushManager.getSubscription().then((subscription) => {
                if (subscription) {
                    //save subscription on DB
                    console.log("old");
                    console.log(subscription);
                } else {
                    registration.pushManager
                        .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey:
                                "BKA9rsMuwAfknd92kUS5-PbL2A7P-viDmPh3WxtlrDo-tGH4D-E1H4jrJJRkCm0UBdiDN7Ikw5K35JoaSYVFcAA",
                        })
                        .then((subscription) => {
                            //save subscription on DB
                            console.log("new");
                            console.log(subscription);

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
