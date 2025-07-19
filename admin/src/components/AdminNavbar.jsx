import React, { useState } from "react";
import logo from "../assets/logo.png";
import profilepic from "../assets/profilepic.png";

function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 text-white px-4 py-4 shadow">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        {/* Hamburger for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

       

        {/* Profile icon */}
        <div className="hidden md:block">
          <img
            src={profilepic}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border border-white cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 space-y-2">
          <span className="block cursor-pointer hover:text-gray-300">Dashboard</span>
          <span className="block cursor-pointer hover:text-gray-300">Products</span>
          <span className="block cursor-pointer hover:text-gray-300">Orders</span>
          <img
            src={navProfile}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border border-white mt-4"
          />
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
