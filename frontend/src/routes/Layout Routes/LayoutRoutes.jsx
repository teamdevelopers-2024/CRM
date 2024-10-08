import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "../../components/Employees/Employees";
import EmployeLeads from "../../components/Employeeleads/EmployeLeads";
import EmployeeHome from "../../components/EmployeeHome/EmployeeHome";
import AdminsLogin from "../../pages/Login/AdminsLogin";
import EmployeeLogin from "../../pages/Login/EmployeeLogin";
import AdminProtecter from "./AdminProtecter";
import EmployeeProtecter from "./EmployeeProtecter";
import Unauthorized from "../../pages/unauthrized/UnAutharized";
import ManageLeads from "../../pages/manageLeads/ManageLeads";
import Profile from "../../pages/Profile/Profile";
import SalesApproval from "../../pages/saleseApproval/SalesApproval";
import AdminHome from "../../pages/adminHome/AdminHome";
import NotFound from "../../components/404/404"; // Adjust the path as necessary

function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/headLogin" element={<AdminsLogin />} />
        <Route path="/403" element={<Unauthorized />} />
        
        <Route element={<EmployeeProtecter />}>
          <Route path="/leads" element={<EmployeLeads />} />
          <Route path="/employehome" element={<EmployeeHome />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<AdminProtecter />}>
          <Route path="/employees" element={<Employees />} />
          <Route path="/manageLead" element={<ManageLeads />} />
          <Route path="/salesRequestes" element={<SalesApproval />} />
          <Route path="/adminHome" element={<AdminHome />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;
