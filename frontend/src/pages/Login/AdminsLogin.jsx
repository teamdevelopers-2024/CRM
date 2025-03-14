import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import User from "../../assets/user.svg";
import Lock from "../../assets/lock.svg";
import api from "../../services/api";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminsLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginSuperAdmin } = useAuth();

  useEffect(() => {
    const admin = localStorage.getItem("superadmin");
    if (admin) {
      navigate("/employees");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate username
    if (username.trim() === "") {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Validate password
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // If validation passes, proceed with login logic
    if (isValid) {
      setLoading(true);
      try {
        const result = await api.adminLogin({ username, password });
        if (result.error) {
          console.log("this is the error : ",result.error)
          setUsernameError("Invalid Credentials");
        } else {
          if (result.role === "superadmin") {
            loginSuperAdmin();
            Swal.fire({
              icon: "success",
              title: "Login Successful!",
              text: "Welcome to Dashboard.",
              confirmButtonText: "OK",
            });
            navigate("/employees");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="flex items-center justify-center min-h-screen bg-blue-950">
        <div className="bg-opacity-90 rounded-lg shadow-lg p-8 sm:p-10 w-full max-w-xs sm:max-w-md bg-white mx-4 sm:mx-auto">
          <div className="text-center mb-8">
            <img src={Logo} alt="Code and Click CRM" className="mx-auto mb-4 w-1/3 sm:w-1/2" />
            <h2 className="text-gray-800 text-lg sm:text-2xl font-bold">WELCOME</h2>
            <p className="text-gray-600 text-sm sm:text-base">TO CRM DASHBOARD</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                <div className="flex items-center">
                  <img src={User} alt="user svg" className="mr-2" />
                  Username
                </div>
              </label>
              <input
                className={`w-full p-2 sm:p-3 text-gray-900 border ${usernameError ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
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
                className={`w-full p-2 sm:p-3 text-gray-900 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-blue-500 w-full text-white font-bold py-2 sm:py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminsLogin;
