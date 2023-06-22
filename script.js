const calculatorDisplay = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const resultButton = document.querySelector(".result");
const decimalButton = document.querySelector(".decimal");
const clearLastButton = document.querySelector(".clearLast");

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
        this.clearLast = this.clearLast.bind(this);
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

    append(e, char) {
        let character = char == undefined ? e.target.textContent : char;

        if(character == ".") {
            this.appendDecimal();
        } else {
            this.display = calculatorDisplay.textContent + character;    
        }

        this.update();
    }

    appendDecimal() {
        if(this.operator == "") {
            if(!this.firstValue.includes(".")) {
                this.display = calculatorDisplay.textContent + ".";
            }
        } else {
            if(!this.secondValue.includes(".")) {
                this.display = calculatorDisplay.textContent + ".";
            }
        }
    }

    process(e, char) {
        let op = char == undefined ? e.target.textContent : char;
        
        if(this.operator == "") {
            this.operator = op;

            this.display = `${this.firstValue} ${this.operator} `;
        } else {
            if(this.secondValue == "") return;
            if(this.checkForDivisionByZero()) return;

            let result = this.operate(+this.firstValue, +this.secondValue, this.operator);

            this.firstValue = result;
            this.operator = op;

            this.display = `${this.firstValue} ${op} `;
        }

        this.update();
    }

    result() {
        if(this.firstValue == "" || this.secondValue == "") return;
        if(this.checkForDivisionByZero()) return;

        let result = this.operate(+this.firstValue, +this.secondValue, this.operator);

        this.display = `${+result.toFixed(4)}`;

        this.firstValue = result;
        this.secondValue = "";
        this.operator = "";

        this.update();
    }

    checkForDivisionByZero() {
        if(this.secondValue == 0 && this.operator == "/") {
            this.display = "Error";
            calculatorDisplay.textContent = this.display;
            return true;
        }        
    }

    clear() {
        this.display = "";
        this.update();
    }

    clearLast() {
        this.display = this.display.trimEnd();
        this.display = this.display.slice(0, -1);

        this.update();
    }

    update() {
        let values = this.display.split(" ");

        if(values.length == 3) this.secondValue = values[2];
        if(values.length == 2) this.operator = values[1];
        
        this.firstValue = values[0];

        calculatorDisplay.textContent = this.display;
    }
}
let calculator = new Calculator();

numberButtons.forEach(curr => {
    curr.addEventListener("click", calculator.append);
})

clearButton.addEventListener("click", calculator.clear);

operatorButtons.forEach(curr => {
    curr.addEventListener("click", calculator.process);
})

resultButton.addEventListener("click", calculator.result);

decimalButton.addEventListener("click", calculator.append);

clearLastButton.addEventListener("click", calculator.clearLast);

// Add keyboard input functionality;
document.addEventListener("keydown", (e) => {
    numberButtons.forEach(curr => {
        if(curr.dataset.code == e.code) {
            calculator.append(e, curr.textContent);
        }
    })

    operatorButtons.forEach(curr => {
        if(curr.dataset.code == e.code) {
            calculator.process(e, curr.textContent);
        }
    })

    switch(e.code) {
        case resultButton.dataset.code:
            calculator.result();
            break;
        case clearButton.dataset.code:
            calculator.clear();
            break;
        case clearLastButton.dataset.code:
            calculator.clearLast();
            break;
        case decimalButton.dataset.code:
            calculator.append(e, ".");
            break;
    }
})