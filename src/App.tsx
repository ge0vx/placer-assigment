import React from "react";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { TokenContext } from "./context/TokenContext";
import { useUniversalTutorial } from "./hooks/useUniversalTutorial";

const App: React.FC = () => {
  //initial configurations
  const { token, tokenLoading, tokenErrorMessage } = useUniversalTutorial();

  return (
    <TokenContext.Provider
      value={{
        token: token ?? null
      }}
    >
      <div className="app-container">
        <div className={`${tokenLoading ? 'loading' : 'not-loading'}`}>loading...</div>
        <div className={`${tokenErrorMessage ? 'error' : 'not-error'}`}>{tokenErrorMessage}</div>
        { !tokenLoading && !!token && <SignUp />}
      </div>
    </TokenContext.Provider>
  );
};

export default App;
