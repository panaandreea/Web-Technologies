const sortByKey = (array, key) => {
    return array.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
};


const people = [
    { name: "Ana", age: 25 },
    { name: "Mihai", age: 19 },
    { name: "Andreea", age: 22 },
    { name: "Bogdan", age: 30 }
];

console.log("Sortare după nume:");
console.log(sortByKey(people, "name"));

console.log("\nSortare după vârstă:");
console.log(sortByKey(people, "age"));
