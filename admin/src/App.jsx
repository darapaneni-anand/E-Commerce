import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import Admin from "./pages/Admin";
import AddProduct from "./components/AddProduct";
import ListProducts from "./components/ListProducts";

function App() {
 
  return (
    <Router>
      <div >
       <AdminNavbar/>  
      <Admin/>
        
          <Routes>
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/list-products" element={<ListProducts />} />
          </Routes>
        </div>
     
    </Router>
  )
}

export default App;
