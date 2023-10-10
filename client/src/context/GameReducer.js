import { produce } from "immer";

const initialState = {
  roomId: null,
  board: null,
  players: null,
};

const ACTION = {
  INIT_GAME: "INIT_GAME",
};

const reducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION.INIT_GAME:
        draft.roomId = action.roomInfo.roomId;
        draft.board = action.roomInfo.board;
        draft.players = action.roomInfo.players;
        break;
      default:
        break;
    }
  });

export { ACTION, initialState, reducer };
