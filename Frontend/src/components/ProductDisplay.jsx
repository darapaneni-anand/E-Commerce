import React, { useContext } from 'react';
import ProductContext from '../components/Context/ProductContext';
import { Link } from 'react-router-dom';

const ProductDisplay = ({ product, relatedProducts }) => {
  const { addToCart } = useContext(ProductContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* PRODUCT INFO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* LEFT: Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[600px] object-contain rounded-xl shadow"
          />
        </div>

        {/* RIGHT: Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-rose-700">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex gap-4 items-center">
            <span className="text-rose-600 text-3xl font-bold">
              ₹{product.new_price}
            </span>
            <span className="text-gray-400 line-through text-xl">
              ₹{product.old_price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition"
          >
            Add to Cart
          </button>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section>
        <h2 className="text-3xl font-bold text-rose-700 mb-8">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-rose-300 transition duration-300 flex flex-col items-center"
            >
              <Link to={`/product/${rel.id}`} className="w-full">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-64 object-contain mb-4"
                />
              </Link>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {rel.name}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 line-through text-sm">
                  ₹{rel.old_price}
                </span>
                <span className="text-rose-600 font-bold text-lg">
                  ₹{rel.new_price}
                </span>
              </div>
              <button
                onClick={() => addToCart(rel, 1)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDisplay;
