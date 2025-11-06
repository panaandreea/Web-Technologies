const reduce = (array, reducer, initialValue) => {
    let accumulator = initialValue;

    for (const element of array) {
        accumulator = reducer(accumulator, element);
    }

    return accumulator;
};

const numbers = [1, 2, 3, 4, 5];

const sum = reduce(numbers, (acc, curr) => acc + curr, 0);
console.log("Suma:", sum);


const product = reduce(numbers, (acc, curr) => acc * curr, 1);
console.log("Produsul:", product);
