import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeProvider from "../src/context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomBackdrop from "./components/CustomBackdrop";

const root = ReactDOM.createRoot(document.getElementById("root"));

const clientID = process.env.REACT_APP_CLIENT_ID;

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <AuthProvider>
        <SnackbarProvider>
          <ThemeProvider>
            <Suspense fallback={<CustomBackdrop />}>
              <App />
            </Suspense>
          </ThemeProvider>
        </SnackbarProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
