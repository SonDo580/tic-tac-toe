import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { MESSAGE } from "@/constants/messages";
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

  useEffect(() => {
    socket.on("roomCreated", (roomInfo) => {
      initGame(roomInfo);
      navigate("/game");
    });

    socket.on("roomJoined", (roomInfo) => {
      initGame(roomInfo);
      navigate("/game");
    });

    socket.on("opponentJoined", (roomInfo) => {
      initGame(roomInfo);
      toast(MESSAGE.opponentJoined);
    });

    socket.on("roomLeaved", () => {
      resetGame();
      navigate("/");
    });

    socket.on("opponentLeaved", (roomInfo) => {
      initGame(roomInfo);
      toast(MESSAGE.opponentLeaved);
    });

    socket.on("boardUpdated", (roomInfo) => {
      initGame(roomInfo);
    });

    socket.on("rematched", (roomInfo) => {
      initGame(roomInfo);
    });
  }, []);

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

GameProvider.propTypes = {
  children: PropTypes.node,
};

export { GameContext, GameProvider };
