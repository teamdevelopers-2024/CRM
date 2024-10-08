import React from 'react'
import AdminNav from '../../components/AdminNav/AdminNav'

function AdminHome() {
  return (
    <div>
        <AdminNav/>
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center p-4">
      <h1 className="text-2xl md:text-4xl  font-bold mb-4">🚧 Under Development🚧</h1>
      <p className="md:text-lg mb-6">Admin Home is currently undergoing Development.</p>
    </div>
    </div>
  )
}

export default AdminHome
