import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("tokens")
      ? jwtDecode(localStorage.getItem("tokens"))
      : null
  );
  const login = (tokens) => {
    setAuthTokens(tokens);
    setUser(jwtDecode(tokens));
    localStorage.setItem("tokens", JSON.stringify(tokens));
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens));
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
