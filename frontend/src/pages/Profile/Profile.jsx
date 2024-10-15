import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CurvedBottomNav from '../../components/BottomNav/BottomNav';
import AdminNav from '../../components/AdminNav/AdminNav';
import Navbar from '../../components/Navbar/Navbar';
import { HiUserCircle } from 'react-icons/hi';
import api from '../../services/api';
import Swal from 'sweetalert2';

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const employeeId = localStorage.getItem("employeeId")
        const result = await api.fetchUser(employeeId)
        if (result.error == false) {
          setUser(result.data)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Server Error !',
            text: 'Internel Server Crashed.',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Profile Card */}
        <div className="flex-grow bg-blue-950 shadow-md w-full mx-auto p-6 md:p-10 lg:p-12">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <HiUserCircle className="text-teal-400 w-14 h-14 mr-4" />
              <div>
                <p className="font-bold text-xl">{user.name}</p>
                <span className="text-sm text-gray-200">{user.employeeId}</span>
                <p className="text-sm text-gray-200">{user.designation}</p>
              </div>
            </div>
          </div>

          {/* Experience and Settlement Section */}
          <div className="grid grid-cols-2 gap-4 bg-white p-4">
            <div className="text-center">
              <p className="text-gray-500 text-2xl font-semibold">{user.totalSales}</p>
              <p className="text-sm font-semibold text-gray-600">Total Sales</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-2xl font-semibold">{Math.floor(user.daysLeft)} Days</p>
              <p className="text-sm font-semibold text-gray-600">Days Left</p>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="bg-blue-600 p-4 my-4 rounded-lg text-center">
            {/* <p className="text-sm text-black">Count will increase after every sale completion.</p> */}
            {/* <div className="my-2">
            <div className="bg-gray-200 rounded-full h-4 w-full">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-sm text-black mt-1">0/10</p>
          </div> */}
            <div className='flex items-center justify-center h-16'>
              <p className='text-red-500 text-2xl'>The Level Card Is Under Processing</p>
            </div>
          </div>

          {/* More Info Section */}
          <div className="bg-gray-400 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg text-gray-700 mb-4">More Info</h3>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700">Mobile Number : <span className="text-gray-500">{user.phone}</span></p>
              <p className="text-sm font-semibold text-gray-700">
                Joining Date : 
                <span className="text-gray-500 ml-1">
                  {new Date(user.joinDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'Asia/Kolkata'
                  })}
                </span>
              </p>

            </div>
          </div>
        </div>
      </div>
      <CurvedBottomNav />
    </>
    //     <div>
    //     <Navbar/>
    //     <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center p-4">
    //   <h1 className="text-2xl md:text-4xl  font-bold mb-4">🚧 Under Development🚧</h1>
    //   <p className="md:text-lg mb-6">Admin Home is currently undergoing Development.</p>
    // </div>
    // <CurvedBottomNav/>
    // </div>
  );
};

export default Profile;