import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar";
import ShopCategory from "./pages/ShopCategory.jsx";
import men_banner from "./assets/banner_mens.png";
import women_banner from "./assets/banner_women.png";
import kids_banner from "./assets/banner_kids.png";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/men" element={<ShopCategory banner={men_banner} category= "mens"/>} />
        <Route path = "/women" element={<ShopCategory banner={women_banner} category = "women"/>} />
        <Route path = "/kids" element={<ShopCategory banner={kids_banner} category = "kids"/>} />
        {/* Add more routes here later */}
      </Routes>
    </Router>
  );
}

export default App;
