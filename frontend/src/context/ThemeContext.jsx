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
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "24px",
              },

              contained: {
                textTransform: "none",
                borderRadius: "24px",
              },
              outlined: {
                textTransform: "none",
                borderRadius: "24px",
              },
              text: {
                // textTransform: "none",
                // borderRadius: "24px",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                  "& fieldset": {
                    borderRadius: "40px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "16px 24px",
                  },
                },
                "& .MuiFilledInput-root": {
                  borderRadius: "24px",
                  "& fieldset": {
                    borderRadius: "24px",
                  },
                },
                "& .MuiInput-root": {
                  borderRadius: "24px",
                  "& fieldset": {
                    borderRadius: "24px",
                  },
                },
              },
            },
          },
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
