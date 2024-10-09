import React, { useState } from 'react';
import api from '../../services/api'; // You might not need this if not using it
import uploadImage from '../../services/Cloudinar';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import Swal from 'sweetalert2';

function CloseSale({ lead,setCloseModal,setLeadsData }) {
  const [referenceNumber, setReferenceNumber] = useState(""); // State to store reference number
  const [screenshot, setScreenshot] = useState(null); // State to store uploaded screenshot
  const [error, setError] = useState({ reference: "", screenshot: "" }); // Error handling state
  const [loading , setLoading ] = useState(false)
  // Handle screenshot upload
  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file); // Store the actual file object
      setError((prev) => ({ ...prev, screenshot: "" })); // Clear any previous error
    }
  };

  // Handle reference number input
  const handleReferenceChange = (e) => {
    setReferenceNumber(e.target.value);
    setError((prev) => ({ ...prev, reference: "" })); // Clear any previous error
  };



  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let valid = true;
  
      if (!referenceNumber) {
        setError((prev) => ({ ...prev, reference: "Reference number is required" }));
        valid = false;
      }
      if (!screenshot) {
        setError((prev) => ({ ...prev, screenshot: "Payment screenshot is required" }));
        valid = false;
      }
  
      if (valid) {
        const formData = new FormData();
        formData.append('file', screenshot); // Append the actual file object
        formData.append('upload_preset', 'mbtzi3no'); // Your upload preset name
        const url = await uploadImage(formData);
        const employeeId = localStorage.getItem("employeeId");
        const result = await api.closeRequest({ url, employeeId, leadReference: lead.leadReference, clientPhone: lead.phone, reference: referenceNumber });
  
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Close request sent successfully.',
            confirmButtonText: 'OK',
            background: '#1c1c1e',
            color: '#fff',
          });
  
          // Update the local state correctly
          console.log("leadreff : ",lead.leadReference)
          setLeadsData((prevLeads) =>
            prevLeads.map((l) =>
              l.leadReference === lead.leadReference ? { ...l, status: 'close requested' } : l
            )
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error when updating!',
            confirmButtonText: 'OK',
            background: '#1c1c1e',
            color: '#fff',
            iconColor: '#e74c3c',
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCloseModal(false);
      setLoading(false);
    }
  };
  

  return (
    <>
    {loading && <LoadingSpinner/>}
      <div className="fixed inset-0  flex items-center justify-center bg-blue-900 bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg md:max-w-md sm:max-w-sm mx-4 sm:mx-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-lg font-bold text-gray-800">Close Sale</h2>
            <button onClick={() => setCloseModal(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          {/* Reference Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Reference Number</label>
            <input
              type="text"
              value={referenceNumber}
              onChange={handleReferenceChange}
              placeholder="Enter reference number"
              className={`w-full p-3 border rounded ${error.reference ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {error.reference && (
              <p className="text-red-500 text-sm mt-1">{error.reference}</p>
            )}
          </div>

          {/* Screenshot Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotUpload}
              className="mb-2"
            />
            {error.screenshot && (
              <p className="text-red-500 text-sm mt-1">{error.screenshot}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CloseSale;
