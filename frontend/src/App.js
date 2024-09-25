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
} from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
const PostComment = lazy(() => import("./pages/PostComment"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NoteEditor = lazy(() => import("./pages/Editor"));
const BlogRead = lazy(() => import("./pages/BlogRead"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogWrite = lazy(() => import("./pages/BlogWrite"));
const ThemeToggleButton = lazy(() => import("./component/ToggleButton"));
const MarkdownEditor = lazy(() => import("./component/MarkdownEditor"));
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
            <ListItemText>Read Blogs</ListItemText>
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
        <AppBar component="nav" position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <Button
                disableRipple
                color="inherit"
                component={Link}
                to="/"
                onClick={() => setProgress(100)}
              >
                &lt;/&gt; Blog
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
                Read
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/editor"
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
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <PersonIcon />
            </IconButton>
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
            <Route path="/posts/:id/" element={<BlogPost />} />
            <Route path="/posts/:id/comments" element={<PostComment />} />
            <Route path="/mdeditor" element={<MarkdownEditor />} />
          </Route>
          {/* handling 404 page not found */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
