const calculatorDisplay = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const resultButton = document.querySelector(".result");

class Calculator {
    constructor() {
        this.firstValue = "";
        this.secondValue = "";
        this.operator = "";
        this.display = "";

        this.process = this.process.bind(this);
        this.append = this.append.bind(this);
        this.clear = this.clear.bind(this);
        this.result = this.result.bind(this);
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

    process(e) {
        let op = e.target.textContent;
        this.operator = op;

        if(this.firstValue == "") {
            this.firstValue = this.display;
            
            this.display = "";
            calculatorDisplay.textContent = "";
            console.log(`First value: ${this.firstValue}, Operator: ${this.operator}`);
        } else {
            let first = +this.firstValue;
            let second = +this.display;

            this.firstValue = this.operate(first, second, op);

            this.display = "";
            calculatorDisplay.textContent = "";
            console.log(`First value: ${this.firstValue}, Operator: ${this.operator}`);
        }
    }

    append(e) {
        let number = e.target.textContent;
        this.display = calculatorDisplay.textContent + number;

        calculatorDisplay.textContent = this.display;
    }

    clear() {
        this.display = "";
        this.firstValue = "";
        this.secondValue = "";
        this.operator = "";

        calculatorDisplay.textContent = this.display;
    }

    result() {
        if(this.firstValue == "") return;

        this.secondValue = this.display;

        let result = this.operate(+this.firstValue, +this.secondValue, this.operator);
        if(result % 1 != 0) {
            calculatorDisplay.textContent = result.toFixed(4);
        } else {
            calculatorDisplay.textContent = result;
        }     
    }
}
let calculator = new Calculator(calculatorDisplay);

numberButtons.forEach(curr => {
    curr.addEventListener("click", calculator.append);
})

clearButton.addEventListener("click", calculator.clear);

operatorButtons.forEach(curr => {
    curr.addEventListener("click", calculator.process);
})

resultButton.addEventListener("click", calculator.result);