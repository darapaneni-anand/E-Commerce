import React, { useContext, useState } from 'react';
import ProductContext from '../components/Context/ProductContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(ProductContext);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Example: flat 10% discount if code is SAVE10
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SAVE10') {
      setPromoDiscount(0.1);
    } else {
      setPromoDiscount(0);
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.new_price * item.quantity,
    0
  );

  const discountAmount = subtotal * promoDiscount;
  const shippingFee = subtotal > 500 ? 0 : 50;
  const grandTotal = subtotal - discountAmount + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center text-gray-700">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty!</h2>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-rose-700 mb-12">Your Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* LEFT: Products */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 items-center border p-4 rounded shadow bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-contain rounded"
              />

              <div className="flex-1 space-y-2">
                <Link
                  to={`/product/${item.id}`}
                  className="text-lg font-bold text-rose-700 hover:underline"
                >
                  {item.name}
                </Link>

                <div className="flex items-center gap-4">
                  <span className="text-gray-500 line-through">
                    ₹{item.old_price}
                  </span>
                  <span className="text-rose-600 font-bold text-xl">
                    ₹{item.new_price}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-gray-700">Qty:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateCartQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-rose-600 hover:text-rose-800 text-sm mt-2"
                >
                  Remove
                </button>
              </div>

              <div className="text-gray-700 font-semibold">
                ₹{(item.new_price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Summary */}
        <div className="space-y-6 p-6 border rounded shadow bg-white">
          <h2 className="text-2xl font-bold text-rose-700 mb-4">Order Summary</h2>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {promoDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Promo Discount</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee.toFixed(2)}`}</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

          {/* Promo code */}
          <div className="mt-6">
            <label htmlFor="promo" className="block mb-2 text-gray-700">
              Have a promo code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
                placeholder="Enter promo code"
              />
              <button
                onClick={applyPromo}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>

          <button className="w-full mt-6 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
