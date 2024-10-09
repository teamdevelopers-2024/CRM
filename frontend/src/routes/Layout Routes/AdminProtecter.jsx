import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtecter = () => {
  // Check localStorage for superadmin flag
  const isSuperAdmin = localStorage.getItem("superadmin") === "true";

  // If the user is not a super admin, redirect to the login page
  if (!isSuperAdmin) {
    return <Navigate to="/403" replace />;
  }

  // Render the nested routes if authorized
  return <Outlet />;
};

export default AdminProtecter;
