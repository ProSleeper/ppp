console.log('I am running!');

Notification.requestPermission().then((status) => {
    console.log("Notification 상태", status);

    if (status === "denied") {
        alert("Notification 거부됨");
    }
});