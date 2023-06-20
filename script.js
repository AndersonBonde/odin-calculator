const calculatorDisplay = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");

class Calculator {
    constructor() {
        this.firstValue = "";
        this.secondValue = "";
        this.operator = "";
        this.display = "";
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

    append(e) {
        let number = e.target.textContent;
        this.display = calculatorDisplay.textContent + number;

        calculatorDisplay.textContent = this.display;
    }

    clear() {
        this.display = "";
        calculatorDisplay.textContent = this.display;
    }
}
let calculator = new Calculator(calculatorDisplay);

numberButtons.forEach(curr => {
    curr.addEventListener("click", calculator.append);
})

clearButton.addEventListener("click", calculator.clear);