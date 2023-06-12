import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  const Navigate = useNavigate()

  if (!user) {
    return Navigate("auth/login");
  } else {
    return children;
  }
};

export default ProtectedRoute;
