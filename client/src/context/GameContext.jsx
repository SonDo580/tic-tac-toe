import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import { socket } from "@/utils/socket";
import { ACTION, initialState, reducer } from "./GameReducer";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initGame = (roomInfo) => {
    dispatch({ type: ACTION.INIT_GAME, roomInfo });
  };

  const contextValue = { state, initGame };

  useEffect(() => {
    socket.on("roomJoined", (roomInfo) => {
      initGame(roomInfo);
    });
  }, []);

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node,
};

export { GameContext, GameProvider };
