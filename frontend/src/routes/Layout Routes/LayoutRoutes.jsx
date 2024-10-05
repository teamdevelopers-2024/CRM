import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "../../components/Employees/Employees";
import EmployeLeads from "../../components/Employeeleads/EmployeLeads";
import EmployeeHome from "../../components/EmployeeHome/EmployeeHome";
import AdminsLogin from "../../pages/Login/AdminsLogin";
import EmployeeLogin from "../../pages/Login/EmployeeLogin";
import AdminProtecter from "./adminProtecter";
import EmployeeProtecter from "./EmployeeProtecter";

function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/headLogin" element={<AdminsLogin />} />

        <Route element={<EmployeeProtecter/>}>
        <Route path="/leads" element={<EmployeLeads />} />
        <Route path="/employehome" element={<EmployeeHome />} />
        </Route>
        {/* Protected Routes */}
        <Route element={<AdminProtecter />}>
          <Route path="/employees" element={<Employees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;
