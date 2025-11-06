function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0, b = 1, c;

    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }

    return b;
}

let n = parseInt(process.argv[2]);
console.log(`Elementul de ordin ${n} al sirului lui Fibonacci este: ${fibonacci(n)}`);
