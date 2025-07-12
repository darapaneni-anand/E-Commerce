import { Link } from "react-router-dom";

import cart_icon from "../assets/cart_icon.png";
import logo from "../assets/logo_big.png";

function Navbar() {
  

  return (
    <nav className="bg-white-100 text-blue-700 p-4">

      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo and brand */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-10" />
          <Link to="/" className="font-bold text-xl">
            E-Commerce
          </Link>
        </div>

        {/* Center: Navigation menu */}
        <ul className="flex gap-6 text-lg">
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
              to="/men"
              className="px-3 py-1 rounded hover:bg-blue-700 hover:text-white"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/women"
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

        {/* Right: Login + Cart */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 font-semibold"
          >
            Login
          </Link>

          <div className="relative">
            <Link to="/cart">
              <img src={cart_icon} alt="Cart" className="h-6" />
              { (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {3}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
