import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/" replace /> // Redirect to login page if not authenticated
        )
      }
    />
  );
};

export default PrivateRoute;
