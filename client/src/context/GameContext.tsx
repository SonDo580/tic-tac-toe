import { ReactNode, createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { Room } from "@/types";
import { MESSAGE } from "@/constants/messages";
import { socket } from "@/utils/socket";
import { showSingleToast } from "@/utils/toast";
import { ACTION, initialState, reducer } from "./GameReducer";

const GameContext = createContext(initialState);

type ProviderProps = {
  children: ReactNode;
};

const GameProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const initGame = (roomInfo: Room) => {
    dispatch({ type: ACTION.INIT_GAME, roomInfo });
  };

  const resetGame = () => {
    dispatch({ type: ACTION.RESET_GAME });
  };

  useEffect(() => {
    const roomInitHandler = (roomInfo: Room) => {
      initGame(roomInfo);
      navigate("/game");
    };

    const opponentJoinedHandler = (roomInfo: Room) => {
      initGame(roomInfo);
      toast(MESSAGE.opponentJoined);
    };

    const roomLeavedHandler = () => {
      resetGame();
      navigate("/");
    };

    const opponentLeavedHandler = (roomInfo: Room) => {
      initGame(roomInfo);
      toast(MESSAGE.opponentLeaved);
    };

    const roomUpdatedHandler = (roomInfo: Room) => {
      initGame(roomInfo);
    };

    const resetAcceptedHandler = (roomInfo: Room) => {
      initGame(roomInfo);
      showSingleToast("resetAccepted", MESSAGE.resetSuccessful);
    };

    socket.on("roomCreated", roomInitHandler);
    socket.on("roomJoined", roomInitHandler);
    socket.on("opponentJoined", opponentJoinedHandler);
    socket.on("roomLeaved", roomLeavedHandler);
    socket.on("opponentLeaved", opponentLeavedHandler);
    socket.on("boardUpdated", roomUpdatedHandler);
    socket.on("rematched", roomUpdatedHandler);
    socket.on("resetAccepted", resetAcceptedHandler);

    return () => {
      socket.off("roomCreated", roomInitHandler);
      socket.off("roomJoined", roomInitHandler);
      socket.off("opponentJoined", opponentJoinedHandler);
      socket.off("roomLeaved", roomLeavedHandler);
      socket.off("opponentLeaved", opponentLeavedHandler);
      socket.off("boardUpdated", roomUpdatedHandler);
      socket.off("rematched", roomUpdatedHandler);
      socket.off("resetAccepted", resetAcceptedHandler);
    };
  }, []);

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
