import React, { useState, useEffect } from "react";
import axios from "axios"
// import api from "../../services/api";
// import swal from "sweetalert";
// import LoadingSpinner from "../spinner/Spinner";

const AddEmployee = ({ show, onClose }) => {
  const [EmployeName, setEmployeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Designation, setDesignation] = useState("");
  const [JoiningDate, SetJoiningDate] = useState("");
  const [Password, setPassword] = useState("");
  //   const [isLoading , setIsLoading] = useState(false)

  //   // Get today's date in YYYY-MM-DD format for India timezone
  //   const today = new Date();
  //   const options = { timeZone: "Asia/Kolkata" }; // Specify Indian timezone
  //   const todayString = today.toLocaleDateString("en-CA", options); // Format to YYYY-MM-DD

  //   // Set dateOfService to today's date initially
  //   const [dateOfService, setDateOfService] = useState(todayString);

  //   // State for error messages
  //   const [errors, setErrors] = useState({});

  //   // Update creditAmount when workDetails change
  //   useEffect(() => {
  //     console.log("here coming inside of addcustomer")
  //     const totalAmount = workDetails.reduce(
  //       (sum, detail) => sum + parseFloat(detail.amount || 0),
  //       0
  //     );
  //     setCreditAmount(totalAmount);
  //   }, [workDetails]);

  //   const handleAddField = () => {
  //     setWorkDetails([
  //       ...workDetails,
  //       { description: "", amount: "", reference: "" },
  //     ]);
  //   };

  //   const handleWorkDetailChange = (index, field, value) => {
  //     const updatedDetails = [...workDetails];
  //     updatedDetails[index][field] = value;
  //     setWorkDetails(updatedDetails);
  //   };

  //   const handleDeleteField = (index) => {
  //     const updatedDetails = workDetails.filter((_, i) => i !== index);
  //     setWorkDetails(updatedDetails);
  //   };

  const validateForm = () => {
    const newErrors = {};
    if (!EmployeName) newErrors.EmployeName = "Employee name is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!Designation) newErrors.Designation = "Designation is required.";
    if (!JoiningDate) newErrors.JoiningDate = "Joining date is required.";
    if (!Password) newErrors.Password = "Password is required.";
  
    // If there are no errors, return true; otherwise, false
    return Object.keys(newErrors).length === 0;
  };
  
  //     workDetails.forEach((work, index) => {
  //       if (!work.description) {
  //         newErrors[`description_${index}`] = "Work Description is required.";
  //       }
  //       if (!work.amount) {
  //         newErrors[`amount_${index}`] = "Amount is required.";
  //       }
  //     });

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0; // Returns true if no errors
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    
    // If validation fails, do not proceed with form submission
    if (!validateForm()) {
      alert("Please fill out all required fields.");
      return;
    }
     
    // Data to be sent to the backend
    const formData = {
      EmployeName,
      phoneNumber,
      Designation,
      JoiningDate,
      Password,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/submit-form", formData);
      console.log("Form submitted:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      alert("There was an error submitting the form.");
    }
    
  };
  
  

  //     try {
  //       const response = await api.addCustomer(formData);
  //       if (response.error) {
  //         console.log('getting here')
  //         // Handle error case
  //         if (!response.errors) swal("!Error", "internel Server Error", "error")
  //         const errors = response.errors
  //         const newErrors = {}
  //         for (let i = 0; i < errors.length; i++) {
  //           console.log(errors[i].field)
  //           newErrors[errors[i].field] = errors[i].message
  //         }
  //         setErrors(newErrors)
  //       } else {
  //         console.log("Response:", response);
  //         swal("!success", "Credit Customer Added Successfully", "success")
  //         onClose();
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   };

  //   const handlePhoneNumberChange = (e) => {
  //     const value = e.target.value;
  //     // Allow only numbers; prevent letters and any other characters
  //     if (/^\d*$/.test(value)) { // Check if the value consists only of digits
  //         setPhoneNumber(value);
  //     }
  // }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-gray-800">
          <h3 className="text-lg text-teal-400 font-bold mb-4">Add Customer</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields */}
            <div  className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                  value={EmployeName}
                  onChange={(e) => setEmployeName(e.target.value)}
                  placeholder="Name of Employee..."
                />
                {/* {errors.dateOfService && (
                <p className="text-red-500 text-sm">{errors.dateOfService}</p>
              )} */}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter number here..."
                  className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {/* {errors.customerName && (
                <p className="text-red-500 text-sm">{errors.customerName}</p>
              )} */}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Designation</label>
                <input
                  type="text"
                  placeholder="Enter designation..."
                  className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                  value={Designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                {/* {errors.vehicleNumber && (
                <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
              )} */}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Joining Date</label>
                <input
                  type="date"
                  placeholder="Enter Date here..."
                  className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                  value={
                    JoiningDate
                      ? new Date(JoiningDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => SetJoiningDate(e.target.value)}
                />
                {/* {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )} */}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password here..."
                  className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )} */}
              </div>
            </div>

            {/* Total amount and submit button */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="bg-teal-400 text-white rounded px-4 py-2 hover:bg-red-600"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-400 text-white rounded px-4 py-2 hover:bg-teal-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
