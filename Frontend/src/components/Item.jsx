import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductContext from "../components/Context/ProductContext";

const Item = ({ id, name, image, old_price, new_price }) => {
  const { addToCart, cartItems } = useContext(ProductContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const inCart = cartItems.some(item => item.id === id);
    setAdded(inCart);
  }, [cartItems, id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!added) {
      addToCart({ id, name, image, old_price, new_price }, 1, "M");
      setAdded(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow hover:shadow-rose-300 transition-all duration-300 h-full">
      <Link to={`/product/${id}`} className="flex-1 flex items-center justify-center p-4">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-60 object-contain"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        {/* Product Name - always 2 lines */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {name}
        </h3>

        {/* Prices */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500 line-through text-sm">₹{old_price}</span>
          <span className="text-rose-600 font-bold text-lg">₹{new_price}</span>
        </div>

        {/* Button sticks to bottom */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-300 ${
              added
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-rose-600 hover:bg-rose-700 text-white"
            }`}
          >
            {added ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
