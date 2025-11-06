let sayHello = (name) => {
    return `Hello, ${name}!`
}

console.log(sayHello(process.argv[0]));d
console.log(sayHello(process.argv[1]));d
console.log(sayHello(process.argv[2]));d


let concatStrings = (arr) =>arr.joins("")
let words= ["Salut", ", ", "ce ", "faci", "?"];
console.log(concatStrings(words))


function checkDivisible(n, divisor) {
    if (n % divisor === 0) {
        return true;
    } else {
        return false;
    }
}

console.log(checkDivisible(20, 2)); 
console.log(checkDivisible(21, 2)); 

function countDifferentChars(str1,str2){
    if(str1.length != str2.length){
        return -1;
    }

    let count=0;

    for(let i=0;i<str1.length;i++){
        if(str1[i]!=str2[i]){
            count++;
        }
    }
    return count;
}

 console.log(countDifferentChars("abcd", "abcf")); 
console.log(countDifferentChars("test", "tost")); 
console.log(countDifferentChars("abc", "abcd")); 

