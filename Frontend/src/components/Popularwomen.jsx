import React, { useContext } from "react";
import ProductContext from "../components/Context/ProductContext";
import Item from "../components/Item";

function PopularWomen() {
  const { products } = useContext(ProductContext);

  // Filter for women's products and take only 4
  const womenProducts = products
    .filter((product) => product.category === "women")
    .slice(0, 4);

  return (
    <section className="py-16 bg-white" id="popular">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-rose-700 mb-12">
          Popular for Women
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
            <Item key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularWomen;
