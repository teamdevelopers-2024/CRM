import React, { useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

const AssignLeadsModal = ({setAssignLeadModal,setLeadEmployee, employee }) => {
  const [leadCount, setLeadCount] = useState('');
  const [error , setError ] = useState('')
  const [loading , setLoading ] = useState(false)
  const handleLeadChange = (e) => {
    setLeadCount(e.target.value);
  };

  const handleSubmit = async() => {
    try {
        setLoading(true)
        if(leadCount < 1 ){
            setError("Count is required")
            return 
        }
        setError("")
        const data = {
            id:employee.employeeId,
            count:leadCount
        }
        const result = await api.individualAssign(data)
        if(result.error){
            setError('something went wrong')
        }else {
            Swal("!success",`${leadCount} Leads Assigned Successfully`,"error")
        }
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
 
  };

  return (
    <>
    {loading && <LoadingSpinner/>}
<div className="fixed inset-0 bg-gray-900 bg-opacity-50  flex justify-center items-center z-50">

      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Assign Leads to {employee.name}</h2>

        <label className="block text-gray-700 mb-2" htmlFor="leadCount">
          Number of Leads:
        </label>
        <input
          type="number"
          id="leadCount"
          placeholder="Enter Count"
          value={leadCount}
          onChange={handleLeadChange}
          className="w-full px-3 py-2 border rounded-md"
          />
        <p className="text-red-500">{error}</p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={() => {
                setLeadEmployee({})
                setAssignLeadModal(false)
            }}
            >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
            >
            Submit
          </button>
        </div>
      </div>
    </div>
              </>
  );
};

export default AssignLeadsModal;
