import { lazy } from "react";

const BlogComment = lazy(() => import("../pages/BlogComment"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
// const NoteEditor = lazy(() => import("../pages/Editor"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const Insights = lazy(() => import("../pages/Insights"));
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
  // {
  //   component: <NoteEditor />,
  //   path: "/editor",
  // },
  {
    component: <MarkdownContent />,
    path: "/md",
  },
  {
    component: <AskAI />,
    path: "/askai",
  },
  {
    component: <BlogPost />,
    path: "/posts/:id/",
  },
  {
    component: <BlogComment />,
    path: "/posts/:id/comments",
  },
  {
    component: <Insights />,
    path: "/insights",
  },
];
