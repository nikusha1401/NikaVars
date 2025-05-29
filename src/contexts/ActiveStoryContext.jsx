import React, { createContext, useContext, useState } from "react";

const ActiveStoryContext = createContext();

export const ActiveStoryProvider = ({ children }) => {
  const [active, setActive] = useState("bio");

  return (
    <ActiveStoryContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveStoryContext.Provider>
  );
};

export const useActiveStory = () => {
  const context = useContext(ActiveStoryContext);
  if (!context) {
    throw new Error("useActiveStory must be used within ActiveStoryProvider");
  }
  return context;
};
