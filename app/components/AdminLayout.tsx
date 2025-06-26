
import React from "react";
import Image from "next/image";

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600">Admin User</span>
                <Image
                width={50}
                height={50}
                
                    src="/customers/avatar.jpg"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-300"
                />
            </div>
            </div>

            
            <div className="flex flex-1">
            
            <aside className="w-64 bg-white shadow-md p-6">
                <Image
                    src="/customers/avatar.jpg"
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
                />
            </aside>
                <h2 className="text-lg font-semibold text-gray-700">Admin</h2>
                </div>

                <nav className="mt-8 space-y-4">
                <a href="#" className="block text-blue-600 font-medium">Dashboard</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">Users</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">Settings</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">Logout</a>
                </nav>

            
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h2>
                <p className="text-gray-600">Here is where you manage the app content.</p>
            </main>
            </div>
    
        
  );
};

export default AdminLayout;
