function letterFrequencies(text) {
    text = text.replaceAll(" ", "");

    let frequencies = {};

    for (let char of text) {
        if (frequencies[char]) {
            frequencies[char]++;
        } else {
            frequencies[char] = 1;
        }
    }

    let total = text.length;
    for (let char in frequencies) {
        frequencies[char] = frequencies[char] / total;
    }

    return frequencies;
}

let sample = "ana are mere";
console.log(letterFrequencies(sample));
