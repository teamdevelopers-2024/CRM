// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom'; // Optional: If you want to add a link back to the home page
import logo from '../../assets/logo-1.png';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-800 text-white">
            <img src={logo} alt="Logo" className="mb-8 w-40 md:w-56 h-auto" /> {/* Responsive logo size */}
            <h1 className="text-5xl md:text-6xl font-bold">404</h1>
            <p className="mt-4 text-lg text-center px-4 md:px-0">Page Not Found</p>
            <p className="mt-2 text-center px-4 md:px-0">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 inline-block px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 transition">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;
