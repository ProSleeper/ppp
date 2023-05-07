import { isAndroid, isMacOs, isWindows } from "react-device-detect";

const handleSubmit = (event, url) => {
    event && event.preventDefault();

    const reqUrl = (isWindows && "http://127.0.0.1:4000/add_url") || "http://manyo.hopto.org/add_url";
    console.log(reqUrl);
    fetch(reqUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            throw new Error("Network response was not ok");
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
};

export default handleSubmit;
