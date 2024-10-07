import React, { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav/AdminNav";
import { FaArrowAltCircleUp, FaUser } from "react-icons/fa";
import api from "../../services/api";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import AssignLeadsModal from "../../components/assignation/AssignationModal";

function ManageLeads() {
  const [employees, setEmployees] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [page, setPage] = useState(1); // Keep track of the current page
  const [isLoading, setIsLoading] = useState(false); // Loading state for pagination
  const [hasMore, setHasMore] = useState(true); // To check if there are more employees to load
  const [leadEmployee , setLeadEmployee] = useState({})
  const [assignLeadModal , setAssignLeadModal] = useState(false)

  // Function to fetch employees
  const fetchLeadsData = async () => {
    if (isLoading || !hasMore) return; // Prevent fetching if already loading or no more data

    setIsLoading(true);
    try {
      const result = await api.getEmployeesForLeads(page)

      setEmployees((prevEmployees) => [...prevEmployees, ...result.data]); // Append new data
      setTotalLeads(result.totalEmployees);
      setHasMore(result.data.length > 0 && employees.length < result.totalEmployees); // Check if more data is available
      setPage((prevPage) => prevPage + 1); // Move to the next page
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data initially and as user scrolls
  useEffect(() => {
    fetchLeadsData();
  }, []);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 && !isLoading) {
        fetchLeadsData(); // Load more data when near the bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, page]);

  return (
    <>
    {isLoading && <LoadingSpinner/>}
      <AdminNav Leads={true} />
      <div className="bg-blue-950 min-h-screen p-10">
        <h1 className="text-white text-3xl mb-10">Manage Leads</h1>

        {/* Employee Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative"
            >
              {/* User Icon */}
              <div className="bg-blue-500 rounded-full p-3">
                <FaUser className="text-white text-3xl" />
              </div>

              {/* Employee Info */}
              <div className="mt-4 text-center">
                <h2 className="text-gray-800 font-bold text-xl">{employee.name}</h2>
                <p className="text-gray-600">Phone: {employee.phoneNumber
                    }</p>
                <p className="text-gray-600">Employee ID: {employee.employeeId}</p>
              </div>

              {/* Uncompleted Task Badge */}
              {employee.taskCount > 0 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {employee.taskCount}
                </div>
              )}

              {/* Assign Button */}
              <button
              onClick={()=> {
                setLeadEmployee(employee)
                setAssignLeadModal(true)}}
              className="mt-4 gap-1 flex bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                <div className="relative top-1">
                  <FaArrowAltCircleUp />
                </div>
                <p>Assign</p>
              </button>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {/* {isLoading && <p className="text-white text-center">Loading more employees...</p>} */}
      </div>
          { assignLeadModal && leadEmployee && <AssignLeadsModal setAssignLeadModal={setAssignLeadModal} setLeadEmployee={setLeadEmployee} employee={leadEmployee} />}
    </>
  );
}

export default ManageLeads;
