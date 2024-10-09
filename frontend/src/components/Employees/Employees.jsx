import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert
import searchIcon from "../../assets/searchIcon.svg";
import addCustomerIcon from "../../assets/addEmployee.svg";
import AddEmployee from "../Add Employee/AddEmployee";
import api from "../../services/api";
import AdminNav from "../AdminNav/AdminNav";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

const Employees = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const result = await api.getEmployees({
          page: currentPage,
          limit,
          search: searchTerm,
        });
        if (!result.error) {
          setEmployees(result.data);
          setTotalPages(result.pagination.totalPages);
        } else {
          alert("Error fetching data!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, [currentPage, showAddEmployeeModal, showEditEmployeeModal, searchTerm]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditEmployeeModal(true);
  };

  const handleDelete = async (employeeId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await api.deleteEmployee(employeeId);
        setEmployees(employees.filter(emp => emp.id !== employeeId));
        Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
      } catch (error) {
        console.error("Failed to delete employee", error);
        Swal.fire('Error!', 'Failed to delete the employee.', 'error');
      }
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <AdminNav />
      <div className="bg-blue-950 min-h-screen p-10">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-teal-400 drop-shadow-lg mb-4 sm:mb-0">
              Employees
            </h1>
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
              <div className="relative mb-4 sm:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img src={searchIcon} alt="Search Icon" className="w-5 h-5 opacity-70" />
                </div>
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full sm:w-55 h-8 pl-8 pr-3 rounded-md bg-gray-800 border border-teal-400 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <button
                className="flex items-center bg-teal-500 text-white font-semibold text-sm px-3 py-2 rounded-md hover:bg-teal-600 transition-all duration-200 shadow-md"
                onClick={() => setShowAddEmployeeModal(true)}
              >
                <img src={addCustomerIcon} alt="Add Icon" className="w-4 h-4 mr-2" />
                New Employee
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900 text-teal-400 text-sm uppercase">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Employee ID</th>
                  <th className="px-4 py-2 text-left">Phone number</th>
                  <th className="px-4 py-2 text-left">Designation</th>
                  <th className="px-4 py-2 text-left">Join Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-teal-200">
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition duration-150 ease-in-out">
                      <td className="px-4 py-2">{emp.name}</td>
                      <td className="px-4 py-2">{emp.employeeId}</td>
                      <td className="px-4 py-2">{emp.phoneNumber}</td>
                      <td className="px-4 py-2">{emp.Designation}</td>
                      <td className="px-4 py-2">{new Date(emp.JoiningDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          className="text-teal-400 hover:text-white transition"
                          onClick={() => handleEdit(emp)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-white transition"
                          onClick={() => handleDelete(emp.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center px-4 py-2 text-teal-300">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {employees.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                className={`px-4 py-2 mx-1 text-white bg-teal-500 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                className={`px-4 py-2 mx-1 text-white bg-teal-500 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {showAddEmployeeModal && (
          <AddEmployee setShowAddEmployeeModal={setShowAddEmployeeModal} />
        )}
        {/* Uncomment below to show edit modal */}
        {/* {showEditEmployeeModal && (
          <EditEmployee 
            employee={selectedEmployee} 
            setShowEditEmployeeModal={setShowEditEmployeeModal} 
            setEmployees={setEmployees} 
          />
        )} */}
      </div>
    </>
  );
};

export default Employees;
