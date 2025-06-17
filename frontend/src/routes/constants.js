import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const BlogWrite = lazy(() => import("../pages/BlogWrite"));
const AskAI = lazy(() => import("../pages/AskAI"));
const MarkdownContent = lazy(() => import("../components/MarkdownContent"));

export const publicRouteConfig = [
  {
    component: <Home />,
    path: "/",
  },
  {
    component: <Login />,
    path: "/login",
  },
  {
    component: <Register />,
    path: "/register",
  },
  {
    component: <About />,
    path: "/about",
  },
];
export const protectedRouteConfig = [
  {
    component: <BlogWrite />,
    path: "/write",
  },
  {
    component: <MarkdownContent />,
    path: "/md",
  },
  {
    component: <Profile />,
    path: "/profile/:id",
  },
  {
    component: <AskAI />,
    path: "/askai",
  },
  {
    component: <BlogPost />,
    path: "/posts/:id/",
  },
];
