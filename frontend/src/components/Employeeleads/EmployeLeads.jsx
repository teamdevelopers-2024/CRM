import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaShare, FaWhatsapp } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";
import AddEmployee from "../Add Employee/AddEmployee";
import BottomNav from "../BottomNav/BottomNav";
import CloseSale from "../closeSaleModal/CloseSale";
import api from "../../services/api";
import Swal from "sweetalert2";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

const Employees = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [closeModal, setCloseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadsData, setLeadsData] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      const id = localStorage.getItem("employeeId");

      const fetchData = async () => {
        console.log("this is id ", id);
        const result = await api.getLeads(id);
        if (!result.error) {
          setLeadsData(result.data);
          console.log(result.data);
        } else {
          Swal("!error", "something went wrong", "error");
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setLeadsData((prevData) =>
      prevData.map((employee) =>
        employee.id === id ? { ...employee, status: newStatus } : employee
      )
    );
  };

  // Filter employees based on the active tab
  const filteredEmployees = leadsData.filter((employee) => {
    if (activeTab === "all") return true;
    return employee.status === activeTab;
  });

  return (
    <>
      {loading && <LoadingSpinner />}
      <nav>
        <Navbar Leads={true} />
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
              {["all", "pending", "not responded", "closed", "rejected", "need to follow up"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`text-teal-300 hover:bg-gray-700 rounded-md px-4 py-2 ${activeTab === status ? "bg-gray-700" : "bg-gray-800"
                    }`}
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
                  key={employee._id}
                  className="bg-gray-900 border border-gray-700 mb-6 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <HiUserCircle className="text-teal-400 w-14 h-14 mr-4" />
                    <div className="flex w-full flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-lg mt-2 font-bold text-teal-400">
                          {employee.name?.length > 12
                            ? `${employee.name.slice(0, 12)}..`
                            : employee.name || "N/A"}
                        </h3>
                        <button
                          onClick={() => setCloseModal(true)}
                          className="flex items-center bg-green-900 mt-2 text-white font-semibold rounded-full px-2 py-1 text-sm shadow transition duration-150 ease-in-out"
                        >
                          <FaShare className="w-3 h-3 mr-1" />
                          <span className="text-xs">Close Sale</span>
                        </button>
                      </div>
                      <span className="text-teal-200 mb-1 text-sm">
                        {employee.place ? employee.place : employee.college ? employee.college : employee.district ? employee.district : ' '}
                      </span>
                      <span className="text-teal-200 mb-1 text-sm">
                        {employee.email || "N/A"}
                      </span>
                      <span className="text-teal-200 mb-1 text-sm">
                        {`${employee.phone}` || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <select
                      value={employee.status}
                      onChange={(e) =>
                        handleStatusChange(employee._id, e.target.value)
                      }
                      className="bg-gray-700 text-teal-300 border border-teal-400 rounded-md text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="not responded">Not Responded</option>
                      <option value="rejected">Rejected</option>
                      <option value="closed">Closed</option>
                      <option value="on college">On College</option>
                      <option value="need to follow up">
                        Need to Follow Up
                      </option>
                    </select>
                    <div className="flex space-x-4">
                      <a href={`https://api.whatsapp.com/send/?phone=91${employee.phone}&text=Hi,%20I%27m%20contacting%20from%20Ivanios%20College.`}>
                        <FaWhatsapp className="text-teal-400"/>
                      </a>
                      <a
                        href={`tel:${employee.phone}`}
                        className="flex items-center gap-1 text-white p-2 border border-teal-200 rounded-3xl hover:opacity-80"
                      >
                        <FaPhoneAlt className="text-teal-400" />
                        <p className="text-sm">Call</p>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-teal-200">No Leads found.</div>
            )}
          </div>
        </div>

        {showAddEmployeeModal && (
          <AddEmployee onClose={() => setShowAddEmployeeModal(false)} />
        )}
        <BottomNav />
      </div>
      {closeModal && <CloseSale setCloseModal={setCloseModal} />}
    </>
  );
};

export default Employees;
