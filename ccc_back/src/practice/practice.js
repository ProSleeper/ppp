const subscription = { endpoint: "eee", keys: { p256dh: "ppp", auth: "aaa" } };

const cookies = {
    push_alarm_cookie: "abc123",
};

const subscriber = {
    endpoint: "eee",
    keys: {
        p256dh: "ppp",
        auth: "aaa",
    },
};

const user_subs_data = { cookie: cookies.push_alarm_cookie, ...subscriber };

// console.log(user_subs_data);

const str_usd = JSON.stringify(user_subs_data);

console.log(str_usd);
