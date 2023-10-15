import { SIDE, DIRECTION } from "../constants.js";

const countHorizontal = (board, row, column, mark) => {
  let markNumber = 1;
  let currentColumn = column;

  while (--currentColumn >= 0) {
    if (board[row][currentColumn] !== mark) {
      break;
    }
    markNumber++;
  }

  currentColumn = column;
  while (++currentColumn < SIDE) {
    if (board[row][currentColumn] !== mark) {
      break;
    }
    markNumber++;
  }

  return markNumber;
};

const countVertical = (board, row, column, mark) => {
  let markNumber = 1;
  let currentRow = row;

  while (--currentRow >= 0) {
    if (board[currentRow][column] !== mark) {
      break;
    }
    markNumber++;
  }

  currentRow = row;
  while (++currentRow < SIDE) {
    if (board[currentRow][column] !== mark) {
      break;
    }
    markNumber++;
  }

  return markNumber;
};

const countNorthWest_SouthEast = (board, row, column, mark) => {
  let markNumber = 1;
  let currentRow = row;
  let currentColumn = column;

  while (--currentRow >= 0 && --currentColumn >= 0) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    markNumber++;
  }

  currentRow = row;
  currentColumn = column;
  while (++currentRow < SIDE && ++currentColumn < SIDE) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    markNumber++;
  }

  return markNumber;
};

const countNorthEast_SouthWest = (board, row, column, mark) => {
  let markNumber = 1;
  let currentRow = row;
  let currentColumn = column;

  while (--currentRow >= 0 && ++currentColumn < SIDE) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    markNumber++;
  }

  currentRow = row;
  currentColumn = column;
  while (++currentRow < SIDE && --currentColumn >= 0) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    markNumber++;
  }

  return markNumber;
};

const countAllDirections = (...args) => {
  const markCount = {
    [DIRECTION.horizontal]: countHorizontal(...args),
    [DIRECTION.vertical]: countVertical(...args),
    [DIRECTION.northwest_southeast]: countNorthWest_SouthEast(...args),
    [DIRECTION.northeast_southwest]: countNorthEast_SouthWest(...args),
  };

  return markCount;
};

export { countAllDirections };
