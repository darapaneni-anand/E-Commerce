import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../components/Context/ProductContext";
import { Star, Truck, Tag } from "lucide-react";

const ProductDisplay = ({ product, relatedProducts }) => {
  const { addToCart, cartItems } = useContext(ProductContext);
  const [added, setAdded] = useState(false);
  const [mainImage, setMainImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState("M");
  const navigate = useNavigate();

  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.image, product.image, product.image];

  useEffect(() => {
    setMainImage(product.image);
    const inCart = cartItems.some((item) => item.id === product.id);
    setAdded(inCart);
  }, [product, cartItems]);

  const handleAddToCart = () => {
    if (!added) {
      addToCart(product, 1);
      setAdded(true);
    } else {
      navigate("/cart");
    }
  };

  const productDescription =
    product.description ||
    "Discover comfort and elegance with our premium clothing line, designed to keep you stylish and confident all day long.";

  const sizes = ["S", "M", "L", "XL"];
  const avgRating = 4.5;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* LEFT: Image Section */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-200 hover:scale-110 ${
                  mainImage === img
                    ? "border-rose-600"
                    : "border-gray-200 hover:border-rose-300"
                }`}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto max-h-[600px] object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(avgRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600 text-lg">({avgRating.toFixed(1)})</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-lg italic">
            {productDescription}
          </p>

          {/* Size Selection */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Select Size:</h4>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:border-rose-500`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Delivery */}
          <div>
            <div className="flex gap-4 items-center mt-4">
              <span className="text-rose-600 text-3xl font-bold">₹{product.new_price}</span>
              <span className="text-gray-400 line-through text-xl">₹{product.old_price}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
              <Tag className="w-4 h-4 text-rose-500" />
              Limited time offer: Flat 20% off
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
              <Truck className="w-4 h-4 text-green-500" />
              Free shipping | 3–5 days delivery
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full mt-4 px-6 py-3 rounded-lg font-semibold shadow-md ${
              added
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-rose-600 hover:bg-rose-700 text-white"
            }`}
          >
            {added ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-rose-700 mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-rose-300 flex flex-col items-center"
            >
              <Link to={`/product/${rel.id}`} className="w-full">
                <img src={rel.image} alt={rel.name} className="w-full h-64 object-contain mb-4" />
              </Link>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {rel.name}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 line-through text-sm">₹{rel.old_price}</span>
                <span className="text-rose-600 font-bold text-lg">₹{rel.new_price}</span>
              </div>
              <button
                onClick={() => addToCart(rel, 1)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded"
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
