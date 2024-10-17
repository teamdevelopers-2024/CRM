import React from "react";

const EmployeeViewModal = ({ setViewModal, employee }) => {
  const sampleData = {
    totalLeadAssigned: 120,
    pendingLeads: 15,
    onCollage: 20,
    closed: 50,
    notResponded: 10,
    needToFollowUp: 15,
    adminRejected: 10,
    rejected: 5
  };

  return (
    <div className="fixed z-60 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3">
        {/* Profile Section */}
        <div className="flex items-center space-x-6 mb-4">
          {/* Profile Icon */}
          <div className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center text-3xl">
            {/* Placeholder for profile icon */}
            <span className="text-gray-500">👤</span>
          </div>

          {/* Employee Name and ID */}
          <div>
            <h2 className="text-3xl font-semibold">{employee.name}</h2>
            <p className="text-gray-500 text-lg">{employee.employeeId}</p>
          </div>
        </div>

        {/* Highlighted Lead Stats */}
        <div className="flex justify-between space-x-4 mb-4">
          {/* Total Leads Assigned */}
          <div className="bg-blue-100 p-6 rounded-lg flex-1 text-center">
            <h3 className="text-3xl font-bold text-blue-600">{employee.leads.length}</h3>
            <p className="text-sm">Total Assigned</p>
          </div>

          {/* Closed Leads */}
          <div className="bg-green-100 p-6 rounded-lg flex-1 text-center">
            <h3 className="text-3xl font-bold text-green-600">{employee.leads.filter((lead)=> lead.status == 'closed').length}</h3>
            <p className="text-sm">Closed</p>
          </div>
        </div>

        {/* Other Lead Status Cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Pending Leads */}
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-yellow-600">{employee.leads.filter((lead)=> lead.status == 'pending'|| lead.status == "N/A").length}</h3>
            <p>Pending Leads</p>
          </div>

          {/* On Collage */}
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-400">{employee.leads.filter((lead)=> lead.status == 'onCollege').length}</h3>
            <p>On Collage</p>
          </div>

          {/* Not Responded */}
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-red-600">{employee.leads.filter((lead)=> lead.status == 'not responded').length}</h3>
            <p>Not Responded</p>
          </div>

          {/* Need to Follow Up */}
          <div className="bg-orange-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-orange-600">{employee.leads.filter((lead)=> lead.status == 'need to follow up').length}</h3>
            <p>Need to Follow Up</p>
          </div>

          {/* Admin Rejected */}
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-purple-600">{employee.leads.filter((lead)=> lead.status == 'admin rejected').length}</h3>
            <p>Admin Rejected</p>
          </div>
          <div className="bg-red-200 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-red-700">{employee.leads.filter((lead)=> lead.status == 'rejected').length}</h3>
            <p>Rejected</p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={() => setViewModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeViewModal;
