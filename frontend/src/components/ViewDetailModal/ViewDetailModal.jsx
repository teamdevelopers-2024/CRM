import React from 'react';

const ViewDetailsModal = ({ setViewDetailModal, data }) => {
  console.log("this is data from modal : ", data)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-xl font-bold mb-4 text-center">Details</h2>

        {/* Dynamically display the key-value pairs, excluding _id and assignDate */}
        <div className="overflow-y-auto max-h-96">
          {data ? (
            <div className="space-y-4">
              {Object.entries(data)
                .filter(([key]) => key !== '_id' && key !== 'assignDate') // Exclude _id and assignDate fields  
                .map(([key, value]) => (
                  <div key={key} className="flex">
                    <strong className={`mr-2 capitalize ${key === 'remark'? 'text-red-600' : ''}`}>{key.replace(/_/g, ' ')}:</strong>
                    <span className={key === 'remark' ? 'text-red-600' : ''}>
                      {Array.isArray(value) ? value.join(', ') : value?.toString()}
                    </span>

                  </div>
                ))}
            </div>
          ) : (
            <p>No details available</p>
          )}
        </div>

        {/* Close button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setViewDetailModal(false)}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
