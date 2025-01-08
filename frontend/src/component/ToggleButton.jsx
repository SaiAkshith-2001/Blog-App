import React, { useContext, lazy } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IconButton } from "@mui/material";
const LightModeIcon = lazy(() => import("@mui/icons-material/LightMode"));
const DarkModeIcon = lazy(() => import("@mui/icons-material/DarkMode"));
const ThemeToggleButton = () => {
  const { darkMode, toggleTheme, rotate } = useContext(ThemeContext);
  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      sx={{
        transition: "transform 0.5s ease-in-out",
        transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
export default ThemeToggleButton;
