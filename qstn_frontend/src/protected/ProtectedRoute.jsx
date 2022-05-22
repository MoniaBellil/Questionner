import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
const ProtectedRoute = () => {
  const token = Cookies.get("token");

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
