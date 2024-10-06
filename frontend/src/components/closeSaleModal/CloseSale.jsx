import React, { useState } from 'react';

function CloseSale({setCloseModal}) {
  const [referenceNumber, setReferenceNumber] = useState(""); // State to store reference number
  const [screenshot, setScreenshot] = useState(null); // State to store uploaded screenshot
  const [error, setError] = useState({ reference: "", screenshot: "" }); // Error handling state

  // Handle screenshot upload
  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(URL.createObjectURL(file));
      setError((prev) => ({ ...prev, screenshot: "" })); // Clear any previous error
    }
  };

  // Handle reference number input
  const handleReferenceChange = (e) => {
    setReferenceNumber(e.target.value);
    setError((prev) => ({ ...prev, reference: "" })); // Clear any previous error
  };

  // Handle form submission
  const handleSubmit = () => {
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
      // Handle form submission logic
      alert("Form submitted!");
      setCloseModal(false);
    }
  };


  return (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Close Sale</h2>
              <button onClick={()=> setCloseModal(false)} className="text-gray-500 hover:text-gray-700">
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
              {screenshot && (
                <div className="mt-2">
                  <img
                    src={screenshot}
                    alt="Uploaded Screenshot"
                    className="w-full h-auto rounded shadow"
                  />
                </div>
              )}
              {error.screenshot && (
                <p className="text-red-500 text-sm mt-1">{error.screenshot}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
