import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaShare } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";
import AddEmployee from "../Add Employee/AddEmployee";
import BottomNav from "../BottomNav/BottomNav";

const Employees = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // State for active tab

  // Sample JSON data for employees with statuses
  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+123456789",
      place: "New York",
      email: "john.doe@example.com",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+987654321",
      place: "Los Angeles",
      email: "jane.smith@example.com",
      status: "not responded",
    },
    {
      id: 3,
      name: "Mark Johnson",
      phone: "+1122334455",
      place: "Chicago",
      email: "mark.johnson@example.com",
      status: "closed",
    },
  ]);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === id ? { ...employee, status: newStatus } : employee
      )
    );
  };

  // Filter employees based on the active tab
  const filteredEmployees = employeeData.filter((employee) => {
    if (activeTab === "all") return true;
    return employee.status === activeTab;
  });

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <div className="bg-blue-950 min-h-screen p-4 sm:p-10">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-400 drop-shadow-lg mb-4 sm:mb-0">
              Leads
            </h1>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-teal-300 w-5 h-5 opacity-70" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 pl-10 pr-3 rounded-md bg-gray-800 border border-teal-400 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="overflow-x-auto whitespace-nowrap mb-4">
            <div className="inline-flex scroll-hidden space-x-4">
              {/* Define the statuses you want to filter by */}
              {["all", "pending", "not responded", "closed", "rejected", "need to follow up"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`text-teal-300 hover:bg-gray-700 rounded-md px-4 py-2 ${activeTab === status ? "bg-gray-700" : "bg-gray-800"}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Employee Details */}
          <div className="overflow-x-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-gray-900 border border-gray-700 mb-6 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <HiUserCircle className="text-teal-400 w-14 h-14 mr-4" />
                    <div className="flex w-full flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-lg mt-2 font-bold text-teal-400">
                        {employee.name.length > 12 ? `${employee.name.slice(0, 12)}..` : employee.name}
                      </h3>

                        <button
                          className="flex items-center bg-green-900 mt-2 text-white font-semibold rounded-full px-2 py-1 text-sm shadow transition duration-150 ease-in-out"
                        >
                          <FaShare className="w-3 h-3 mr-1" /> {/* Smaller icon */}
                          <span className="text-xs">Close Sale</span> {/* Smaller text */}
                        </button>


                      </div>
                      <span className="text-teal-200 mb-1 text-sm">{employee.place}</span>
                      <span className="text-teal-200 mb-1 text-sm">{employee.email}</span>
                      <span className="text-teal-200 mb-1 text-sm">{employee.phone}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <select
                      value={employee.status}
                      onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                      className="bg-gray-700 text-teal-300 border border-teal-400 rounded-md text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="not responded">Not Responded</option>
                      <option value="rejected">Rejected</option>
                      <option value="closed">Closed</option>
                      <option value="need to follow up">Need to Follow Up</option>
                    </select>
                    <div className="flex space-x-4">
                      {/* Call Icon */}

                      <a href={`tel:${employee.phone}`} className="flex items-center gap-1 text-white p-2 border border-teal-200 rounded-3xl  hover:opacity-80">
                        <FaPhoneAlt className="text-teal-400" /><p className="text-sm">Call</p>
                      </a>
                      {/* Mail Icon */}
                      {/* <a href={`mailto:${employee.email}`} className="hover:opacity-80">
                        <FaEnvelope className="text-teal-400 w-6 h-6" />
                      </a> */}

                      {/* WhatsApp Icon */}
                      {/* <a href={`https://wa.me/${employee.phone.slice(1)}`} className="hover:opacity-80">
                        <FaWhatsapp className="text-teal-400 w-6 h-6" />
                      </a> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-teal-200">
                No employees found.
              </div>
            )}
          </div>
        </div>

        {/* Add Employee Modal */}
        {showAddEmployeeModal && (
          <AddEmployee onClose={() => setShowAddEmployeeModal(false)} />
        )}
        <BottomNav />
      </div>
    </>
  );
};

export default Employees;
