import React, { useContext, lazy } from "react";
import Tooltip from "@mui/material/Tooltip";
import { ThemeContext } from "../context/ThemeContext";
import { IconButton } from "@mui/material";
const LightModeIcon = lazy(() => import("@mui/icons-material/LightMode"));
const NightlightIcon = lazy(() => import("@mui/icons-material/Nightlight"));
const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"} arrow>
      <IconButton onClick={toggleTheme} color="inherit">
        {darkMode ? <LightModeIcon /> : <NightlightIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
