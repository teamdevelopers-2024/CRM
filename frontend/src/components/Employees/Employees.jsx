import React from "react";
// import History from "../History/History";
// import PaymentModal from "../Pay Modal/PaymentModal"; // Import the Payment Modal
// import CreditForm from "../Credit Form/CreditForm";
// import api from "../../services/api";
import searchIcon from "../../assets/searchIcon.svg";
import addCustomerIcon from "../../assets/addEmployee.svg";
import Navbar from "../Navbar/Navbar";
// import AddEmployee from "../Add Employee/AddEmployee";
// import MoreModal from "../moreModal/moreModal";
// import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

const Employees = () => {
  //   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  //   const employeesPerPage = 10; // Number of customers per page

  //   useEffect(() => {
  //     // Check if all the modal states are false before fetching customers
  //     if (!showAddEmployeeModal ) {
  //       const fetchCustomers = async () => {
  //         try {
  //           setIsLoading(true); // Set loading to true before fetching data
  //           const response = await api.showCustomers();
  //           setCustomers(response.data);
  //           console.log("Customer history", response.data);
  //         } catch (error) {
  //           console.error("Error fetching income history data", error);
  //         } finally {
  //           setIsLoading(false); // Set loading to false after fetching data
  //         }
  //       };
  //       fetchCustomers();
  //     }
  //   }, [showAddEmployeeModal, showPaymentModal, showCreditForm]); // Dependencies

  //   const handleViewClick = (customer) => {
  //     setSelectedCustomer(customer);
  //     setShowHistory(true);
  //   };

  //   const closeHistoryModal = () => {
  //     setShowHistory(false);
  //     setSelectedCustomer(null);
  //   };

  //   const handlePayClick = (customer) => {
  //     setSelectedCustomer(customer);
  //     setShowPaymentModal(true);
  //   };

  //   const closePaymentModal = () => {
  //     setShowPaymentModal(false);
  //     setSelectedCustomer(null);
  //   };

  //   const handleCreditClick = (customer) => {
  //     setSelectedCustomer(customer);
  //     setShowCreditForm(true);
  //   };

  //   const closeCreditForm = () => {
  //     setShowCreditForm(false);
  //     setSelectedCustomer(null);
  //   };

  //   const handleCloseModal = () => {
  //     setMoreModal(false);
  //   };

  //   const totalPages = Math.ceil(employees.length / employeesPerPage);

  //   const filteredCustomers = customers.filter((customer) => {
  //     const customerName = customer.customerName.toLowerCase();
  //     const phoneNumber = customer.phoneNumber
  //       ? String(customer.phoneNumber)
  //       : "";

  //     return (
  //       customerName.includes(searchTerm.toLowerCase()) ||
  //       phoneNumber.includes(searchTerm)
  //     );
  //   });

  //   const paginatedCustomers = filteredCustomers.slice(
  //     (currentPage - 1) * employeesPerPage,
  //     currentPage * employeesPerPage
  //   );

  return (
    <>
      <Navbar />
      <div className="bg-blue-950 min-h-screen p-10">
        <div className="container p-6 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-teal-400">Employees</h1>

            <div className="flex items-center space-x-4">
              <div className="bg-[#00BDD6] bg-opacity-10 px-2 border border-[#00BDD6] rounded-lg">
                <div className="flex flex-row">
                  <img src={searchIcon} alt="" />
                  <input
                    type="text"
                    placeholder="Search employee..."
                    className="w-64 h-10 px-3 rounded bg-transparent text-white outline-none"
                    // onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="flex flex-row bg-[#00A1B7] text-white font-semibold gap-1 px-4 py-2 rounded-md"
                // onClick={() => setShowAddEmployeeModal(true)}
              >
                <img src={addCustomerIcon} alt="" />
                New Employee
              </button>
            </div>
          </div>

          <div className="overflow-x-auto p-2">
            <table className="table-auto w-full text-left text-cyan-300">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone number</th>
                  <th className="px-4 py-2">Designation</th>
                  <th className="px-4 py-2">Join Date</th>
                  <th className="px-4 py-2">View</th>
                </tr>
              </thead>
              <tbody className="bg-gray-700">
                {/* {isLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-6">
                      <SpinnerOnly /> 
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map((customer, index) => (
                    <tr key={index} className="border-t border-gray-600">
                      <td className="px-4 py-2">
                        {new Date(customer.dateOfService).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="px-4 py-2">{customer.customerName}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <p>{customer.vehicleNumber[0]}</p>
                          <p>
                            {customer.vehicleNumber.length > 1 && (
                              <p
                                className="text-blue-600 cursor-pointer"
                                onClick={() =>
                                  handleMoreClick(customer.vehicleNumber)
                                }
                              >
                                more
                              </p>
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2">{customer.phoneNumber}</td>
                      <td className="px-4 py-2">₹{customer.creditAmount}</td>
                      <td className="px-4 py-2">₹{customer.paidAmount}</td>
                      <td className="px-4 py-2">
                        ₹
                        {calculateDueAmount(
                          customer.creditAmount,
                          customer.paidAmount
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-md"
                          onClick={() => handleCreditClick(customer)}
                        >
                          Credit
                        </button>
                        <button
                          className="bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2"
                          onClick={() => handlePayClick(customer)}
                        >
                          Pay
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-gray-600 text-gray-300 px-4 py-1 rounded-md"
                          onClick={() => handleViewClick(customer)}
                        >
                          See history
                        </button>
                      </td>
                    </tr>
                  ))
                )} */}
                {/* {filteredCustomers.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="9" className="text-center pt-6 font-medium">
                      No Credit Customers...
                    </td>
                  </tr>
                )} */}
                <td className="px-4 py-2">Danish</td>
                <td className="px-4 py-2">9876543210</td>
                <td className="px-4 py-2">Customer Executive</td>
                <td className="px-4 py-2">07-08-2024</td>
                <td className="px-4 py-2">
                  <button
                    className=" text-white font-bold py-1 px-2 rounded hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                  >
                    View
                  </button>
                </td>
              </tbody>
            </table>
          </div>

          {/* <div className="flex justify-between items-center my-4">
            {filteredCustomers.length > 0 && !isLoading && (
              <>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="bg-[#00A1B7] text-white font-semibold px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-[#00A1B7] text-white font-semibold px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </>
            )}
          </div> */}
        </div>

        {/* Modals */}
        {/* {showAddEmployeeModal && (
          <AddEmployee onClose={() => setShowAddEmployeeModal(false)} />
        )} */}
        {/* {showHistory && (
          <History customer={selectedCustomer} onClose={closeHistoryModal} />
        )}
        {showPaymentModal && (
          <PaymentModal
            customer={selectedCustomer}
            onClose={closePaymentModal}
          />
        )}
        {showCreditForm && (
          <CreditForm customer={selectedCustomer} onClose={closeCreditForm} />
        )}
        {moreModal && (
          <MoreModal
            onClose={handleCloseModal}
            vehicleNumbers={selectedVehicleNumbers}
          />
        )} */}
      </div>
    </>
  );
};

export default Employees;
