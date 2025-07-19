import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../components/Context/ProductContext';
import ProductDisplay from '../components/ProductDisplay';

const Product = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  // Find the selected product (handles both id and _id, string comparison)
  const product = products.find((p) => String(p.id || p._id) === String(id));

  if (!product) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 py-12 text-center text-gray-700">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <p>Sorry, the product you’re looking for doesn’t exist.</p>
      </div>
    );
  }

  // Get up to 4 other products of the same category
  const related = products
    .filter((p) => p.category === product.category && String(p.id || p._id) !== String(id))
    .slice(0, 4);

  return (
    <ProductDisplay
      product={product}
      relatedProducts={related}
    />
  );
};

export default Product;
