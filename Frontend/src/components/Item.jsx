import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductContext from "../components/Context/ProductContext";

const Item = ({ id, name, image, old_price, new_price }) => {
  const { addToCart, cartItems } = useContext(ProductContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this product is already in the cart
    const inCart = cartItems.some(item => item.id === id);
    setAdded(inCart);
  }, [cartItems, id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!added) {
      const product = { id, name, image, old_price, new_price };
      addToCart(product, 1);
      setAdded(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="flex flex-col group bg-white rounded-lg shadow hover:shadow-rose-300 transition-all duration-300">
      <Link to={`/product/${id}`} >
        <img
          src={image}
          alt={name}
          className="w-full h-72 object-contain transition-transform duration-300 group-hover:scale-105 bg-white"
        />
      </Link>

      <div className="flex-1 p-4 flex flex-col justify-between items-between">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
          {name}
        </h3>

        <div>
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
            className={`w-full px-4 py-2 rounded font-semibold transition ${
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
