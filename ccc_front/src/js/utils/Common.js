// import {
//     isWindows,
//     isAndroid,
//     isMacOs,
//     isBrowser,
//     isDesktop,
//     isWinPhone,
//     isMobile,
//     isIOS,
//     isConsole,
//     isFirefox,
//     isTablet,
//     isChrome,
//     isSafari,
//     isEdge,
//     osVersion,
//     osName,
//     browserName,
//     mobileVendor,
//     deviceType,
//     deviceDetect,
// } from "react-device-detect";

/*
const device_check = () => {
    console.log("isWindows: " + isWindows);
    console.log("isMacOs: " + isMacOs);
    console.log("isBrowser: " + isBrowser);
    console.log("isDesktop: " + isDesktop);
    console.log("isMobile: " + isMobile);
    console.log("isTablet: " + isTablet);
    console.log("isConsole: " + isConsole);
    console.log("isAndroid: " + isAndroid);
    console.log("isIOS: " + isIOS);
    console.log("isWinPhone: " + isWinPhone);
    console.log("isChrome: " + isChrome);
    console.log("isFirefox: " + isFirefox);
    console.log("isSafari: " + isSafari);
    console.log("isEdge: " + isEdge);
    console.log("osVersion: " + osVersion);
    console.log("osName: " + osName);
    console.log("browserName: " + browserName);
    console.log("mobileVendor: " + mobileVendor);
    console.log("deviceType: " + deviceType);
    console.log("deviceDetect: " + deviceDetect);
};
*/

// import { isWindows } from "react-device-detect";

export const store_url = (event, url, reqUrl, url_data) => {
    event && event.preventDefault();
    //req_url,
    //나는 이 조건 부분을 서버의 구동(window에서 express를 구동하는지 android linux에서 구동하는지를 판단하라고 적은건데) 그게 아니라
    //클라이언트의 구동(브라우저를 실행하는 os, 즉 클라이언트)os를 판단하는거라서 아무 의미가 없는 코드였다.
    //추후에 수정하자.
    // const reqUrl = (isWindows && "http://127.0.0.1:4000/add_url") || "http://manyo.hopto.org/add_url";
    // console.log("isWindows: " + isWindows);

    // console.log(reqUrl);
    fetch(reqUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("Network response was not ok");
        })
        .then((result) => {
            if (result) {
                print_url_list(url_data.setData, url_data.print_total_url);
                // print_url_list(setData, print_total_url);
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export const print_url_list = (setData, reqUrl) => {
    //나는 이 조건 부분을 서버의 구동(window에서 express를 구동하는지 android linux에서 구동하는지를 판단하라고 적은건데) 그게 아니라
    //클라이언트의 구동(브라우저를 실행하는 os, 즉 클라이언트)os를 판단하는거라서 아무 의미가 없는 코드였다.
    //추후에 수정하자.
    // const reqUrl = (isWindows && "http://127.0.0.1:4000/print_total_url") || "http://manyo.hopto.org/print_total_url";
    fetch(reqUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok");
        })
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error(error);
        });
};

export const remove_url = (url, reqUrl) => {
    //나는 이 조건 부분을 서버의 구동(window에서 express를 구동하는지 android linux에서 구동하는지를 판단하라고 적은건데) 그게 아니라
    //클라이언트의 구동(브라우저를 실행하는 os, 즉 클라이언트)os를 판단하는거라서 아무 의미가 없는 코드였다.
    //추후에 수정하자.
    // const reqUrl = (isWindows && "http://127.0.0.1:4000/remove_url") || "http://manyo.hopto.org/remove_url";
    return new Promise((resolve, reject) => {
        fetch(reqUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error("Network response was not ok");
            })
            .then((result) => {
                if (result) {
                    // print_url_list(setData);
                    resolve();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });
};

// export default {
//     handleSubmit,
//     print_url_list,
// };