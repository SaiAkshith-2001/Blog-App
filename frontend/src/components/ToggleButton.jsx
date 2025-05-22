import React, { useContext, lazy } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IconButton, Tooltip } from "@mui/material";
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
      <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"} arrow>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </Tooltip>
    </IconButton>
  );
};
export default ThemeToggleButton;
