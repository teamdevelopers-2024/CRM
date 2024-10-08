import React, { useEffect, useState } from 'react';
import Logo from "../../assets/logo-1.png";
import logoutIcon from '../../assets/logoutIcon.png';
import { FaArrowAltCircleUp, FaArrowCircleDown, FaBars, FaTimes } from "react-icons/fa"; // Importing icons
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Maintantans from '../maintaintance/Maintantans';

const AdminNav = ({ Leads }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegment = location.pathname.split("/").filter(Boolean).pop();
  const [heading, setHeading] = useState('');
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state

  useEffect(() => {
    if (pathSegment === 'employehome') {
      setHeading('Home');
    } else if (pathSegment === 'leads') {
      setHeading('Leads');
    } else if (pathSegment === 'profile') {
      setHeading("Profile");
    }
  }, [pathSegment]);

  const requestCount =8

  const handleLogout = async () => {
    let currentUser;
    const employee = localStorage.getItem("employee");
    if (employee) {
      currentUser = '/';
    }
    const superadmin = localStorage.getItem("superadmin");
    if (superadmin) {
      currentUser = '/headLogin';
    }
    logout();
    navigate(currentUser);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-blue-950 p-4 shadow-lg">
        <div className="mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center justify-start sm:ml-20">
            <img
              src={Logo}
              alt="Logo"
              className="h-10  hover:opacity-90 transition duration-300 cursor-pointer"
            />
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 text-2xl focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Wrapper for Navigation Links and Buttons */}
          <div className="flex flex-grow justify-center">
            {/* Navigation Links */}
            <ul className={`flex space-x-8 text-gray-300 ${isMobileMenuOpen ? 'flex' : 'hidden'} sm:flex`}>
              <li>
                <a
                  onClick={() => navigate("/adminHome")}
                  className={`cursor-pointer transition-all duration-300 text-xs sm:text-sm ${
                    pathSegment === 'adminHome'
                      ? 'text-cyan-500 font-semibold border-b-2 border-cyan-500'
                      : 'hover:text-cyan-300 hover:border-b-2 hover:border-cyan-300'
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/employees")}
                  className={`cursor-pointer transition-all duration-300 text-xs sm:text-sm ${
                    pathSegment === 'employees'
                      ? 'text-cyan-500 font-semibold border-b-2 border-cyan-500'
                      : 'hover:text-cyan-300 hover:border-b-2 hover:border-cyan-300'
                  }`}
                >
                  Employees
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/manageLead")}
                  className={`cursor-pointer transition-all duration-300 text-xs sm:text-sm ${
                    pathSegment === 'manageLead'
                      ? 'text-cyan-500 font-semibold border-b-2 border-cyan-500'
                      : 'hover:text-cyan-300 hover:border-b-2 hover:border-cyan-300'
                  }`}
                >
                  Manage Leads
                </a>
              </li>
            </ul>
          </div>

          {/* Profile and Logout Section */}
          <div className="flex items-center sm:space-x-6">
            {Leads && (
              <button
                className="flex items-center border border-cyan-600 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:from-teal-400 hover:to-cyan-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 gap-2"
              >
                <FaArrowAltCircleUp />
                <span className="hidden sm:inline">Equal Assignment</span>
              </button>
            )}
            {Leads && (
      <button
      onClick={() => navigate("/salesRequestes")}
      className="relative flex items-center border border-cyan-600 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:from-teal-400 hover:to-cyan-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 gap-2"
    >
      <FaArrowCircleDown />
      <span className="hidden sm:inline">Close Requests</span>

      {/* Request count circle */}
      {requestCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {requestCount}
        </span>
      )}
    </button>
            )}
            {!Leads && (
              <button
              style={{visibility:"hidden"}}
                className="flex items-center border border-cyan-600 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:from-teal-400 hover:to-cyan-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 gap-2"
              >
                <FaArrowCircleDown />
                <span className="hidden sm:inline">Close Requests</span>
              </button>
            )}
            {!Leads && (
              <button
              style={{visibility:"hidden"}}
                className="items-center border border-cyan-600 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:from-teal-400 hover:to-cyan-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 gap-2"
              >
                <FaArrowCircleDown />
                <span className="hidden sm:inline">Close Requests</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center border border-cyan-600 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:from-teal-400 hover:to-cyan-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 gap-2"
            >
              <img src={logoutIcon} alt="Logout Icon" className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
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
      <Maintantans />
    </>
  );
};

export default AdminNav;
