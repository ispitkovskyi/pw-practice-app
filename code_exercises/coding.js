// function reverse_example(array) {
//     for (let i = 0; i < array.length/2; i++) {
//         let temp = array[i];
//         array[i] = array[array.length - 1 - i];
//         array[array.length - 1 - i] = temp;
//     }
// }

function reverse(array) {
    for (let i = 0; i < array.length/2; i++) {
        let temp = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = temp;
    }
}

const arr = ['a', 'b', 'c', 'd', 'e'];
console.log('Before:')
arr.forEach(el => console.log(el))
reverse(arr)
console.log('After:')
arr.forEach(el => console.log(el))




