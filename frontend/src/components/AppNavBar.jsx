import { lazy, useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import { navItems } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import logo from "../assests/images/logo512.png";
import { Link } from "react-router-dom";
const ThemeToggleButton = lazy(() => import("../components/ToggleButton"));
const MenuIcon = lazy(() => import("@mui/icons-material/Menu"));
const LogoutIcon = lazy(() => import("@mui/icons-material/Logout"));
const PersonRoundedIcon = lazy(() =>
  import("@mui/icons-material/PersonRounded")
);
const AppNavBar = ({ window, theme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [progress, setProgress] = useState(0);
  const { user, logout } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const open = Boolean(anchorEl); // eslint-disable-line no-unused-vars

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      setAnchorEl(null);
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.path}
            >
              <ListItemText>{item.text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          color: "inherit",
          width: "90%",
          bgcolor: "transparent",
          boxShadow: 0,
          backgroundImage: "none",
          mt: "16px",
        }}
      >
        <Toolbar
          sx={{
            width: "90%",
            backdropFilter: "blur(24px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 2px rgba(29, 29, 29, 0.15)",
            padding: "8px 16px",
          }}
        >
          <Tooltip title="Menu" arrow>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Button
              disableRipple
              color="inherit"
              component={Link}
              to="/"
              onClick={() => setProgress(100)}
            >
              <Box
                component="img"
                src={logo}
                sx={{
                  alignItems: "center",
                  width: { xs: "20px", sm: "25px" },
                  height: { xs: "20px", sm: "25px" },
                  mr: 0.75,
                }}
              />
              Blog
            </Button>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {navItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.path}
                onClick={() => setProgress(100)}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          {user ? (
            <Tooltip title="Profile" arrow>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar alt={user?.name} src={user?.picture ?? user?.name} />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant="outlined"
              disableRipple
              color="inherit"
              component={Link}
              to="/login"
            >
              Sign in
            </Button>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose()}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {!user
              ? [
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={() => handleMenuClose()}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem
                    component={Link}
                    to="/register"
                    onClick={() => handleMenuClose()}
                  >
                    Register
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    component={Link}
                    to={`/profile/${
                      user?.username || user?.email.split("@")[0]
                    }`}
                    onClick={() => handleMenuClose()}
                  >
                    <ListItemIcon>
                      <PersonRoundedIcon />
                    </ListItemIcon>
                    Profile
                  </MenuItem>,
                  <MenuItem
                    component={Link}
                    to="/"
                    onClick={() => handleLogout()}
                  >
                    <ListItemIcon sx={{ color: "red" }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    Logout
                  </MenuItem>,
                ]}
          </Menu>
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>
      <Drawer
        aria-label="Navigation Menu"
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppNavBar;
