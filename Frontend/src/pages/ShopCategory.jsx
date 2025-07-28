import React, { useContext, useState } from 'react';
import ProductContext from '../components/Context/ProductContext';
import Item from '../components/Item';

const ShopCategory = (props) => {
  const { products } = useContext(ProductContext);

  // Filter by category (case-insensitive)
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === props.category.toLowerCase()
  );

  const [sortOption, setSortOption] = useState('');
  const [showAll, setShowAll] = useState(false); // Track Explore More / Show Less

  // Sort logic
  let sortedProducts = [...filteredProducts];
  if (sortOption === 'priceLowHigh') {
    sortedProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortOption === 'priceHighLow') {
    sortedProducts.sort((a, b) => b.new_price - a.new_price);
  } else if (sortOption === 'nameAsc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'nameDesc') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Determine how many products to display
  const visibleProducts = showAll ? sortedProducts : sortedProducts.slice(0, 12);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6">
      {/* Banner */}
      <img
        src={props.banner}
        alt="Category Banner"
        className="w-full h-64 md:h-96 object-contain rounded-lg shadow mb-8 bg-white"
      />

      <h2 className="text-3xl md:text-4xl font-bold text-rose-700 mb-10 text-center capitalize">
        {props.category} Products
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <span className="text-gray-600 text-sm md:text-base">
          Showing {visibleProducts.length} of {sortedProducts.length} products
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-600 text-sm md:text-base">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            old_price={item.old_price}
            new_price={item.new_price}
          />
        ))}
      </div>

      {/* Explore More / Show Less Button */}
      {sortedProducts.length > 12 && (
        <div className="mt-12 text-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-lg font-semibold shadow transition"
            >
              Explore More
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="px-8 py-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white text-lg font-semibold shadow transition"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
