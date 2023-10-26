const SIDE = 16;
const WIN_COUNT = 5;

const enum MARK {
  X = "X",
  O = "O",
}

const enum DIRECTION {
  horizontal = "horizontal",
  vertical = "vertical",
  northwest_southeast = "northwest_southeast",
  northeast_southwest = "northeast_southwest",
}

export { MARK, SIDE, DIRECTION, WIN_COUNT };
