import React, { useContext, lazy } from "react";
import Tooltip from "@mui/material/Tooltip";
import { ThemeContext } from "../context/ThemeContext";
import { IconButton } from "@mui/material";
const LightModeIcon = lazy(() => import("@mui/icons-material/LightMode"));
const DarkModeIcon = lazy(() => import("@mui/icons-material/DarkMode"));
const ThemeToggleButton = () => {
  const { darkMode, toggleTheme, rotate } = useContext(ThemeContext);
  return (
    <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"} arrow>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          transition: "transform 0.5s ease-in-out",
          transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
          margin: "auto",
        }}
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
