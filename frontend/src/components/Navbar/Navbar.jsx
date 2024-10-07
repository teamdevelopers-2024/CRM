import React, { useEffect, useState } from 'react';
import Logo from "../../assets/logo-1.png";
import logoutIcon from '../../assets/logoutIcon.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const pathSegment = location.pathname.split("/").filter(Boolean).pop();
  const [heading , setHeading ] = useState('')
  const {logout} = useAuth()
  useEffect(()=>{
    if(pathSegment == 'employehome'){
      setHeading('Home')
    }else if(pathSegment == 'leads'){
      setHeading('Leads')
    }else if(pathSegment == 'profile'){
      setHeading("Profile")
    }
  },[pathSegment])

  const handleLogout = async()=>{
     let currentUser 

     const employee = localStorage.getItem("employee")
     if(employee){
      currentUser = '/'
     }
     const superadmin = localStorage.getItem("superadmin")
     if(superadmin){
      currentUser = '/headLogin'
     }
     logout()
     navigate(currentUser)
  }
  return (
    <nav className="bg-blue-950 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo Section (Adjusts for small screens) */}
        <div className="flex items-center justify-start sm:ml-20">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-24 hover:opacity-90 transition duration-300 cursor-pointer"
          />
        </div>

        {/* Navigation Links (Always visible, adjusts size for small screens) */}
        <ul className="flex space-x-8 text-gray-300">
          <li>
            <a
              className={`cursor-pointer transition-all duration-300 text-xs sm:text-sm ${
                'text-cyan-500 font-semibold border-b-2 border-cyan-500'
              }`}
            >
              {heading}
            </a>
          </li>
          {/* Add more links as necessary */}
        </ul>

        {/* Profile and Logout Section (Always visible) */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Logout Button (Icon only on small screens) */}
          <button
          onClick={handleLogout}
            className="flex items-center border border-cyan-600 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:from-teal-400 hover:to-cyan-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 gap-2"
          >
            <img src={logoutIcon} alt="Logout Icon" className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Profile Picture */}
          <Link to="/profile" className="relative group">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="h-9 w-9 rounded-full border-2 border-cyan-600 hover:opacity-90 cursor-pointer transition duration-300"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-blue-950"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
