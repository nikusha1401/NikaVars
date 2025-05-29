import { createContext, useContext } from "react";

export const ScrollSmootherContext = createContext(null);

export const useScrollSmoother = () => useContext(ScrollSmootherContext);
