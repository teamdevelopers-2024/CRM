import React from 'react';
import Logo from "../../assets/logo-1.png";

const MainComplete = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-800 text-white text-center p-4">
        <img className=' h-14 md:h-20 absolute top-3 left-5' src={Logo} alt="" />
      <h1 className="text-2xl md:text-4xl  font-bold mb-4">🚧 Maintenance Mode 🚧</h1>
      <p className="md:text-lg mb-6">Our website is currently undergoing maintenance.</p>
      <p className="text-lg mb-6">Please visit us later.</p>
    </div>
  );
};

export default MainComplete;
