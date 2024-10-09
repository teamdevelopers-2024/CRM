import React from 'react';

const RerequestModal = ({reason ,setReRequestModal }) => {
  const handleReRequest = () => {
    // Call the onReRequest function passed from the parent component
  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Admin Rejected</h2>
        <p className='font-normal mb-3'>the securyty is failed and not can to approve it that that's the reason for rejection</p>
        <div className="flex justify-end">
          <button
            onClick={handleReRequest}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Re-Request
          </button>
          <button
            onClick={''}
            className="bg-gray-300 py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RerequestModal;
