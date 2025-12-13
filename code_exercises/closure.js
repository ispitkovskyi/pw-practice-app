function createCalcFunction(n) {
    return function () {
        console.log(`Result: ${1000 * n}`)
    }
}

const calc = createCalcFunction(42);
calc()


function createIncrementor(n) {
    return function (m) {
        return n + m;
    }
}

const addOne = createIncrementor(1);
const addTen = createIncrementor(10);
console.log(`2 + 1 = ${addOne(2)}`)
console.log(`2 + 1 = ${addTen(2)}`)


function urlGenerator(domain) {
    return function (host) {
        return `https://${host}.${domain}`;
    }
}
const urlGen = urlGenerator("airalo.com");
console.log(`Staging URL: ${urlGen('staging')}`);
console.log(`Integration URL: ${urlGen('integration')}`);


// Exercise  https://youtu.be/pahO5XjnfLA?si=1ELM1hJGri-Ewjnt&t=595
function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = {name: "Mihail", age: 22, job: "Frontend"}
const person2 = {name: "Helen", age: 19, job: "SPM"}

function bind(context, fn) {
    // Spread operator (...) allows to pass any number of arguments to the cloosure function fn - so it can bind ANY function to the provided context
    return function (...args) {
        // .apply() method allows to call a function with any number of arguments provided as an array
        fn.apply(context, args);
    }
}

bind(person1, logPerson)();
bind(person2, logPerson)();