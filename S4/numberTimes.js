Number.prototype.times = function (callback) {
    const count = Math.floor(this); 
    for (let i = 0; i < count; i++) {
        callback(i); 
    }
};

(3).times((i) => {
    console.log(`Execuție #${i + 1}`);
});
