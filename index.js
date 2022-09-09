console.log(1);
new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        console.log(3);
    }, 0);
    for (let i = 0; i < 1000; i++) {
        resolve();
    }
    reject();
    console.log(4);
})
    .then(() => {
        console.log(5);
    })
    .catch(() => {
        console.log(7);
    });
setTimeout(
    (function () {
        console.log(6);
    })(),
    0
);
