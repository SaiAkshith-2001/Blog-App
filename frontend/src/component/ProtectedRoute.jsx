import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const ProtectedRoute = () => {
  const { authTokens, user } = useContext(AuthContext);
  if (authTokens && isTokenExpired(authTokens)) {
    localStorage.removeItem("tokens");
  }
  if (user && authTokens && !isTokenExpired(authTokens)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoute;
