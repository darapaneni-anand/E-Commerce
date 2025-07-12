import React from "react";
import data_product from "../assets/data"; // Make sure this is correct
import Item from "../components/Item";     // Reusable product card

function PopularWomen() {
  // Filter for women category only
  const womenProducts = data_product.filter(
    (product) => product.category === "women"
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-rose-700 mb-12">
          Popular for Women
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              old_price={product.old_price}
              new_price={product.new_price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularWomen;
