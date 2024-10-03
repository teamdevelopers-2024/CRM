import React from "react";
import Logo from "../../assets/logo.png";
import User from "../../assets/user.svg";
import Lock from "../../assets/lock.svg";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-950">
      <div className=" bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-md bg-white">
        <div className="text-center mb-8 ">
          <img src={Logo} alt="Code and Click CRM" className="mx-auto mb-4 w-1/2" />
          <h2 className="text-gray-800 text-2xl font-bold">WELCOME</h2>
          <p className="text-gray-600">TO CRM DASHBOARD</p>
        </div>

        {/* Username Input */}
        <div className="mb-6 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            <div className="flex items-center">
              <img src={User} alt="user svg" className="mr-2" />
              Username
            </div>
          </label>
          <input
            className="w-full p-3 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            <div className="flex items-center">
              <img src={Lock} alt="lock svg" className="mr-2" />
              Password
            </div>
          </label>
          <input
            className="w-full p-3 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        {/* Login Button */}
        <button
          className="bg-blue-500 w-full text-white font-bold py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
