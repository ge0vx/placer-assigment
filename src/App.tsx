import React from "react";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { TokenContext } from "./context/TokenContext";
import { useUniversalToken } from "./hooks/useUniversalToken";

const App: React.FC = () => {
  //initial configurations
  const { token, tokenLoading, tokenErrorMessage } = useUniversalToken();

  return (
    <TokenContext.Provider
      value={{
        token: token ?? null,
      }}
    >
      <div className="app-container">
        <div className={`${tokenLoading ? "loading" : "not-loading"}`}>
          <img
            src="https://1742632032.rsc.cdn77.org/sysimages/listloader.gif"
            alt="new"
          />
          <p>Loading...</p>
        </div>
        <div className={`${tokenErrorMessage ? "error" : "not-error"}`}>
          {tokenErrorMessage}
        </div>
        {!tokenLoading && !!token && <SignUp />}
        <p className="sign">Giovany Perez Bautista | giovanypeb@gmail.com</p>
      </div>
    </TokenContext.Provider>
  );
};

export default App;
