const sumDivisible = (numbers, divisor) => {
    return numbers
        .filter(num => num % divisor === 0)   
        .reduce((sum, num) => sum + num, 0);   
};

const numbers = [5, 10, 12, 20, 7, 40];
const divisor = 5;

const result = sumDivisible(numbers, divisor);
console.log(`Suma numerelor divizibile cu ${divisor} este:`, result);
