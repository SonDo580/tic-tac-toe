import { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { createBoard } from "@/utils/board";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(createBoard);

  const resetBoard = useCallback(() => setBoard(createBoard()), []);

  const contextValue = useMemo(
    () => ({ board, setBoard, resetBoard }),
    [board, resetBoard]
  );

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node,
};

export { BoardContext, BoardProvider };
