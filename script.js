const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let operand1 = 0;
let operator = "";
let operand2 = 0;

numberButtons.forEach((number) => {
    number.addEventListener("click", () => number.innerText);
})

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", () => operator.innerText);
})

//TODO: Make function 'clear' that resets everything
// clearButton.addEventListener("click", clear);

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
    switch (operator) {
        case "+":
            add(operand1, operand2);
            break;
        case "-":
            subtract(operand1, operand2);
            break;
        case "*":
            multiply(operand1, operand2);
            break;  
        case "/":
            divide(operand1, operand2);
            break;          
        default:
            break;
    }
}