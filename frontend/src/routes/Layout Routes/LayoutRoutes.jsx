import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "../../components/Employees/Employees";
import Login from "../../pages/Login/Login";
import Profile from "../../components/Profile/Profile";

function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Employees />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;
