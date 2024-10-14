import React, { useEffect, useState } from "react";
import { FaArrowCircleUp, FaCheck, FaExclamationCircle, FaFilter, FaInfoCircle, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";
import BottomNav from "../BottomNav/BottomNav";
import CloseSale from "../closeSaleModal/CloseSale";
import api from "../../services/api";
import Swal from "sweetalert2";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import ViewDetailsModal from "../ViewDetailModal/ViewDetailModal";

const Leads = () => {
  const [activeTab, setActiveTab] = useState("New");
  const [closeModal, setCloseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [closeLead, setCloseLead] = useState({});
  const [reRequestModal, setReRequestModal] = useState(false)
  const [viewDetailModal, setViewDetailModal] = useState(false)
  const [viewData, setViewData] = useState({})
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const id = localStorage.getItem("employeeId");

        const result = await api.getLeads({ searchText, id });

        if (!result.error) {
            setLeadsData(result.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonText: "OK",
            background: "#1c1c1e",
            color: "#fff",
            iconColor: "#e74c3c",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setIsFetchingMore(false); // Reset fetching state
      }
    };
    fetchData()
  }, []);




  const handleStatusChange = async (id, newStatus) => {
    setLoading(true)
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to change the status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
      background: "#1c1c1e",
      color: "#fff",
      iconColor: "white",
    });

    if (result.isConfirmed) {
      try {
        const employeeId = localStorage.getItem("employeeId");
        const response = await api.updateLeadStatus({
          id,
          newStatus,
          employeeId,
        });

        if (response.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error when updating!",
            confirmButtonText: "OK",
            background: "#1c1c1e",
            color: "#fff",
            iconColor: "#e74c3c",
          });
        } else {
          // Update the status in the frontend state
          setLeadsData((prevLeads) =>
            prevLeads.map((lead) =>
              lead._id === id ? { ...lead, status: newStatus } : lead
            )
          );

          // Optionally show a success message
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Status updated successfully.",
            confirmButtonText: "OK",
            background: "#1c1c1e",
            color: "#fff",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
  };

  const filteredLeads = leadsData.filter((lead) => {
    console.log(lead)
    if (activeTab === "New") return lead.status === "N/A" || lead.status === 'pending'
    return lead.status === activeTab;
  });



  const handleViewClick = (data) => {
    setViewData(data)
    setViewDetailModal(true)
  }


  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <nav>
        <Navbar Leads={true} />
      </nav>

      <div className="bg-blue-950 min-h-screen p-4 sm:p-10">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 space-y-4 sm:space-y-0">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-teal-400 drop-shadow-lg">
              Leads
            </h1>

            {/* Search Bar with Filter */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              {/* Filter Icon */}
              {/* <FaFilter className="text-white" /> 
              <input type="" /> */}

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-teal-300 w-5 h-5 opacity-70" />
                </div>

                <input
                  type="text"
                  placeholder="Search"
                  value={searchText} // Bind the value to searchText
                  onChange={(e) => handleSearchChange(e)} // Update state on input change
                  className="h-10 pl-10 pr-3 w-full rounded-md bg-gray-800 border border-teal-400 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          </div>


          {/* Tabs Section */}
          <div className="overflow-x-auto whitespace-nowrap mb-4">
            <div className="inline-flex scroll-hidden space-x-4">
              {[
                "New",
                "not responded",
                "need to follow up",
                "on college",
                "rejected",
                "closed",
                "admin rejected"
              ].map((status) => (
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

          {/* Lead Details */}
          <div className="overflow-x-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => (
                <div
                  key={`${lead._id}-${index}`}
                  className="bg-gray-900 border border-gray-700 mb-6 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <HiUserCircle onClick={() => handleViewClick(lead)} className="text-teal-400 cursor-pointer w-14 h-14 mr-4" />
                    <div className="flex w-full flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-lg mt-2 font-bold text-teal-400">
                          {lead.name && lead.name.length > 11
                            ? `${lead.name.substring(0, 11)}...`
                            : lead.name || "N/A"}
                        </h3>

                        {lead.status == "closed" ? (
                          <button
                            className="flex items-center bg-green-500 mt-2 text-white font-semibold rounded-full px-2 py-1 text-sm shadow transition duration-150 ease-in-out"
                          >
                            <FaCheck className="w-3 h-3 mr-1" />
                            <span className="text-8px font-sans custom-lg:text-15px">
                              Closed
                            </span>
                          </button>
                        ) : (
                          lead.status == "close requested" ? (
                            <button
                              className="flex items-center bg-yellow-600 mt-2 text-white font-semibold rounded-full px-2 py-1 text-sm shadow transition duration-150 ease-in-out"
                            >
                              <FaInfoCircle className="w-3 h-3 mr-1" />
                              <span className="text-8px font-sans custom-lg:text-15px">
                                Req Pending
                              </span>
                            </button>
                          ) : (
                            lead.status == 'admin rejected' ? (
                              <button
                                className="flex items-center bg-red-600 mt-2 text-white font-semibold rounded-full px-2 py-1 text-sm shadow transition duration-150 ease-in-out"
                              >
                                <FaExclamationCircle className="w-3 h-3 mr-1" />
                                <span className="text-8px font-sans custom-lg:text-15px">
                                  Admin Rejected
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setCloseModal(true);
                                  setCloseLead(lead);
                                }}
                                className="flex items-center bg-green-900 mt-2 text-white font-semibold rounded-full px-2 py-1 text-sm shadow transition duration-150 ease-in-out"
                              >
                                <FaArrowCircleUp className="w-3 h-3 mr-1" />
                                <span className="text-8px font-sans custom-lg:text-15px">
                                  Close Request
                                </span>
                              </button>
                            )
                          )
                        )}

                      </div>
                      <span className="text-teal-200 mb-1 text-sm">
                        {lead.place
                          ? lead.place
                          : lead.college
                            ? lead.college
                            : lead.district
                              ? lead.district
                              : " "}
                      </span>
                      <span className="text-teal-200 mb-1 text-sm">
                        {lead.email || "N/A"}
                      </span>
                      <span className="text-teal-200 mb-1 text-sm">
                        {`${lead.phone}` || "N/A"}
                      </span>
                      <span className="text-teal-200 mb-1 text-sm">
                        {`Refference : ${lead.leadReference}` || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <select
                      value={lead.status}
                      disabled={lead.status === "close requested" || lead.status === "closed"}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      className={`bg-gray-700 text-teal-300 border border-teal-400 rounded-md text-sm ${lead.status === "close requested" || lead.status === "closed"
                        ? "opacity-50 cursor-not-allowed"  // Reduce opacity and disable interaction
                        : "opacity-100"  // Full opacity when enabled
                        }`}
                    >
                      {lead.status === "close requested" && (
                        <option value="close requested">Close Requested</option>
                      )}
                      {lead.status === "closed" && (
                        <option value="closed">Closed</option>
                      )}
                      <>
                        {lead.status == 'N/A'  && <option value="N/A">New</option>}
                        {lead.status == 'pending' && <option value="pending">New</option>}
                        <option value="not responded">Not Responded</option>
                        <option value="rejected">Rejected</option>
                        <option value="onCollege">On College</option>
                        <option value="need to follow up">Need to Follow Up</option>
                      </>
                    </select>


                    <div className="flex space-x-4">
                      <a
                        href={`https://wa.me/${lead.phone}`}
                        className="text-teal-300 hover:text-white transition duration-150 ease-in-out"
                      >
                        <FaWhatsapp className="w-8 h-8" />
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-teal-300 hover:text-white transition duration-150 ease-in-out"
                      >
                        <FaPhoneAlt className="w-7 h-8" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-teal-300 text-lg text-center">
                No leads available.
              </div>
            )}
          </div>

          {/* Loading more text */}
          {isFetchingMore && (
            <div className="text-teal-300 text-center mt-4">
              Loading more leads...
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      {closeModal && (
        <CloseSale lead={closeLead} setLeadsData={setLeadsData} setCloseModal={setCloseModal} />
      )}
      {/* {reRequestModal && <RerequestModal setReRequestModal={setReRequestModal} />} */}
      {viewDetailModal && <ViewDetailsModal setViewDetailModal={setViewDetailModal} data={viewData} />}
    </>
  );
};

export default Leads;
