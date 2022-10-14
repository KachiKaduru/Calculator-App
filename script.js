"use strict";

const body = document.body;
const modesStn = document.querySelector(".modes");
const day = document.querySelector(".day");
const night = document.querySelector(".night");

const currentOperation = document.querySelector(".sign");
const numberBtns = document.querySelectorAll("[data-num");
const opsBtns = document.querySelectorAll("[data-ops");
const equalBtn = document.querySelector("[data-equal");
const clearBtn = document.querySelector("[data-clear");
const delBtn = document.querySelector("[data-delete");
const prevOps = document.querySelector("[data-prev");
const currentOps = document.querySelector("[data-current");
const output = document.querySelector(".output");

modesStn.addEventListener("click", function (e) {
  day.classList.remove("t-bg");
  night.classList.remove("t-bg");
  body.classList.remove("light");
  body.classList.remove("dark");

  const current = e.target;
  let mode = e.target.dataset.mode;

  if (mode === "day") {
    body.classList.add("light");
    current.classList.add("t-bg");
  }

  if (mode === "night") {
    body.classList.add("dark");
    current.classList.add("t-bg");
  }
});

/////
class CalculatorCl {
  constructor(prevOps, currentOps) {
    this.prevOps = prevOps;
    this.currentOps = currentOps;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
    currentOperation.textContent = this.operation;
  }

  delete() {
    this.currentOperand = String(this.currentOperand).slice(0, -1);
  }

  appendNumber(num) {
    if (num === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += num;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") operation = undefined;
    if (this.prevOperand !== "" || this.currentOperand !== "") this.compute();
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
    currentOperation.textContent = this.operation;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
    currentOperation.textContent = this.operation;
  }

  getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }

  updateDisplay() {
    this.currentOps.textContent = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.prevOps.textContent = `${this.getDisplayNumber(this.prevOperand)}`;
    } else {
      this.prevOps.textContent = "";
    }
  }
}

const calculator = new CalculatorCl(prevOps, currentOps);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.textContent);
    calculator.updateDisplay();
  });
});

opsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.textContent);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

delBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
