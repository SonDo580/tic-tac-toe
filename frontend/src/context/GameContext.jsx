import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { SIDE } from "@/constants";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [endGame, setEndGame] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const incrementMoveCount = () => setMoveCount((count) => count + 1);

  useEffect(() => {
    if (moveCount === SIDE * SIDE) {
      setEndGame(true);
    }
  }, [moveCount]);

  const contextValue = { incrementMoveCount, endGame, setEndGame };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node,
};

export { GameContext, GameProvider };
