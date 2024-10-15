import { useState } from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import api from "../../services/api";
import Swal from "sweetalert2";

const AddLeadModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        college: "",
        email: "",
        phone: "",
        district: "",
    });
    const [loading , setLoading ] = useState(false)
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) {
            newErrors.name = "Name is required";
        }
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        }
        return newErrors;
    };
    
    const handleSubmit = async(e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
        const empId = localStorage.getItem("employeeId")
        try {
            setLoading(true)
            const result = await api.addCustomLead({empId , ...formData})
            if(result.error){
                Swal.fire({
                    icon: 'error',
                    title: 'error!',
                    text: result.message,
                    confirmButtonText: 'OK',
                })
            }else{
                Swal.fire({
                    icon:"success",
                    title:"success!",
                    text:"Lead Added successfully",
                    confirmButtonText:"OK"
                })
                onClose();
                setFormData({}) 
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
    {loading && <LoadingSpinner/>}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-blue-500 opacity-50"></div>

          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Add Lead</h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Name (Required)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* College Field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">College (Optional)</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter college"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter email"
                />
              </div>

              {/* Phone Field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Phone (Required)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              {/* District Field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">District (Optional)</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter district"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLeadModal;
