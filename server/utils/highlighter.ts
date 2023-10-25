import type { Board } from "../types";
import { SIDE, DIRECTION, WIN_COUNT, MARK } from "../constants";
import { countAllDirections } from "./counter";

type HighlightArg = [board: Board, row: number, column: number, mark: MARK];

const highlightHorizontal = (...args: HighlightArg) => {
  const [board, row, column, mark] = args;
  const highlightCells: string[] = [];
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

const highlightVertical = (...args: HighlightArg) => {
  const [board, row, column, mark] = args;
  const highlightCells: string[] = [];
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

const highlightNorthWest_SouthEast = (...args: HighlightArg) => {
  const [board, row, column, mark] = args;
  const highlightCells: string[] = [];
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

const highlightNorthEast_SouthWest = (...args: HighlightArg) => {
  const [board, row, column, mark] = args;
  const highlightCells: string[] = [];
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

const hightLightDirection = (direction: DIRECTION, ...args: HighlightArg) => {
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

const getHighlightCells = (...args: HighlightArg) => {
  // Always highlight the last selected cell
  const [_, row, column] = args;
  const highlightCells = [`${row}-${column}`];

  const markCount = countAllDirections(...args);
  for (const [direction, count] of Object.entries(markCount)) {
    if (count < WIN_COUNT) {
      continue;
    }
    highlightCells.push(
      ...hightLightDirection(direction as DIRECTION, ...args)
    );
  }

  return highlightCells;
};

export { getHighlightCells };
