import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-2">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;
