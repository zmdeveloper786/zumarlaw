import React from "react";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("adminToken");
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;
