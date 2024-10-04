import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";
import AddEmployee from "../Add Employee/AddEmployee";

const Employees = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  // Sample JSON data for employees
  const employeeData = [
    {
      id: 1,
      name: "John Doe",
      phone: "+123456789",
      place: "New York",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+987654321",
      place: "Los Angeles",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      name: "Mark Johnson",
      phone: "+1122334455",
      place: "Chicago",
      email: "mark.johnson@example.com",
    },
    // Add more employee objects as needed
  ];

  return (
    <>
      <nav><Navbar /></nav>

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

          {/* Employee Details */}
          <div className="overflow-x-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            {employeeData.length > 0 ? (
              employeeData.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-gray-800 border-b border-gray-700 mb-4 p-4 hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  <div className="grid grid-cols-2 text-teal-200 text-xs sm:text-sm">
                    <div className="font-bold text-teal-400">Name:</div>
                    <div>{employee.name}</div>

                    <div className="font-bold text-teal-400">Phone Number:</div>
                    <div>{employee.phone}</div>

                    <div className="font-bold text-teal-400">Place:</div>
                    <div>{employee.place}</div>

                    <div className="font-bold text-teal-400">Email:</div>
                    <div>{employee.email}</div>

                    <div className="col-span-2 flex justify-end space-x-3 mt-2">
                      {/* Call Icon */}
                      <a href={`tel:${employee.phone}`} className="hover:opacity-80">
                        <FaPhoneAlt className="text-teal-400 w-4 h-4 sm:w-5 sm:h-5" />
                      </a>

                      {/* Mail Icon */}
                      <a href={`mailto:${employee.email}`} className="hover:opacity-80">
                        <FaEnvelope className="text-teal-400 w-4 h-4 sm:w-5 sm:h-5" />
                      </a>

                      {/* WhatsApp Icon */}
                      <a href={`https://wa.me/${employee.phone.slice(1)}`} className="hover:opacity-80">
                        <FaWhatsapp className="text-teal-400 w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
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
      </div>
    </>
  );
};

export default Employees;
