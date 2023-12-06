import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("auth"));
  let user = data;
//   if (!user) {
//     return <Navigate to="/" replace />
//   }
  return children;
};

export default PrivateRoute;
