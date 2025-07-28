import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { HiMail, HiPhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigation } from "./useNavigation";
import footerLogo from "../assets/logo_big.png";

const COMPANY_INFO = {
  name: "E-Commerce",
  tagline: "Your Style, Our Passion",
  email: "anandteja38@gmail.com",
  phone: "+91 7075863028"
};

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "https://facebook.com/ecommerce", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com/ecommerce", label: "Instagram" },
  { icon: FaTwitter, href: "https://twitter.com/ecommerce", label: "Twitter" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/company/ecommerce", label: "LinkedIn" }
];

const NAVIGATION_LINKS = [
  { label: "Home", action: "home" },
  { label: "New Collections", action: "section", sectionId: "new-collections" },
  { label: "Popular", action: "section", sectionId: "popular" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" }
];

function Footer() {
  const { handleHomeNavigation, handleSectionNavigation, handleExternalLink } = useNavigation();

  const renderNavigationLink = (link, index) => {
    if (link.action === "home") {
      return (
        <a
          key={index}
          href="/"
          onClick={handleHomeNavigation}
          className="text-gray-700 hover:text-rose-600 transition-colors text-sm font-medium"
        >
          {link.label}
        </a>
      );
    }

    if (link.action === "section") {
      return (
        <a
          key={index}
          href={`/#${link.sectionId}`}
          onClick={handleSectionNavigation(link.sectionId)}
          className="text-gray-700 hover:text-rose-600 transition-colors text-sm font-medium"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={index}
        to={link.to}
        className="text-gray-700 hover:text-rose-600 transition-colors text-sm font-medium"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-100 border-t border-rose-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Left - Logo & Info */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-3">
              <img src={footerLogo} alt={COMPANY_INFO.name} className="h-10 w-auto" />
              <div>
                <h2 className="text-base font-bold text-rose-800">{COMPANY_INFO.name}</h2>
                <p className="text-xs text-gray-600">{COMPANY_INFO.tagline}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1 text-gray-700 hover:text-rose-600">
                <HiMail className="w-4 h-4" /> {COMPANY_INFO.email}
              </a>
              <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 text-gray-700 hover:text-rose-600">
                <HiPhone className="w-4 h-4" /> {COMPANY_INFO.phone}
              </a>
            </div>
          </div>

          {/* Center - Navigation */}
          <div className="flex justify-center">
            <nav>
              <div className="flex flex-wrap justify-center gap-4">
                {NAVIGATION_LINKS.map((link, index) => renderNavigationLink(link, index))}
              </div>
            </nav>
          </div>

          {/* Right - Socials */}
          <div className="flex justify-center md:justify-end">
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    onClick={handleExternalLink(social.href)}
                    aria-label={social.label}
                    className="p-2 bg-white rounded-full border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition transform hover:scale-105"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-rose-200 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {COMPANY_INFO.name} by Anand Teja. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
