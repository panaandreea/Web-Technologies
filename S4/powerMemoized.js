function powerMemoized() {
    const cache = {};

    const power = (base, exponent) => {
        const key = `${base}^${exponent}`;
        if (cache[key] !== undefined) {
            console.log(`Found in cache: ${key} = ${cache[key]}`);
            return cache[key];
        }

        if (exponent === 0) {
            cache[key] = 1;
        } else if (exponent === 1) {
            cache[key] = base;
        } else {
            console.log(`Calculating: ${key}`);
            cache[key] = base * power(base, exponent - 1);
        }

        return cache[key];
    };

    return power;
}

// test
const pow = powerMemoized();

console.log(pow(2, 4)); 
console.log(pow(2, 3)); 
console.log(pow(3, 3)); 
console.log(pow(2, 4)); 
