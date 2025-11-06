const average = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

const values = [10, 20, 30, 40, 50];
console.log("Media numerelor este:", average(values));
