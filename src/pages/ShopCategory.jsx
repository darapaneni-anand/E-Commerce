import React, { useContext } from 'react';
import ProductContext from '../components/Context/HomeContext'; // Ensure this path is correct

const ShopCategory = (props) => {
  const { products } = useContext(ProductContext); // Get product data from context

  // Optional: Filter by category if passed as prop
  const filteredProducts = props.category
    ? products.filter(product => product.category === props.category)
    : products;

  return (
    <div className="p-4">
      <img src={props.banner} alt="Category Banner" className="w-full rounded-lg mb-6" />

      <h2 className="text-2xl font-bold mb-4 text-rose-700">
        {props.category ? props.category + ' Products' : 'All Products'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold text-rose-700">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <span className="text-rose-600 font-bold">₹{product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
