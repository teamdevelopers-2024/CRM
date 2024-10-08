import React from 'react';
import './style.css'; // Ensure to import your CSS file for the animation

const Maintantans = () => {
  return (
    <div className="overflow-hidden bg-blue-800">
      <div className="flex animate-scroll whitespace-nowrap">
        <div className="text-center text-black py-2 text-item mr-12">
          Maintenance work will start at 6 PM. 
          <span className="ml-4">Please note that website updates will occur regularly to enhance your experience.</span>
        </div>
        <div className="text-center text-black py-2 text-item mr-12">
          Maintenance work will start at 6 PM. 
          <span className="ml-4">Please note that website updates will occur regularly to enhance your experience.</span>
        </div>
        <div className="text-center text-black py-2 text-item mr-12">
          Maintenance work will start at 6 PM. 
          <span className="ml-4">Please note that website updates will occur regularly to enhance your experience.</span>
        </div>
      </div>
    </div>
  );
};

export default Maintantans;
