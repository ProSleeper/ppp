console.log('I am running!');

Notification.requestPermission().then((status) => {
    console.log("Notification ����", status);

    if (status === "denied") {
        alert("Notification �źε�");
    } else {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register("/ppp/sw.js", { scope: "/ppp/" });
        }
    }
});