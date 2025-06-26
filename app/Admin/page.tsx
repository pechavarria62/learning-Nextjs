
import React from 'react'
import AdminLayout from '../components/AdminLayout'



function AdminPage() {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-600 h-64 w-full'>
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <h1 className="mb-3 text-2xl">
        Admin Page - Access Restricted
      </h1>
      <p className="text-gray-600">This page is for administrators only.</p>
      <AdminLayout 
      />
    </div>
    </div>
  )
}

export default AdminPage