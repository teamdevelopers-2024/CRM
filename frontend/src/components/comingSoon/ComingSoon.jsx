import React from 'react';

const ComingSoonModal = ({  setSootModal }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex justify-center items-center z-50" onClick={()=> setSootModal(false)}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
        <p className="mb-6">This feature is under process , currently not  
            <h6>available</h6></p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={()=> setSootModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
