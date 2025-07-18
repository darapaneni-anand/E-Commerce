import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaListUl } from "react-icons/fa";

function AdminSidebar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-rose-600 text-white shadow-inner"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 h-screen bg-gray-950 text-white fixed top-0 left-0 z-40 flex flex-col shadow-xl">
      {/* Logo / Header */}
      <div className="px-6 py-6 text-3xl font-bold text-white tracking-wide border-b border-gray-800 bg-gray-900">
        Admin Panel
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-3 text-base">
        <NavLink to="/admin/add-product" className={linkClasses}>
          <FaPlusCircle className="text-lg" />
          Add Product
        </NavLink>

        <NavLink to="/admin/list-products" className={linkClasses}>
          <FaListUl className="text-lg" />
          List Products
        </NavLink>
      </nav>

      {/* Footer (optional) */}
      <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Admin Dashboard
      </div>
    </aside>
  );
}

export default AdminSidebar;
