import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState({
    loading: true,
    isUserAuthenticated: false,
  });

  const login = (res) => {
    setAuthState({
      loading: false,
      isUserAuthenticated: true,
    });
    const data = res.token ?? res.user;
    setUser(data);
  };

  const logout = () => {
    setAuthState({ loading: false, isUserAuthenticated: false });
    setUser(null);
  };

  useEffect(() => {
    if (authState) {
      setUser(user);
    }
  }, [user, authState]);

  return (
    <AuthContext.Provider value={{ login, logout, user, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
