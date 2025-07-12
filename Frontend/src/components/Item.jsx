import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from "../components/Context/ProductContext";

const Item = ({ id, name, image, old_price, new_price }) => {
  const { addToCart } = useContext(ProductContext);

  const handleAddToCart = (e) => {
    e.preventDefault();

    const product = {
      id,
      name,
      image,
      old_price,
      new_price,
    };

    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-lg shadow hover:shadow-rose-300 transition-all duration-300">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-72 object-contain transition-transform duration-300 group-hover:scale-105 bg-white"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500 line-through text-sm">
            ₹{old_price}
          </span>
          <span className="text-rose-600 font-bold text-lg">
            ₹{new_price}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded font-semibold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
