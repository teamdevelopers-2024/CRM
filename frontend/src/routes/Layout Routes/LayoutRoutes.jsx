import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "../../components/Employees/Employees";
import EmployeLeads from "../../components/Employeeleads/EmployeLeads"
import EmployeeHome from "../../components/EmployeeHome/EmployeeHome"
import Login from "../../pages/Login/Login";

function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Employees />} />
        <Route path="/leads" element={<EmployeLeads />} />
        <Route path="/employehome" element={<EmployeeHome />} />
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;
