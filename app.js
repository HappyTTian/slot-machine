const slotLines = 3;
let balance = 0;
const prompt = require("prompt-sync")();

const deposit = () => {
  while (1) {
    let amount = prompt("Enter a deposit amount: ");
    let numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      console.log("Invalid deposit amount, try again");
    } else {
      return numAmount;
    }
  }
};

const getNumLine = () => {
  while (1) {
    let lines = prompt("Enter the number of lines you want to bet on (1-3): ");
    let num = parseInt(lines);
    if (isNaN(num) || num <= 0 || num >= slotLines) {
      console.log("Invalid number of lines, try again");
    } else {
      return num;
    }
  }
};

const getBet = () => {};
const depositAmount = deposit();
balance += depositAmount;
const numOfLines = getNumLine();
