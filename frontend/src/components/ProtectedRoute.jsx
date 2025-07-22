import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, send to login page
    console.log('No token, to the login page you go!');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
