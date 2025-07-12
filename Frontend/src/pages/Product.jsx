import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../components/Context/ProductContext';
import ProductDisplay from '../components/ProductDisplay';

const Product = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 py-12 text-center text-gray-700">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <p>Sorry, the product you’re looking for doesn’t exist.</p>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <ProductDisplay
      product={product}
      relatedProducts={related}
    />
  );
};

export default Product;
