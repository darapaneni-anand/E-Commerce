import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar";
import ShopCategory from "./pages/ShopCategory.jsx";
import men_banner from "./assets/banner_mens.png";
import women_banner from "./assets/banner_women.png";
import kids_banner from "./assets/banner_kids.png";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart";
import Footer from "./components/Footer.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AboutMe from "./pages/Aboutme.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Newsletter from "./components/Newsletter.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Homepage with Newsletter */}
            <Route
              path="/"
              element={
                <>
                  <HomePage />
                  <Newsletter />
                </>
              }
            />

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid" />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
