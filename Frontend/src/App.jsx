import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar";
import ShopCategory from "./pages/ShopCategory.jsx";
import men_banner from "./assets/banner_mens.png";
import women_banner from "./assets/banner_women.png";
import kids_banner from "./assets/banner_kids.png";
import Product from './pages/Product.jsx';
import Cart from "./pages/Cart";
import Footer from "./components/Footer.jsx";






function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/mens" element={<ShopCategory banner={men_banner} category= "men"/>} />
        <Route path = "/womens" element={<ShopCategory banner={women_banner} category = "women"/>} />
        <Route path = "/kids" element={<ShopCategory banner={kids_banner} category = "kid"/>} />
        <Route path = '/product' element={<Product/>}>
         <Route path = '/product/:id' element = {<Product/>} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        {/* Add more routes here later */}
      </Routes>
         <Footer/>
      
    </Router>
  );
}

export default App;
