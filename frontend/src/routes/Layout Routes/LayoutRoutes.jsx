import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "../../components/Employees/Employees";
import Login from "../../pages/Login/Login";

function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;
