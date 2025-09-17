import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const { authState, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {    
    if (!authState.isUserAuthenticated) {
      setSnackbar({
        open: true,
        message: "Session expired. Please log in again.",
        severity: "error",
      });
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [authState]);
  if (user || authState.isUserAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoute;
