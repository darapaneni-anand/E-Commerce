import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../components/Context/ProductContext";

import cart_icon from "../assets/cart_icon.png";
import logo from "../assets/logo_big.png";

function Navbar() {
  const { cartCount, setCartItems } = useContext(ProductContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Check initially
    checkLoginStatus();

    // Listen for storage changes (in case token changes in another tab)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear all user-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    // Clear cart in UI immediately
    setCartItems([]);

    // Update login state instantly
    setIsLoggedIn(false);

    // Navigate to login/auth page
    navigate("/auth");
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-10 sm:h-12" />
          <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
            E-Commerce
          </Link>
        </div>

        {/* Hamburger icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none">
            <svg
              className="h-7 w-7 text-blue-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 text-[17px] font-medium text-gray-700">
          {["/", "/mens", "/womens", "/kids"].map((path, i) => (
            <li key={path}>
              <Link
                to={path}
                className="px-4 py-2 rounded-xl transition-all duration-200 hover:bg-blue-600 hover:text-white"
              >
                {["Home", "Men", "Women", "Kids"][i]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login/Logout + Cart */}
        <div className="hidden md:flex items-center gap-5">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Login
            </Link>
          )}

          <div className="relative">
            <Link to="/cart">
              <img src={cart_icon} alt="Cart" className="h-7 w-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow">
                  {cartCount}
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
