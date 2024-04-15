const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let operand1 = "";
let currentOperator = "";
let operand2 = "";

clearButton.addEventListener("click", clear);

numberButtons.forEach((number) => {
    number.addEventListener("click", numberClick);
})

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", operatorClick);
})

function numberClick(element) {
    const num = element.target.innerText;
    if (currentOperator === "") {
        operand1 += num;
        updateDisplay(operand1);
    } else {
        operand2 += num;
        updateDisplay(operand2);
    }
}

function operatorClick(element) {
    if (operand1 === "") {
        return;
    } else {
        const operator = element.target.innerText;
        if (operator === "=") {
            if (currentOperator === "") {
                return;
            } else if (operand2 === "") {
                operand2 += "0";
            }
            const result = operate(operand1, currentOperator, operand2);
            clear()
            updateDisplay(result);
            operand1 = result;
            toggleOperator("selectedOperator");
        } else {
            currentOperator = operator;
            toggleOperator("selectedOperator", operator);            
        }
    }
}

function clear() {
    operand1 = "";
    currentOperator = "";
    operand2 = "";
    updateDisplay("");
}

function updateDisplay(value) {
    display.innerText = value;
}

function toggleOperator(className, operator = "") {
    if (operator === "") {
        operatorButtons.forEach((op) => {
            if (op.classList.contains(className)) {
                op.classList.toggle(className);
                return;
            }
        })
    } else {
        operatorButtons.forEach((op) => {
            if (op.innerText === operator) {
                op.classList.toggle(className);
                return;
            }
        })
    }
}

function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function operate(operand1, operator, operand2) {
    operand1 = parseInt(operand1);
    operand2 = parseInt(operand2);
    switch (operator) {
        case "+":
            return add(operand1, operand2);
            break;
        case "-":
            return subtract(operand1, operand2);
            break;
        case "x":
            return multiply(operand1, operand2);
            break;  
        case "/":
            return divide(operand1, operand2);
            break;          
        default:
            break;
    }
}