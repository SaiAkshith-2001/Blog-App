import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeProvider from "../src/context/ThemeContext";
import { Box, CircularProgress } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <App />
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
