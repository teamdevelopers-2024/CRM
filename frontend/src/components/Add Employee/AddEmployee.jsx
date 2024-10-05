import React, { useState } from "react";
import api from "../../services/api";

const AddEmployee = ({ show, onClose }) => {
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Designation, setDesignation] = useState("");
  const [JoiningDate, SetJoiningDate] = useState("");
  const [Password, setPassword] = useState("");



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
    if (!validateForm()) {
      alert("Please fill out all required fields.");
      return; 
    }
     
    const formData = { name, phoneNumber, Designation, JoiningDate, Password };
  
    try {
      const response = await api.addEmploy(formData)
      if(response.error==false){
        alert('employ added successfully')
        onclose()
      }else{
        alert('error adding data')
      }
    } catch (error) {
      alert("There was an error submitting the form.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center">
        <div className="relative w-[600px] bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-in-out scale-105">
          <h2 className="text-2xl font-semibold text-teal-400 mb-6 text-center">Add Employee</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Employee Name</label>
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
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
                onClick={onClose}
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
