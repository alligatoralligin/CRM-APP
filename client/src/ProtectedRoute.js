import React from "react";
const { Navigate } = require("react-router-dom");

const ProtectedRoute = ({ isLoggedIn, redirectPath = "/Login", children }) => {
  if (isLoggedIn === false) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
