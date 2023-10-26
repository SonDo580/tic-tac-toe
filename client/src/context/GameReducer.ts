import type { Room } from "@/types";

const initialState: Room = {};

const enum ACTION {
  INIT_GAME = "INIT_GAME",
  RESET_GAME = "RESET_GAME",
}

type InitGameAction = {
  type: ACTION.INIT_GAME;
  roomInfo: Room;
};
type ResetGameAction = {
  type: ACTION.RESET_GAME;
};
type Action = InitGameAction | ResetGameAction;

const reducer = (state: Room, action: Action) => {
  switch (action.type) {
    case ACTION.INIT_GAME:
      return action.roomInfo;

    case ACTION.RESET_GAME:
      return initialState;

    default:
      return state;
  }
};

export { ACTION, initialState, reducer };
