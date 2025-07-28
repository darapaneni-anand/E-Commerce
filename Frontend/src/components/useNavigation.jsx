import { useNavigate, useLocation } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const handleHomeNavigation = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
    }
  };

  const handleSectionNavigation = (sectionId, fallbackPath = "/") => (e) => {
    e.preventDefault();
    
    if (location.pathname === "/") {
      const success = scrollToSection(sectionId);
      if (!success) {
        console.warn(`Section with ID "${sectionId}" not found`);
      }
    } else {
      navigate(`${fallbackPath}#${sectionId}`);
    }
  };

  const handleExternalLink = (url) => (e) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return {
    handleHomeNavigation,
    handleSectionNavigation,
    handleExternalLink,
    scrollToTop,
    scrollToSection,
    currentPath: location.pathname
  };
};

