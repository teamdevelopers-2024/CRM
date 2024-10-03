import React from 'react';
import Logo from "../../assets/logo-1.png";
import logoutIcon from '../../assets/logoutIcon.png';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const pathSegment = location.pathname.split("/").filter(Boolean).pop();


  return (
    <nav className="bg-blue-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center ml-20">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 w-28"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          <li>
            <a
              className={`cursor-pointer ${pathSegment == 'home' ? 'text-cyan-600 font-semibold border-b-2 border-cyan-600' : 'hover:text-white'}`}
            >
              Home
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-4">

          {/* Icons */}
          <button
            className="cursor-pointer border border-cyan-600 bg-[#00A1B7] bg-opacity-20 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-cyan-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 flex gap-2"
          >
            <img src={logoutIcon} alt="" />
            Logout
          </button>

          <img
            src="https://via.placeholder.com/150" 
            alt="Profile"
            className="h-8 w-8 cursor-pointer rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
