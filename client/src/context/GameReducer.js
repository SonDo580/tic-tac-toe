const initialState = {
  roomId: null,
  board: null,
  players: null,
  turn: null,
  highlightCells: null,
  endGame: false,
};

const ACTION = {
  INIT_GAME: "INIT_GAME",
  RESET_GAME: "RESET_GAME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INIT_GAME:
      return action.roomInfo;

    case ACTION.RESET_GAME:
      return initialState;

    default:
      break;
  }
};

export { ACTION, initialState, reducer };
