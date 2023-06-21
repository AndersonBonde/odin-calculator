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

    append(e) {
        let character = e.target.textContent;

        if(character == ".") {
            if(this.firstValue == "" && !this.firstValue.includes(".")) {
                let first = this.display.split(" ")[0];
    
                if(first == "") {
                    this.display = 0;
                    calculatorDisplay.textContent = this.display;
                }
                
                if(Number.isInteger(+first)) {
                    this.display = calculatorDisplay.textContent + character;
                    this.firstValue = this.display;
                }
            } else if(!this.secondValue.includes(".")) {
                let second = this.display.split(" ")[2];
                
                if(second == "") {
                    this.display += 0;
                    calculatorDisplay.textContent = this.display;
                }
    
                if(Number.isInteger(+second)) {
                    this.display = calculatorDisplay.textContent + character;
                    this.secondValue = this.display.split(" ")[2];
                }
            }
            calculatorDisplay.textContent = this.display;

            return;
        }
        
        this.display = calculatorDisplay.textContent + character;    
        calculatorDisplay.textContent = this.display;
    }

    process(e) {
        let op = e.target.textContent;
        
        if(this.firstValue == "" || this.operator == "") {
            this.operator = op;
            this.firstValue = this.display.split(" ")[0];

            this.display = `${this.firstValue} ${this.operator} `;
            calculatorDisplay.textContent = this.display;
        } else {
            let first = +this.firstValue;
            let second = +this.display.split(" ")[2];

            if(second === "") return;
            if(second == 0 && this.operator == "/") {
                this.display = "Error";
                calculatorDisplay.textContent = this.display;
                return;
            }

            let result = this.operate(first, second, this.operator);

            this.firstValue = result;

            this.display = `${this.firstValue} ${op} `;
            this.operator = op;

            calculatorDisplay.textContent = this.display;
        }
    }

    result() {
        if(this.firstValue == "") return;

        this.secondValue = this.display.split(" ")[2];
        if(this.secondValue == "") return;

        if(this.secondValue == 0 && this.operator == "/") {
            this.display = "Error";
            calculatorDisplay.textContent = this.display;
            return;
        }

        let result = this.operate(+this.firstValue, +this.secondValue, this.operator);
        if(result % 1 != 0) {
            this.display = `${+result.toFixed(4)}`;
            calculatorDisplay.textContent = this.display;
        } else {
            this.display = `${+result}`;
            calculatorDisplay.textContent = this.display;
        }     

        this.firstValue = result;
        this.secondValue = "";
        this.operator = "";
    }

    clear() {
        this.display = "";
        this.firstValue = "";
        this.secondValue = "";
        this.operator = "";

        calculatorDisplay.textContent = this.display;
    }

    clearLast() {
        this.display = this.display.slice(0, -1);
        calculatorDisplay.textContent = this.display;

        let values = this.display.split(" ");

        switch(values.length) {
            case 3:
                this.secondValue = values[2].slice(0, -1);
                break;
            case 2:
                this.operator = "";
                this.display = values[0];
                calculatorDisplay.textContent = this.display;
                break;
            case 1:
                this.firstValue = values[0].slice(0, -1);
                break;
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

decimalButton.addEventListener("click", calculator.append);

clearLastButton.addEventListener("click", calculator.clearLast);