import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ProductContext from "../components/Context/ProductContext";

import cart_icon from "../assets/cart_icon.png";
import logo from "../assets/logo_big.png";

function Navbar() {
  const { cartCount } = useContext(ProductContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo and brand */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-8 sm:h-10" />
          <Link to="/" className="text-xl font-bold text-blue-700">
            E-Commerce
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="h-6 w-6 text-blue-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
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

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li>
            <Link
              to="/"
              className="px-3 py-1 rounded hover:bg-blue-700 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/mens"
              className="px-3 py-1 rounded hover:bg-blue-700 hover:text-white"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/womens"
              className="px-3 py-1 rounded hover:bg-blue-700 hover:text-white"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to="/kids"
              className="px-3 py-1 rounded hover:bg-blue-700 hover:text-white"
            >
              Kids
            </Link>
          </li>
        </ul>

        {/* Right side - login + cart */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 font-semibold"
          >
            Login
          </Link>

          <div className="relative">
            <Link to="/cart">
              <img src={cart_icon} alt="Cart" className="h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <ul className="flex flex-col gap-3 text-lg">
            <li>
              <Link
                to="/"
                className="block px-3 py-2 rounded hover:bg-blue-700 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mens"
                className="block px-3 py-2 rounded hover:bg-blue-700 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/womens"
                className="block px-3 py-2 rounded hover:bg-blue-700 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/kids"
                className="block px-3 py-2 rounded hover:bg-blue-700 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block bg-white text-blue-600 px-3 py-2 rounded hover:bg-gray-100 font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center gap-2 px-3 py-2 hover:text-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={cart_icon} alt="Cart" className="h-5" />
                {cartCount > 0 && (
                  <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
