import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { socket } from "@/utils/socket";
import { ACTION, initialState, reducer } from "./GameReducer";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const initGame = (roomInfo) => {
    dispatch({ type: ACTION.INIT_GAME, roomInfo });
  };

  const resetGame = () => {
    dispatch({ type: ACTION.RESET_GAME });
  };

  const contextValue = { state, initGame };

  useEffect(() => {
    socket.on("roomJoined", (roomInfo) => {
      initGame(roomInfo);
    });

    socket.on("opponentLeaved", (roomInfo) => {
      initGame(roomInfo);
    });

    socket.on("roomLeaved", () => {
      resetGame();
      navigate("/");
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
