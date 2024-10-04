import React from 'react';
import Navbar from "../Navbar/Navbar";

function HomeBody() {
  return (
    <>
      <nav><Navbar /></nav>
      <div className="bg-blue-950 min-h-screen text-white p-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 items-stretch">
          {/* Card 1: Today's Revenue */}
          <div className="bg-gray-800 p-8 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-teal-500 mb-2">Completed</h2>
            <p className="text-2xl font-bold">0</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[135px]">
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[74px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[83px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-400 to-teal-200 h-[118px] w-[35px] rounded-3xl"></div>
            </div>
          </div>

          {/* Card 2: Today's Expenses */}
          <div className="bg-gray-800 p-8 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-teal-500 mb-2">Closed</h2>
            <p className="text-2xl font-bold">0</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[135px]">
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[74px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[83px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200 h-[118px] w-[35px] rounded-3xl"></div>
            </div>
          </div>

          {/* Card 3: Pending */}
          <div className="bg-gray-800 p-8 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-teal-500 mb-2">Pending</h2>
            <p className="text-2xl font-bold">0</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[135px]">
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[74px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[83px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-purple-500 via-purple-300 to-purple-200 h-[118px] w-[35px] rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBody;
