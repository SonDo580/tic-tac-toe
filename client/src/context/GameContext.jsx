import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import { ACTION, initialState, reducer } from "./GameReducer";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initGame = (roomInfo) => {
    dispatch({ type: ACTION.INIT_GAME, roomInfo });
  };

  const contextValue = { state, initGame };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node,
};

export { GameContext, GameProvider };
