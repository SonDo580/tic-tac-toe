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

type DIRECTION_KEY = keyof typeof DIRECTION;

export { MARK, DIRECTION, SIDE, WIN_COUNT, DIRECTION_KEY };
