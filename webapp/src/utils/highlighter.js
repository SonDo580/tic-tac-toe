import { SIDE, DIRECTION, WIN_COUNT } from "@/constants";
import { countAllDirections } from "./counter";

const highlightHorizontal = (board, row, column, mark) => {
  const highlightCells = [];
  let currentColumn = column;

  while (--currentColumn >= 0) {
    if (board[row][currentColumn] !== mark) {
      break;
    }
    highlightCells.push(`${row}-${currentColumn}`);
  }

  currentColumn = column;
  while (++currentColumn < SIDE) {
    if (board[row][currentColumn] !== mark) {
      break;
    }
    highlightCells.push(`${row}-${currentColumn}`);
  }

  return highlightCells;
};

const highlightVertical = (board, row, column, mark) => {
  const highlightCells = [];
  let currentRow = row;

  while (--currentRow >= 0) {
    if (board[currentRow][column] !== mark) {
      break;
    }
    highlightCells.push(`${currentRow}-${column}`);
  }

  currentRow = row;
  while (++currentRow < SIDE) {
    if (board[currentRow][column] !== mark) {
      break;
    }
    highlightCells.push(`${currentRow}-${column}`);
  }

  return highlightCells;
};

const highlightNorthWest_SouthEast = (board, row, column, mark) => {
  const highlightCells = [];
  let currentRow = row;
  let currentColumn = column;

  while (--currentRow >= 0 && --currentColumn >= 0) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    highlightCells.push(`${currentRow}-${currentColumn}`);
  }

  currentRow = row;
  currentColumn = column;
  while (++currentRow < SIDE && ++currentColumn < SIDE) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    highlightCells.push(`${currentRow}-${currentColumn}`);
  }

  return highlightCells;
};

const highlightNorthEast_SouthWest = (board, row, column, mark) => {
  const highlightCells = [];
  let currentRow = row;
  let currentColumn = column;

  while (--currentRow >= 0 && ++currentColumn < SIDE) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    highlightCells.push(`${currentRow}-${currentColumn}`);
  }

  currentRow = row;
  currentColumn = column;
  while (++currentRow < SIDE && --currentColumn >= 0) {
    if (board[currentRow][currentColumn] !== mark) {
      break;
    }
    highlightCells.push(`${currentRow}-${currentColumn}`);
  }

  return highlightCells;
};

const hightLightDirection = (direction, ...args) => {
  switch (direction) {
    case DIRECTION.horizontal:
      return highlightHorizontal(...args);
    case DIRECTION.vertical:
      return highlightVertical(...args);
    case DIRECTION.northwest_southeast:
      return highlightNorthWest_SouthEast(...args);
    case DIRECTION.northeast_southwest:
      return highlightNorthEast_SouthWest(...args);
    default:
      return [];
  }
};

const getHighlightCells = (...args) => {
  const highlightCells = [];
  const markCount = countAllDirections(...args);

  for (const [direction, count] of Object.entries(markCount)) {
    if (count < WIN_COUNT) {
      continue;
    }
    highlightCells.push(...hightLightDirection(direction, ...args));
  }

  const [, rowIndex, colIndex] = args;
  if (highlightCells.length > 0) {
    highlightCells.push(`${rowIndex}-${colIndex}`);
  }

  return highlightCells;
};

export { getHighlightCells };
