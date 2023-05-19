const cb = () => {
    console.log("callback");
};

const exec = (cb) => {
    cb();
};

exec(cb);

console.log("end");
