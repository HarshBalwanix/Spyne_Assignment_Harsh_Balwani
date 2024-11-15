import React from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { DashboardNavbar } from '../dashboard/Navbar';

export const Dashboard = () => {
  return (
    <div>
      <DashboardNavbar/>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-indigo-50">
        <Sidebar />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto text-gray-800">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10 bg-indigo-50 shadow-lg rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
