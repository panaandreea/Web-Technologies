const censorText = (text, dictionary) => {
    return text
        .split(" ")
        .map(word => {
            if (dictionary.includes(word)) {
                return word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
            }
            return word;
        })
        .join(" ");
}; 

const text = "javascript este minunat";
const dictionary = ["este"];

console.log(censorText(text, dictionary));
