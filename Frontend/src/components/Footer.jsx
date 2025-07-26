import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import footerLogo from "../assets/logo_big.png";
import profilepic from "../assets/profilepic.png";

function Footer() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    console.log("Subscribed:", email);
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <footer className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-100 text-rose-900 py-16 px-6 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img
            src={footerLogo}
            alt="E-Commerce Logo"
            className="h-20 w-auto mb-2 transition-transform duration-300 hover:scale-110"
          />
          <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
            Discover the latest trends, enjoy exclusive deals, and find everything you need in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h3 className="text-lg font-bold text-rose-700 mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-rose-600 transition-colors">Shop</Link>
          <Link to="/contact" className="hover:text-rose-600 transition-colors">Contact</Link>
          <Link to="/cart" className="hover:text-rose-600 transition-colors">Cart</Link>
        </div>

        {/* About Me */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h3 className="text-lg font-bold text-rose-700 mb-2">About Me</h3>
          <Link to="/about" className="group">
            <img
              src={profilepic}
              alt="Anand Teja"
              className="w-20 h-20 rounded-full border-2 border-rose-400 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <Link to="/about" className="text-rose-600 hover:underline mt-2">
            Read My Story
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold text-rose-700 mb-2">Connect</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" aria-label="Facebook" className="p-3 bg-white rounded-full shadow-md hover:bg-rose-600 hover:text-white transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="p-3 bg-white rounded-full shadow-md hover:bg-rose-600 hover:text-white transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="p-3 bg-white rounded-full shadow-md hover:bg-rose-600 hover:text-white transition duration-300">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold text-rose-700 mb-2">Join My Newsletter</h3>
          <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-md transition transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
          {success && (
            <p className="mt-2 text-green-600 text-sm animate-fade-in">Thanks for subscribing! 🎉</p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-rose-200 pt-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} E-Commerce by Anand Teja. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
