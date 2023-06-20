console.log("Start");

class Calculator {
    constructor() {
        this.firstNumber = 0;
        this.secondNumber = 0;
        this.operand = "";
    }

    methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    }

    operate(a, b, op) {
        return this.methods[op](a, b);
    }
}
let calculator = new Calculator();

console.log(calculator.operate(3, 4, "+"));
console.log(calculator.operate(8, 4, "-"));
console.log(calculator.operate(3, 5, "*"));
console.log(calculator.operate(12, 4, "/"));