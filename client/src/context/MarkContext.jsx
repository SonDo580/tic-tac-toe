import { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { MARK } from "@/constants";

const MarkContext = createContext();

const MarkProvider = ({ children }) => {
  const [mark, setMark] = useState(MARK.X);

  const switchMark = useCallback(() => {
    setMark((mark) => (mark === MARK.X ? MARK.O : MARK.X));
  }, []);

  const contextValue = useMemo(
    () => ({ mark, setMark, switchMark }),
    [mark, switchMark]
  );

  return (
    <MarkContext.Provider value={contextValue}>{children}</MarkContext.Provider>
  );
};

MarkProvider.propTypes = {
  children: PropTypes.node,
};

export { MarkContext, MarkProvider };
