import React, { useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

const AddEmployee = ({ setShowAddEmployeeModal }) => {
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Designation, setDesignation] = useState("");
  const [JoiningDate, SetJoiningDate] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Employee name is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!Designation) newErrors.Designation = "Designation is required.";
    if (!JoiningDate) newErrors.JoiningDate = "Joining date is required.";
    if (!Password) newErrors.Password = "Password is required.";

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = { name, phoneNumber, Designation, JoiningDate, Password };

    try {
      const response = await api.addEmploy(formData);
      if (response.error == false) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Employee added successfully.",
          confirmButtonText: "OK",
          background: "#1c1c1e", // Optional: Customize background color
          color: "#fff", // Optional: Customize text color
        });

        setShowAddEmployeeModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error adding employee.",
          confirmButtonText: "OK",
          background: "#1c1c1e", // Customize background color
          color: "#fff", // Customize text color
          iconColor: "#e74c3c", // Customize icon color
        });
      }
    } catch (error) {
      console.log(error);
      alert("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading && <LoadingSpinner/>}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center">
        <div className="relative w-[600px] bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-in-out scale-105">
          <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">
            Add Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">
                  Employee Name
                </label>
                <input
                  type="text"
                  className="w-full h-10 px-3 bg-gray-700 rounded border border-gray-600 text-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter employee's name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full h-10 px-3 bg-gray-700 rounded border border-gray-600 text-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Allow only numeric values and limit to 10 digits
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    setPhoneNumber(value);
                  }}
                  placeholder="Enter phone number"
                  maxLength={10} // Limit input to 10 characters
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Designation</label>
                <input
                  type="text"
                  className="w-full h-10 px-3 bg-gray-700 rounded border border-gray-600 text-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
                  value={Designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Joining Date</label>
                <input
                  type="date"
                  className="w-full h-10 px-3 bg-gray-700 rounded border border-gray-600 text-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
                  value={JoiningDate}
                  onChange={(e) => SetJoiningDate(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full h-10 px-3 bg-gray-700 rounded border border-gray-600 text-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={() => setShowAddEmployeeModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-500 text-white font-medium px-4 py-2 rounded hover:bg-teal-600 transition"
              >
                Save Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
