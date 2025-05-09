import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { protectedRouteConfig, publicRouteConfig } from "./constants";
import ProtectedRoute from "../components/ProtectedRoute";
const NotFound = lazy(() => import("../pages/NotFound"));
const BlogRead = lazy(() => import("../pages/BlogRead"));
export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        {publicRouteConfig.map((item, index) => (
          <Route key={index} path={item.path} element={item.component} />
        ))}
        {/* Guest User */}
        <Route path="/read" element={<BlogRead />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {protectedRouteConfig.map((item, index) => (
            <Route key={index} path={item.path} element={item.component} />
          ))}
        </Route>
        {/* handling 404 page not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
