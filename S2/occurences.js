function occurrences(text, character) {
    //return text.split(character).length-1;
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === character) {
            count++;
        }
    }
    return count;
}

//let occurences = (text,character) => text.split(character).length-1;
console.log(occurrences("sample text", "e"));


function copyNumbers(numbers) {
    let result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(numbers[i]);
    }

    return result;
}

console.log(copyNumbers([1, 2, 3, 4, 5]));

