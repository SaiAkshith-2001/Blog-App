import React, { useState, useContext, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  CircularProgress,
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
} from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import AskAI from "./pages/AskAI";
import logo from "./assests/logo512.png";
const MarkdownContent = lazy(() => import("./component/MarkdownContent"));
const BlogComment = lazy(() => import("./pages/BlogComment"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NoteEditor = lazy(() => import("./pages/Editor"));
const BlogRead = lazy(() => import("./pages/BlogRead"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Insights = lazy(() => import("./pages/Insights"));
const BlogWrite = lazy(() => import("./pages/BlogWrite"));
const ThemeToggleButton = lazy(() => import("./component/ToggleButton"));
const MenuIcon = lazy(() => import("@mui/icons-material/Menu"));
const PersonIcon = lazy(() => import("@mui/icons-material/Person"));
function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [progress, setProgress] = useState(0);
  const { user, logout } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} component={Link} to="/">
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/read"
          >
            <ListItemText>Posts</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/write"
          >
            <ListItemText>Write</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/editor"
          >
            <ListItemText>Editor</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/md"
          >
            <ListItemText>Content</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/about"
          >
            <ListItemText>About</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <AppBar component="nav" position="fixed">
          <Toolbar>
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
                    width: "25px",
                    height: "25px",
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
              <Button
                color="inherit"
                component={Link}
                to="/"
                onClick={() => setProgress(100)}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/write"
                onClick={() => setProgress(100)}
              >
                Write
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/read"
                onClick={() => setProgress(100)}
              >
                Posts
              </Button>
              {/* <Button
                color="inherit"
                component={Link}
                to="/editor"
                onClick={() => setProgress(100)}
              >
                Editor
              </Button> */}
              <Button
                color="inherit"
                component={Link}
                to="/md"
                onClick={() => setProgress(100)}
              >
                Editor
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                onClick={() => setProgress(100)}
              >
                About
              </Button>
            </Box>
            <Tooltip title="Profile" arrow>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!user ? (
                [
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleMenuClose}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem
                    component={Link}
                    to="/register"
                    onClick={handleMenuClose}
                  >
                    Register
                  </MenuItem>,
                ]
              ) : (
                <MenuItem component={Link} to="/" onClick={handleLogout}>
                  Logout
                </MenuItem>
              )}
            </Menu>
            <ThemeToggleButton />
          </Toolbar>
        </AppBar>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // enabled on smaller devices i.e., mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
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
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          {/* Guest User */}
          <Route path="/read" element={<BlogRead />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/write" element={<BlogWrite />} />
            <Route path="/editor" element={<NoteEditor />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/posts/:id/" element={<BlogPost />} />
            <Route path="/posts/:id/comments" element={<BlogComment />} />
            <Route path="/md" element={<MarkdownContent />} />
            <Route path="/askai" element={<AskAI />} />
          </Route>
          {/* handling 404 page not found */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {/* <Box component="footer" sx={{ py: 4, mt: "auto", textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Made with{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={15}
              viewBox="0 0 512 512"
            >
              <path
                fill="red"
                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
              ></path>
            </svg>{" "}
            in India. &copy; 2024 All rights reserved.
          </Typography>
        </Box> */}
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
