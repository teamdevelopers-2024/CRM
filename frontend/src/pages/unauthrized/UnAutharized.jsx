// Unauthorized.js
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
        <p className="text-gray-700 mb-4">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="text-blue-500 hover:underline"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
