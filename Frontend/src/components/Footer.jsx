import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerLogo from "../assets/logo_big.png";

function Footer() {
  return (
    <footer className=" bg-rose-100 text-rose-900 py-10 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={footerLogo}
            alt="E-Commerce Logo"
            className="h-16 w-auto mb-4"
          />
          <p className="text-sm text-rose-800">
            Your one-stop shop for the latest collections and exclusive offers.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-rose-600">
            Home
          </Link>
          <Link to="/shop" className="hover:text-rose-600">
            Shop
          </Link>
          <Link to="/contact" className="hover:text-rose-600">
            Contact
          </Link>
          <Link to="/cart" className="hover:text-rose-600">
            Cart
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-rose-600 text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-rose-600 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-rose-600 text-2xl"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-rose-700">
        © {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
