console.log("Start");

class Calculator {
    constructor() {

    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
}
let calculator = new Calculator();

console.log(calculator.add(3, 4));
console.log(calculator.subtract(5, 2));
console.log(calculator.multiply(2, 5));
console.log(calculator.divide(10, 4));