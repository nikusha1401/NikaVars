import { createContext, useContext } from "react";

export const IntoLoadingContext = createContext();

export const useLoading = () => useContext(IntoLoadingContext);