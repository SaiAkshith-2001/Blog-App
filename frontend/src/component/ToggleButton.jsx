import React, { useContext, lazy } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IconButton } from "@mui/material";
const LightModeIcon = lazy(() => import("@mui/icons-material/LightMode"));
const NightlightIcon = lazy(() => import("@mui/icons-material/Nightlight"));
const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {darkMode ? <LightModeIcon /> : <NightlightIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
