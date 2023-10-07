import { createContext, useContext } from "react";

export interface ITokenContext {
  token: string | null;
}

export const TokenContext = createContext<ITokenContext>({
  token: null
});

export const useTokenContext = () => useContext(TokenContext);
