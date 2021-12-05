import { readFileLines } from "../lib/readFile.mjs";

const inputLines = readFileLines('./input.txt');

// PART 2 difference
const INCLUDE_DIAGONALS = true;

(function main() {
  console.log('Part 5')
  // Extract data
  const ventLines = convertInputToData(inputLines)
  console.log(ventLines);

  // Paint lines
  const Board = [];
  ventLines.map(l => paintVentLineToBoardMutable(l, Board))

  const total = getScore(Board);
  console.log({total})

  // Part 1 winning score: 8622
  // Part 2 winning score: 22037
})();


function getScore(rows) {
  const total = rows.reduce((rowsTotal, row, x) => {
    const rowTotal = row.reduce((columnsTotal, column, y) => {
      return column > 1 ? columnsTotal + 1 : columnsTotal
    }, 0)
    return rowsTotal + rowTotal;
  }, 0)
  return total
}

function paintVentLineToBoardMutable(line, Board) {
  const loopTimes = Math.abs(line.x) || Math.abs(line.y);
  for (let index = 0; index <= loopTimes; index++) {
    const currX = line.hasOwnProperty('x')
      ? (line.start.x + index*(line.x < 0 ? -1 : 1))
      : line.start.x;
    const currY = line.hasOwnProperty('y')
      ? (line.start.y + index*(line.y < 0 ? -1 : 1))
      : line.start.y;
    Board[currX] = Board[currX] || []
    Board[currX][currY] = Board[currX][currY] || 0;
    Board[currX][currY]++;
  }
}

function convertInputToData(inputLines) {
  return inputLines.map((inputLine) => {
    if(inputLine === '') return null;
    return createVentLine(inputLine);
  }).filter(Boolean);
}

function createVentLine(inputLine) {
  const regex = /(\d+),(\d+) -> (\d+),(\d+)/i
  const [, x1str, y1str, x2str, y2str] = inputLine.match(regex);
  const x1 = parseInt(x1str);
  const x2 = parseInt(x2str);
  const y1 = parseInt(y1str);
  const y2 = parseInt(y2str);
  const diffX = x2 - x1;
  const diffY = y2 - y1;

  // For part 1
  if(!INCLUDE_DIAGONALS) {
    const isDiagonal = diffX !== 0 && diffY !== 0
    if(isDiagonal) return null;
  }

  const ventLine = {
    start: {
      x: x1,
      y: y1,
    },
    ...(diffX !== 0 && {x: diffX}),
    ...(diffY !== 0 && {y: diffY}),
  };

  // if(index === 1) {
  //   console.log({
  //     x1, y1, x2, y2, diffX, diffY, isDiagonal, ventLine
  //   })
  // }
  return ventLine;
}


/**
 * Lines only need a start point and the
 * direction+duration of travel
 * VentLine = {
 *   start: {
 *     x: 123,
 *     y: 55,
 *   },
 *   [x||y]: 10
 * }
 */

/**
 * Board is an incomplete, 2-dimensional array
 * points are "drawn" (added to the board) as necessary
 * 
 *  Board = [
 *    [], // x: 0,
 *    // ...
 *    [] // x: 564,
 *    [ // x: 917
 *      undefined, // y: 0,
 *      // ...
 *      undefined, // y: 382,
 *      1, // y: 409. One line has crossed this point
 *    ]
 *  ]
 */