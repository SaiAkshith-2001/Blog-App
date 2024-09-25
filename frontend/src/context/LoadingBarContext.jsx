import React, { createContext, useState } from "react";

const LoadingBarContext = createContext();
const LoadingBarProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  return (
    <LoadingBarContext.Provider value={{ progress, setProgress }}>
      {children}
    </LoadingBarContext.Provider>
  );
};

export { LoadingBarContext, LoadingBarProvider };
