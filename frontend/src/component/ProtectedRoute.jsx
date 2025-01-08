import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error(error);
    return true;
  }
};
const ProtectedRoute = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const { authTokens, setAuthTokens, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authTokens && isTokenExpired(authTokens)) {
      localStorage.removeItem("tokens");
      setAuthTokens(null);
      setSnackbar({
        open: true,
        message: "Session expired. Please log in again.",
        severity: "error",
      });
      navigate("/login");
    }
  }, [authTokens, isTokenExpired, setAuthTokens, setSnackbar, navigate]);
  if (user && authTokens && !isTokenExpired(authTokens)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoute;
