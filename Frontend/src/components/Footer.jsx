import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerLogo from "../assets/logo_big.png";
import profilepic from "../assets/profilepic.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-100 text-rose-900 py-8 px-4 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <img
            src={footerLogo}
            alt="E-Commerce Logo"
            className="h-14 w-auto mb-1 transition-transform duration-300 hover:scale-105"
          />
          <p className="text-xs text-gray-700 leading-snug max-w-xs">
            Discover the latest trends, enjoy exclusive deals, and find everything you need in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
          <h3 className="text-base font-semibold text-rose-700 mb-1">Quick Links</h3>
          <Link to="/" className="hover:text-rose-600 text-sm transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-rose-600 text-sm transition-colors">Shop</Link>
          <Link to="/contact" className="hover:text-rose-600 text-sm transition-colors">Contact</Link>
          <Link to="/cart" className="hover:text-rose-600 text-sm transition-colors">Cart</Link>
        </div>

        {/* About Me */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <h3 className="text-base font-semibold text-rose-700 mb-1">About Me</h3>
          <Link to="/about" className="group">
            <img
              src={profilepic}
              alt="Anand Teja"
              className="w-16 h-16 rounded-full border border-rose-400 shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <Link to="/about" className="text-rose-600 text-sm hover:underline">
            Read My Story
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-base font-semibold text-rose-700 mb-1">Connect</h3>
          <div className="flex space-x-3 mt-2">
            <a href="#" aria-label="Facebook" className="p-2 bg-white rounded-full shadow hover:bg-rose-600 hover:text-white transition duration-300">
              <FaFacebookF size={14} />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 bg-white rounded-full shadow hover:bg-rose-600 hover:text-white transition duration-300">
              <FaInstagram size={14} />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 bg-white rounded-full shadow hover:bg-rose-600 hover:text-white transition duration-300">
              <FaTwitter size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-rose-200 pt-2 text-center text-[10px] text-gray-600">
        © {new Date().getFullYear()} E-Commerce by Anand Teja. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
