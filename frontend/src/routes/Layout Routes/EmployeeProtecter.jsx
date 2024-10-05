import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const EmployeeProtecter = () => {
    // Check localStorage for employee flag
    const isSuperAdmin = localStorage.getItem('employee') === 'true';

    // If the user is not an employee, redirect to the login page
    if (!isSuperAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render child routes if authorized
};

export default EmployeeProtecter;
