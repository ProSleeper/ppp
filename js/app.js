console.log('I am running!');

Notification.requestPermission().then((status) => {
    console.log("Notification 상태", status);

    if (status === "denied") {
        alert("Notification 거부됨");
    } else {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register("/ppp/sw.js", { scope: "/ppp/" });
        }
    }
});