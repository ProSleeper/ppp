// const my_promise = new Promise();

// console.log(my_promise);

class MyPromise {
    constructor(excutor) {
        try {
            excutor((resolve, reject) => {
                resolver = resolve;
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const my_promise = new MyPromise();
