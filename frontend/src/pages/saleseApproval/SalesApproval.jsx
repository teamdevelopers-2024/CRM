import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav/AdminNav';
import api from '../../services/api';

// Sample close request data
const closeRequests = [
  {
    paymentScreenshot: "https://via.placeholder.com/150",
    reference: "REF123456",
    employeeId: "60c72b2f9b1e8d0f7a8e5a6f",
    employeeName: "John Doe", // New field for employee name
    leadName: "Jane Smith", // New field for lead name
    clientPhone: "123-456-7890",
    createdAt: new Date(),
  },
  {
    paymentScreenshot: "https://via.placeholder.com/150",
    reference: "REF123457",
    employeeId: "60c72b2f9b1e8d0f7a8e5a6g",
    employeeName: "John Doe", // Same employee
    leadName: "David Johnson", // Different lead
    clientPhone: "098-765-4321",
    createdAt: new Date(),
  },
  {
    paymentScreenshot: "https://via.placeholder.com/150",
    reference: "REF123458",
    employeeId: "60c72b2f9b1e8d0f7a8e5a6h",
    employeeName: "Alice Brown", // New employee
    leadName: "Sara Lee",
    clientPhone: "111-222-3333",
    createdAt: new Date(),
  },
];

function SalesApproval() {
  const [closeRequests , setCloseRequests ] = useState(closeRequests)


   useEffect(()=>{
    const fetchData = async ()=> {
        try {
            const result = await api.getCloseRequests()
        } catch (error) {
            
        }
    }
   })

  // Placeholder functions for handling approve/reject
  const handleApprove = (reference) => {
    console.log(`Approved request with reference: ${reference}`);
  };

  const handleReject = (reference) => {
    console.log(`Rejected request with reference: ${reference}`);
  };

  return (
    <>
      <AdminNav />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Sales Approval - Close Requests</h1>

        <div className="space-y-4">
          {closeRequests.map((request, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
              <h3 className="text-lg font-semibold mb-2">Sale Closed By: {request.employeeName}</h3>
              <h4 className="text-md font-medium mb-2">Lead Name: {request.leadName}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Reference:</p>
                  <p>{request.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client Phone:</p>
                  <p>{request.clientPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At:</p>
                  <p>{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Payment Screenshot:</p>
                <img
                  src={request.paymentScreenshot}
                  alt="Payment Screenshot"
                  className="h-24 w-24 object-cover rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => handleApprove(request.reference)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.reference)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SalesApproval;
