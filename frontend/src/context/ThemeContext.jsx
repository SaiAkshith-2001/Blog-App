import React, { createContext, useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [rotate, setRotate] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    setRotate(!rotate);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, rotate }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
