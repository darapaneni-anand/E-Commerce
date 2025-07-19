import React, { useContext } from "react";
import ProductContext from "../components/Context/ProductContext";
import Item from "../components/Item";

function NewCollections() {
  const { products } = useContext(ProductContext);

  // Sort by created date (latest first) and take the top 9
  const newCollections = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-rose-700 mb-12">
          New Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newCollections.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewCollections;
