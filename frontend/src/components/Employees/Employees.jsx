import React, { useEffect, useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import addCustomerIcon from "../../assets/addEmployee.svg";
import AddEmployee from "../Add Employee/AddEmployee";
import api from "../../services/api";
import AdminNav from "../AdminNav/AdminNav";

const Employees = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [employees, setEmployees] = useState([])



  useEffect(() => {
    const fetchEmployeData = async () => {
      try {
        const result = await api.getEmployees()
        if (!result.error) {
          setEmployees(result.data)
        } else {
          alert("!Error : fetching Data")
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchEmployeData()
  }, [showAddEmployeeModal])

  return (
    <>
      <AdminNav />
      <div className="bg-blue-950 min-h-screen p-10">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-teal-400 drop-shadow-lg">
              Employees
            </h1>

            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img
                    src={searchIcon}
                    alt="Search Icon"
                    className="w-5 h-5 opacity-70"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search employee..."
                  className="w-55 h-8 pl-8 pr-3 rounded-md bg-gray-800 border border-teal-400 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Add New Employee Button */}
              <button
                className="flex items-center bg-teal-500 text-white font-semibold text-sm px-3 py-2 rounded-md hover:bg-teal-600 transition-all duration-200 shadow-md"
                onClick={() => setShowAddEmployeeModal(true)}
              >
                <img
                  src={addCustomerIcon}
                  alt="Add Icon"
                  className="w-4 h-4 mr-2"
                />
                New Employee
              </button>
            </div>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <table className="table-auto w-full text-left text-white">
              <thead className="bg-gray-900 text-teal-400 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Phone number</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Join Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-teal-200">
                {/* Placeholder Row (No data yet) */}
                {employees.map((emp, index) => (
                  <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition duration-150 ease-in-out">
                    <td className="px-4 py-2">{emp.name}</td>
                    <td className="px-4 py-2">{emp.employeeId}</td>
                    <td className="px-4 py-2">{emp.phoneNumber}</td>
                    <td className="px-4 py-2">{emp.Designation}</td>
                    <td className="px-4 py-2">{new Date(emp.JoiningDate).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-2">
                      <button
                        className="px-2 py-1 text-teal-400 font-semibold rounded-lg text-sm border-2 border-transparent hover:text-white transition-all duration-200 bg-transparent hover:bg-gray-800"
                        style={{
                          borderImage:
                            "linear-gradient(to right, #00B4DB, #0083B0) 1",
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Add more rows as needed */}
              </tbody>
            </table>
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
