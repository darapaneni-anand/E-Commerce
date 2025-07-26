import React, { useContext, useState } from "react";
import ProductContext from "../components/Context/ProductContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartQuantity, updateCartSize } = useContext(ProductContext);

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setPromoDiscount(0.1);
    } else {
      setPromoDiscount(0);
      alert("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.new_price * item.quantity,
    0
  );
  const discountAmount = subtotal * promoDiscount;
  const shippingFee = subtotal > 500 ? 0 : 40;
  const grandTotal = subtotal - discountAmount + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-b from-rose-50 to-pink-50">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-48 h-48 mb-6 opacity-80"
        />
        <h2 className="text-3xl md:text-4xl font-bold text-rose-700 mb-3">
          Your cart is empty!
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Looks like you haven’t added anything yet. Explore our latest collection now!
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-rose-700 mb-10">Your Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex flex-col md:flex-row gap-6 items-center p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-contain rounded-xl bg-white border border-gray-200 shadow-sm"
              />

              <div className="flex-1 space-y-4">
                <Link
                  to={`/product/${item.id}`}
                  className="text-xl font-bold text-gray-800 hover:text-rose-600 transition-colors"
                >
                  {item.name}
                </Link>

                {/* Size Selector */}
                <div className="flex items-center gap-3">
                  <label className="text-gray-600 font-medium">Size:</label>
                  <select
                    value={item.size}
                    onChange={(e) =>
                      updateCartSize(item.id, item.size, e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-200 hover:bg-gray-100"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.size, Math.max(1, item.quantity - 1))
                    }
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-bold transition"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center font-semibold text-gray-800 bg-white border border-gray-300 rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.size, item.quantity + 1)
                    }
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-bold transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-rose-500 hover:text-rose-700 text-sm mt-2"
                >
                  Remove
                </button>
              </div>

              <div className="text-lg font-semibold text-gray-700">
                ₹{(item.new_price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6 p-6 border rounded-xl shadow-md bg-white">
          <h2 className="text-xl font-bold text-rose-700 mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {promoDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Promo Discount</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? "Free" : `₹${shippingFee.toFixed(2)}`}</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

          <div className="mt-4">
            <label htmlFor="promo" className="block mb-2 text-gray-600">
              Have a promo code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="Enter promo code"
              />
              <button
                onClick={applyPromo}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>

          <button className="w-full mt-4 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
