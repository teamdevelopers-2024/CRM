import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import User from "../../assets/user.svg";
import Lock from "../../assets/lock.svg";
import api from "../../services/api";
import Swal from "sweetalert2"; // Import SweetAlert2
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EmployeeLogin = () => {
  const [userID, setuserID] = useState("");
  const [password, setPassword] = useState("");
  const [userIDError, setuserIDError] = useState(""); // State for userID error
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [loading , setLoading ] = useState(false)
  const {loginEmployee} = useAuth()
  const navigate = useNavigate()


  useEffect(()=>{
    const user = localStorage.getItem("employee")
    if(user){
      navigate("/employehome")
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        setuserIDError("");
        setPasswordError("");
    
        let hasError = false;
    
        // Validate userID
        if (!userID) {
          setuserIDError("UserId is required");
          hasError = true;
        }
    
        // Validate password
        if (!password) {
          setPasswordError("Password is required");
          hasError = true;
        }
    
        if (!hasError) {
          const result = await api.employeeLogin({ userID, password });
          if(result == 'Internel Server Error'){
            Swal.fire({
              icon: 'error',
              title: 'Server Error !',
              text: 'Internel Server Crashed.',
              confirmButtonText: 'OK',
            });
            return
          }
          if (result.error) {
            // Show success alert
                // Show error alert
             if(result.field == 'password'){
              setPasswordError(result.message)
             }else if (result.field == "userID"){
              setuserIDError(result.message)
             }
            // You can also redirect the user or perform other actions here
          } else {
            loginEmployee(result.employeeId)
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              text: 'Welcome to your account.',
              confirmButtonText: 'OK',
            });
            navigate('/leads')
          }
        }
      
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}
    // Reset errors


  return (
    <>
    {loading && <LoadingSpinner/>}
    <div className="min-h-screen bg-gradient-to-r from-blue-950 to-blue-800 p-4 grid place-items-center relative">
      {/* Logo Outside the Content Div */}
      <img
        src={Logo}
        alt="Code and Click CRM"
        className="absolute top-10 left-1/2 transform -translate-x-1/2 mb-4 w-1/2 sm:w-1/3 md:w-1/6" 
        />

      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md mt-16">
        <div className="text-center mb-4">
          <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold">Employee Access</h2>
          <p className="text-gray-500 text-sm sm:text-base">Log in to call center account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* userID Input */}
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <img src={User} alt="user icon" className="mr-2 w-5 h-5" />
              <span className="text-gray-700 font-medium">Employee ID</span>
            </label>
            <input
              className={`w-full p-3 border ${userIDError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500`}
              id="userID"
              type="text"
              placeholder="Enter your Employee ID"
              value={userID}
              onChange={(e) => setuserID(e.target.value)}
              />
            {userIDError && <p className="text-red-500 text-xs mt-1">{userIDError}</p>} {/* Error message */}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <img src={Lock} alt="lock icon" className="mr-2 w-5 h-5" />
              <span className="text-gray-700 font-medium">Password</span>
            </label>
            <input
              className={`w-full p-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>} {/* Error message */}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 w-full text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            Sign In
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">Need help? Contact support.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default EmployeeLogin;
