import React from 'react';
import Logo from "../../assets/logo-1.png";
import logoutIcon from '../../assets/logoutIcon.png';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const pathSegment = location.pathname.split("/").filter(Boolean).pop();

  return (
    <nav className="bg-blue-950 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center ml-20">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 w-28 hover:opacity-90 transition duration-300 cursor-pointer"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-300 text-sm">
          <li>
            <a
              className={`cursor-pointer transition-all duration-300 ${
                pathSegment === 'home' 
                  ? 'text-cyan-500 font-semibold border-b-2 border-cyan-500' 
                  : 'hover:text-cyan-300 hover:border-b-2 hover:border-cyan-300'
              }`}
            >
              Home
            </a>
          </li>
        </ul>

        {/* Profile and Logout Section */}
        <div className="flex items-center space-x-6">
          {/* Logout Button */}
          <button
            className="flex items-center border border-cyan-600 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:from-teal-400 hover:to-cyan-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 gap-2"
          >
            <img src={logoutIcon} alt="Logout Icon" className="w-5 h-5" />
            Logout
          </button>

          {/* Profile Picture */}
          <div className="relative group">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="h-9 w-9 rounded-full border-2 border-cyan-600 hover:opacity-90 cursor-pointer transition duration-300"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-blue-950"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
