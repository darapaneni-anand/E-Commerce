import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Admin from "./pages/Admin";
import AddProduct from "./components/AddProduct";
import ListProducts from "./components/ListProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* All admin pages use the AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="list-products" element={<ListProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
