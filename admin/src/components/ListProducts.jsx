import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function ListAllProducts() {
  const [products, setProducts] = useState([]);

  // Normalize image URL: if DB stores full URL, use as is; otherwise prepend API_URL
  const getImageURL = (image) => {
    if (!image) return "";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    return `${API_URL}/${image}`;
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/allproducts`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Remove product
  const removeProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/removeproduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name }),
      });

      const result = await res.json();
      if (result.success) {
        alert(`Removed: ${result.name}`);
        fetchProducts(); // Refresh list
      } else {
        alert("Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-rose-700">All Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={getImageURL(product.image)}
                alt={product.name}
                className="w-full h-48 object-contain rounded-md mb-4 border"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 line-through">₹{product.old_price}</span>
                <span className="text-green-600 font-bold">₹{product.new_price}</span>
              </div>
              <button
                onClick={() => removeProduct(product.id, product.name)}
                className="mt-4 w-full py-2 text-sm font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListAllProducts;
