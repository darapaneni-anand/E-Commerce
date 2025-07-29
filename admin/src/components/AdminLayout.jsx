import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSideBar";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex flex-col ml-64 w-[calc(100%-16rem)] bg-gray-100">
        {/* Navbar */}
        <AdminNavbar />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
