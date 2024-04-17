const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let operand1 = "";
let currentOperator = "";
let operand2 = "";
let newOperation = false;
let decimal1Used = false;
let decimal2Used = false;

const validNumberKeys = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const validOperatorKeys = ["Enter", "=", "+", "-", "*", "x", "X", "/"];;
const clearKeys = ["c", "C", "Escape"];
const delKeys = ["Delete", "Backspace"];

clearButton.addEventListener("click", clear);

deleteButton.addEventListener("click", deleteNum);

document.body.addEventListener("keydown", keyboardClick);

numberButtons.forEach((number) => {
    number.addEventListener("click", numberClick);
})

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", operatorClick);
})

function keyboardClick(element) {
    const key = element.key;

    if (validNumberKeys.includes(key)) {
        numberClick(element);
    } else if (validOperatorKeys.includes(key)) {
        operatorClick(element);
    } else if (clearKeys.includes(key)) {
        clear();
    } else if (delKeys.includes(key)) {
        deleteNum();
    }
}

function numberClick(element) {
    let number;

    if (element instanceof PointerEvent) {
        number = element.target.innerText;
    } else if (element instanceof KeyboardEvent) {
        number = element.key;
    }
    handleNumber(number);
}

function operatorClick(element) {
    if (operand1 === "") {
        return;
    } else {
        let operator;

        if (element instanceof PointerEvent) {
            operator = element.target.innerText;
        } else if (element instanceof KeyboardEvent) {
            operator = element.key;
        }
        handleOperator(operator);
    }
}

function handleNumber(num) {
    if (currentOperator === "") {
        if (operand1.length > 11) {
            return;
        }
        if (newOperation === true) {
            operand1 = "";
            newOperation = false;
        }
        if (num === ".") {
            if (decimal1Used) {
                return;
            } else {
                if (operand1 === "") {
                    operand1 += "0";
                }
                decimal1Used = true;
            }
        }
        operand1 += num;
        updateDisplay(operand1);
    } else {
        if (operand2.length > 11) {
            return;
        }
        if (num === ".") {
            if (decimal2Used) {
                return;
            } else {
                if (operand2 === "") {
                    operand2 += "0";
                }
                decimal2Used = true;
            }
        }
        operand2 += num;
        updateDisplay(operand2);
    }
}

function handleOperator(op) {
    if (op === "=" || op === "Enter") {
        if (currentOperator === "") {
            return;
        }
        if (operand2 === "") {
            operand2 += "0";
        }
        if (currentOperator === "/" && operand2 === "0") {
            clear();
            updateDisplay("Math Error");
            return;
        }
        let result = operate(operand1, currentOperator, operand2);
        if (result % 1 !== 0) {
            result = +result.toFixed(2);
        }
        if (result.toString().length > 11) {
            result = result.toExponential(0);
        }
        clear()
        updateDisplay(result);
        operand1 = result.toString();
        newOperation = true;
        toggleOperator("selectedOperator");
    } else {
        currentOperator = op;
        toggleOperator("selectedOperator", op);            
    }
}

function clear() {
    operand1 = "";
    currentOperator = "";
    operand2 = "";
    newOperation = false;
    decimal1Used = false;
    decimal2Used = false;
    updateDisplay("");
}

function deleteNum() {
    if (currentOperator === "") {
        if (newOperation === true) {
            operand1 = "";
            newOperation = false;
            updateDisplay(operand1);
            return;
        }
        if (operand1 === "") {
            return;
        }
        operand1 = operand1.slice(0, operand1.length - 1);
        updateDisplay(operand1);
    } else {
        if (operand2 === "") {
            return;
        }
        operand2 = operand2.slice(0, operand2.length - 1);
        updateDisplay(operand2);
    }
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
    operand1 = Number(operand1);
    operand2 = Number(operand2);
    switch (operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return subtract(operand1, operand2);
        case "x":
            return multiply(operand1, operand2);
        case "X":
            return multiply(operand1, operand2);
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);  
        default:
            break;
    }
}