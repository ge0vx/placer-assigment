import React from "react";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { TokenContext } from "./context/TokenContext";
import { useUniversalTutorial } from "./hooks/useUniversalTutorial";

const App: React.FC = () => {
  const { token, tokenLoading, tokenErrorMessage } = useUniversalTutorial();

  return (
    <TokenContext.Provider
      value={{
        token: token ?? null
      }}
    >
      <div className="app-container">
        {tokenLoading && <div className="app-loading">loading...</div>}
        {tokenErrorMessage && <div className="app-error">{tokenErrorMessage}</div>}
        {!tokenLoading && token && <SignUp />}
      </div>
    </TokenContext.Provider>
  );
};

export default App;
