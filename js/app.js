console.log('I am running!');

Notification.requestPermission().then((status) => {
    console.log("Notification ����", status);

    if (status === "denied") {
        alert("Notification �źε�");
    }
});