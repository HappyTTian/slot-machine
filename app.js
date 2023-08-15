const prompt = require("prompt-sync")();

const slotLines = 3;
let balance = 0;

const ROWS = 3;
const COLUMNS = 3;

const SYMBOL_COUNT = {
  A: 4,
  B: 8,
  C: 6,
  D: 2,
};
const SYMBOL_VALUE = {
  A: 3,
  B: 5,
  C: 2,
  D: 6,
};
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
    if (isNaN(num) || num <= 0 || num > slotLines) {
      console.log("Invalid number of lines, try again");
    } else {
      return num;
    }
  }
};

const getBet = (balance, numOfLines) => {
  while (1) {
    let betAmount = prompt("Enter the amount you want to bet on: ");
    let numOfBet = parseInt(betAmount);
    if (isNaN(numOfBet) || numOfBet <= 0) {
      console.log("Invalid number, try again");
    } else if (numOfBet > balance / numOfLines) {
      console.log("It exceeds your balance, try again");
    } else {
      return numOfBet;
    }
  }
};

const spin = () => {
  const symbols = [];

  for (let [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];

  for (let i = 0; i < COLUMNS; i++) {
    reels.push([]);
  }
  for (let i = 0; i < COLUMNS; i++) {
    let tempSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const selectIndex = Math.floor(Math.random() * tempSymbols.length);
      const randomSymbol = tempSymbols[selectIndex];
      reels[i].push(randomSymbol);
      tempSymbols.splice(selectIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
  }
  for (const col of reels) {
    for (let i = 0; i < ROWS; i++) {
      rows[i].push(col[i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (let row of rows) {
    const str = row.join(" | ");
    console.log(str);
  }
};

const getWinning = (rows, bet, numOfLines) => {
  let winnings = 0;
  for (let i = 0; i < numOfLines; i++) {
    const symbols = rows[i];
    let same = true;
    for (symbol of symbols) {
      if (symbol != symbols[0]) {
        same = false;
        break;
      }
    }

    if (same) winnings += bet * SYMBOL_VALUE[symbols[0]];
  }

  return winnings;
};

const game = () => {
  const depositAmount = deposit();
  balance += depositAmount;

  while (true) {
    console.log(`Your balance is ${balance}`);
    const numOfLines = getNumLine();
    const betAmount = getBet(balance, numOfLines);
    balance -= betAmount * numOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinning(rows, betAmount, numOfLines);
    balance += winnings;
    if (balance <= 0) {
      console.log("You are broke");
      break;
    }
    if (winnings > 0) console.log(`You win ${winnings}, Congratulations!`);
    let answer = prompt("Do you want to continue to play: (y/n)");
    if (answer != "y" && answer != "yes") break;
  }
};

game();
