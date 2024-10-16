import React, { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav/AdminNav";
import api from "../../services/api";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

function SalesApproval() {
  const [closeRequests, setCloseRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [request , setRequest ] = useState({})
  const [rejectModal , setRejectModal ] = useState(false)
  const [rejectRemark , setRejectRemark ] = useState('')
  const [isUpdate , setIsUpdate ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.getCloseRequests();
        if (result.error) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Internal Server Error.",
            confirmButtonText: "OK",
          });
        } else {
          setCloseRequests(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [rejectModal,isUpdate]);

  // Placeholder functions for handling approve/reject
  const handleApprove = async (reference, leadReference, employeeId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const apiResult = await api.approveRequest({
          reference,
          leadReference,
          employeeId,
        });
        if (!apiResult.error) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Request Approved successfully.",
            confirmButtonText: "OK",
            background: "#1c1c1e",
            color: "#fff",
          });
          setIsUpdate(!isUpdate)
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was an error approving the request.",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Open rejection modal
  const openRejectionModal = (request) => {
    setRejectModal(true)
    setRequest(request);
  };

  // Submit rejection
  const submitRejection = async () => {
    if (!rejectRemark) {
      Swal.fire("Please provide a remark before rejecting.");
      return;
    }

    try {
      setLoading(true);

      // Update the close request status to "rejected"
      const result = await api.handleReject({employeeId:request.employeeId , reference: request.reference , leadReference:request.leadReference ,reason:rejectRemark});
      if(!result.error){
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Request Rejected successfully.",
        });
      }else {
        Swal.fire({
          icon:"error",
          title:"!Error",
          text:"Error Rejecting Request"
        })
      }
      setRejectModal(false)
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error rejecting the request.",
      });
    } finally {
      setIsModalOpen(false);
      setRejectRemark(""); // Clear remark after submission
      setCurrentRequest(null); // Reset the current request
    }
  };

  // Function to open modal with selected image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <AdminNav />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Sales Approval - Close Requests
        </h1>

        <div className="space-y-4">
          {closeRequests.length === 0 ? (
            <p className="text-lg text-gray-500">No data available.</p>
          ) : (
            closeRequests.map((request, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Sale Closed By: {request.employeeName}
                </h3>
                <h4 className="text-md font-medium mb-2">
                  Lead Name: {request.leadName}
                </h4>
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
                  <p className="text-sm text-gray-500 mb-2">
                    Payment Screenshot:
                  </p>
                  <img
                    src={request.paymentScreenshot}
                    alt="Payment Screenshot"
                    className="h-24 w-24 object-cover rounded-md cursor-pointer"
                    onClick={() => handleImageClick(request.paymentScreenshot)}
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() =>
                      handleApprove(
                        request.reference,
                        request.leadReference,
                        request.employeeId
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openRejectionModal(request)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for displaying the large image */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="bg-white p-0 rounded-lg w-full h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Large Payment Screenshot"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Rejection Modal */}
        {rejectModal && request && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-semibold mb-2">
                Provide a Remark for Rejection
              </h2>
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded"
                placeholder="Enter your remark here..."
                value={rejectRemark}
                onChange={(e) => setRejectRemark(e.target.value)}
              />
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  onClick={() => setRejectModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRejection}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SalesApproval;
