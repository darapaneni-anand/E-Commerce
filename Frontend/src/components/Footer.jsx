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
    <footer className="bg-gradient-to-r from-rose-100 via-pink-100 to-rose-200 text-rose-900 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={footerLogo}
            alt="E-Commerce Logo"
            className="h-16 w-auto mb-4 transition-transform duration-300 hover:scale-110"
          />
          <p className="text-sm text-rose-800 max-w-xs">
            Your one-stop shop for the latest collections and exclusive offers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-rose-600 transition-colors">Shop</Link>
          <Link to="/contact" className="hover:text-rose-600 transition-colors">Contact</Link>
          <Link to="/cart" className="hover:text-rose-600 transition-colors">Cart</Link>
        </div>

        {/* About Me */}
<div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
  <h3 className="text-xl font-bold mb-3">About Me</h3>

  {/* Profile Avatar */}
  <Link to="/about">
    <img
      src={profilepic}
      alt="Anand Teja"
      className="w-20 h-20 rounded-full border-2 border-rose-500 shadow-lg"
    />
  </Link>

  <Link to="/about" className="text-rose-600 hover:underline mt-2">
    Read my story
  </Link>
</div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-3">Connect</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="p-3 bg-white rounded-full shadow hover:bg-rose-600 hover:text-white transition-colors duration-200">
              <FaFacebookF />
            </a>
            <a href="#" className="p-3 bg-white rounded-full shadow hover:bg-rose-600 hover:text-white transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="#" className="p-3 bg-white rounded-full shadow hover:bg-rose-600 hover:text-white transition-colors duration-200">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-3">Join My Newsletter</h3>
          <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition"
            >
              Subscribe
            </button>
          </form>
          {success && (
            <p className="mt-2 text-green-600 text-sm">Thanks for subscribing! 🎉</p>
          )}
        </div>
      </div>

      <div className="mt-10 border-t border-rose-300 pt-4 text-center text-sm text-rose-700">
        © {new Date().getFullYear()} E-Commerce by Anand Teja. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
