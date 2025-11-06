function addToArray(array, ...args){
    for(var i=0;i<args.length;i++){
        array.push(args[i]);
    }
    return array

}

let array=["a"]
console.log(addToArray,"b","c").join(", ")


function interleaveArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return -1; 
    }
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
        result.push(arr1[i]); 
        result.push(arr2[i]); 
    }
    return result;
}

console.log(interleaveArrays([1, 2, 3], ['a', 'b', 'c']));
