import { readFileLines } from "../lib/readFile.mjs";

(function main() {
  const [winningNumbersString, ...boardLines] = readFileLines("./input.txt");

  const winningNumbers = winningNumbersString
    .split(",")
    .map((str) => parseInt(str));

  const { boards, totalBoards } = buildBoards(boardLines);

  const { winningNumber, winningBoard } = playGame(winningNumbers, boards);

  printBoard(winningBoard);

  const score = getScore(winningNumber, winningBoard);
  console.log("winning score", score);
})();

function getScore(winningNumber, winningBoard) {
  const totalUnselected = winningBoard.reduce((accum, currRow) => {
    const rowTotal = currRow.reduce((runningRowTotal, num) => {
      if (!num.isWinningNumber) runningRowTotal += num.value;
      return runningRowTotal;
    }, 0);
    accum += rowTotal;
    return accum;
  }, 0);
  return totalUnselected * winningNumber;
}

function playGame(winningNumbers, boards) {
  let winningNumber = 0;
  let winningBoard = [];
  winningNumbers.every((currentNumber) => {
    winningNumber = currentNumber;
    console.log("The next winning number is", currentNumber);
    // update everyone's boards with the new winning number
    updateBoardsMutable(currentNumber, boards);

    // check if any boards match the winning criteria
    const winningBoards = checkForWinningBoards(boards);

    if (winningBoards.length === 1) {
      console.log("we have a winner!");
      winningBoard = winningBoards[0];
      return false;
    }

    if (winningBoards.length > 1) {
      console.log("multiple winners???");
      return false;
    }
    return true;
  });
  return {
    winningNumber,
    winningBoard,
  };
}

function checkForWinningBoards(boards) {
  return boards.filter((board) => isWinningBoard(board));
}

function isWinningBoard(board) {
  const hasCompleteRow = checkCompleteRows(board);
  if (hasCompleteRow) return true;
  const hasCompleteColumn = checkCompleteRows(invertMatrix(board));
  if (hasCompleteColumn) return true;
  return false;
}

function checkCompleteRows(board) {
  const completeRows = board.filter((row) =>
    row.every((num) => num.isWinningNumber)
  );
  return completeRows.length > 0;
}

function updateBoardsMutable(winningNumber, boards) {
  boards.forEach((board) => {
    board.forEach((row) => {
      row.forEach((number) => {
        if (number.value === winningNumber) {
          number.isWinningNumber = true;
        }
      });
    });
  });
}

/**
 * Break boards into own arrays
 * Each int is actually an object { value: 26, isWinningNumber: false }
 * boards = [
 *    [
 *      [12,79,33,36,97], // top row of board
 *      [82,38,77,61,84],
 *      ...to 5 rows
 *    ]
 * ]
 */
function buildBoards(lines) {
  const boards = [];
  let totalBoards = 0;
  for (let index = 0; index < lines.length - 6; index += 6) {
    const board = buildRows(lines.slice(index, index + 6));
    boards.push(board);
    totalBoards++;
  }
  return { boards, totalBoards };
}

function buildRows(rowLines) {
  return rowLines
    .filter((row) => row !== "")
    .map((line) =>
      line
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((str) => ({ value: parseInt(str), isWinningNumber: false }))
    );
}

function invertMatrix(array) {
  return array.reduce((accumulator, current) => {
    for (let index = 0; index < current.length; index++) {
      const bit = current[index];
      accumulator[index] = accumulator[index] || [];
      accumulator[index].push(bit);
    }
    return accumulator;
  }, []);
}

function printBoard(board) {
  board.forEach((row) => {
    const rowWithColors = row.map((num) => {
      if (num.isWinningNumber) return redText(num.value);
      return num.value;
    });
    console.log(rowWithColors.join(" "));
  });
}

function redText(string) {
  return `\x1b[31m${string}\x1b[0m`;
}

/**
 * Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
 */
