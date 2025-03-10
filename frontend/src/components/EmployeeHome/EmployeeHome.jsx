import React from 'react';
import Navbar from "../Navbar/Navbar";
import CurvedBottomNav from '../BottomNav/BottomNav';

function HomeBody() {

return (

         <div>
        <Navbar/>
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center p-4">
      <h1 className="text-2xl md:text-4xl  font-bold mb-4">🚧 Under Development🚧</h1>
      <p className="md:text-lg mb-6">Home is currently undergoing Development.</p>
    </div>
    <CurvedBottomNav/>
    </div>
)
  return (
    <>
      <nav><Navbar /></nav>
      <div className="bg-blue-950 min-h-screen text-white p-4 sm:p-8 lg:p-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 items-stretch">
          {/* Card 1: Completed */}
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-teal-500 mb-2">Completed</h2>
            <p className="text-2xl font-bold">0</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[100px]"> {/* Decreased height */}
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[90px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[65px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[55px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[65px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[90px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[60px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[80px] w-[35px] rounded-3xl"></div>
            </div>
          </div>

          {/* Card 2: Closed */}
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-teal-500 mb-2">Closed</h2>
            <p className="text-2xl font-bold">0</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[100px]"> {/* Decreased height */}
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[90px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[65px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[55px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[65px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[90px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[60px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[80px] w-[35px] rounded-3xl"></div>
            </div>
          </div>

          {/* Card 3: Pending */}
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-teal-500 mb-2">Pending</h2>
            <p className="text-2xl font-bold">0</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[100px]"> {/* Decreased height */}
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[90px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[65px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[55px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[65px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[90px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[60px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[80px] w-[35px] rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      <CurvedBottomNav/>
    </>
  );
}

export default HomeBody;
