import React from 'react';
import profile from '../../assets/photo.png';
import { Link } from 'react-router-dom'; 
import AdminNav from '../AdminNav/AdminNav';

const Profile = () => {
  // return (
  //   // <div className="min-h-screen bg-gray-100 flex flex-col">
  //   //   {/* Navbar */}
  //   //   <nav className="bg-blue-500 p-4 flex items-center">
  //   //     <Link to="/home" className="text-white mr-4">
  //   //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //   //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0h9m-9 0l3-3m-3 3l3 3" />
  //   //       </svg>
  //   //     </Link>
  //   //     <h1 className="text-white text-xl font-bold">Profile</h1>
  //   //   </nav>

  //   //   {/* Profile Card */}
  //   //   <div className="flex-grow bg-white shadow-md rounded-lg w-full mx-auto p-6 md:p-10 lg:p-12">
  //   //     {/* Header */}
  //   //     <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
  //   //       <div className="flex items-center space-x-3">
  //   //         <img
  //   //           className="w-16 h-16 rounded-full border-2 border-gray-300"
  //   //           src={profile}
  //   //           alt="Profile"
  //   //         />
  //   //         <div>
  //   //           <p className="font-bold text-xl">Dilshad</p>
  //   //           <span className="text-sm text-gray-200">CNC0001</span>
  //   //           <p className="text-sm text-gray-200">Sales Admin</p>
  //   //         </div>
  //   //       </div>
  //   //     </div>

  //   //     {/* Experience and Settlement Section */}
  //   //     <div className="grid grid-cols-2 gap-4 bg-white p-4">
  //   //       <div className="text-center">
  //   //         <p className="text-gray-500 text-2xl font-semibold">0</p>
  //   //         <p className="text-sm font-semibold text-gray-600">Total Sales</p>
  //   //       </div>
  //   //       <div className="text-center">
  //   //         <p className="text-gray-500 text-2xl font-semibold">27 Days</p>
  //   //         <p className="text-sm font-semibold text-gray-600">Settlement Date</p>
  //   //       </div>
  //   //     </div>

  //   //     {/* Progress Bar Section */}
  //   //     <div className="bg-blue-600 p-4 my-4 rounded-lg text-center">
  //   //       <p className="text-sm text-black">Count will increase after every sale completion.</p>
  //   //       <div className="my-2">
  //   //         <div className="bg-gray-200 rounded-full h-4 w-full">
  //   //           <div className="bg-blue-500 h-4 rounded-full" style={{ width: '0%' }}></div>
  //   //         </div>
  //   //         <p className="text-sm text-black mt-1">0/10</p>
  //   //       </div>
  //   //     </div>

  //   //     {/* More Info Section */}
  //   //     <div className="bg-gray-400 p-4 rounded-lg shadow-md">
  //   //       <h3 className="font-semibold text-lg text-gray-700 mb-4">More Info</h3>

  //   //       <div className="mt-4">
  //   //         <p className="text-sm font-semibold text-gray-700">Mobile Number: <span className="text-gray-500">+91-9876543210</span></p>
  //   //         <p className="text-sm font-semibold text-gray-700">Joining Date: <span className="text-gray-500">1st January 2023</span></p>
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   // </div>
  // );

return (
  <div>
  <AdminNav/>
  <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center p-4">
<h1 className="text-2xl md:text-4xl  font-bold mb-4">🚧 Under Development🚧</h1>
<p className="md:text-lg mb-6">Profile is currently undergoing Development.</p>
</div>
</div>
)
};

export default Profile;
