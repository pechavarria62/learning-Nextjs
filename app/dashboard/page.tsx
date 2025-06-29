import React from "react";
import CardWrapper from "../ui/dashboard/cards";

export default function DashboardPage() {
  return (
    <div className="p-3 min-h-screen bg-gray-100 w-full h-full ">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid min-h-screen grid-cols-1 gap-4 mb-6 w-90 h-48 flex items-center justify-center ">
        <CardWrapper/>
      </div>
      {/* Add more dashboard content here */}
    </div>
  );
}
