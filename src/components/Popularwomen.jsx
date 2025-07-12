import data_product from "../assets/data";

function PopularWomen() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Centered, Bigger Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-rose-700 mb-12">
          Popular for Women
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data_product.map((product) => (
            <div
              key={product.id}
              className="bg-rose-50 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded mb-6"
              />

              <h3 className="text-xl font-semibold text-rose-800 mb-3 text-center">
                {product.name}
              </h3>

              <div className="flex justify-center items-center gap-3 text-center">
                <span className="text-gray-400 line-through text-base">
                  ${product.old_price.toFixed(2)}
                </span>
                <span className="text-rose-600 font-bold text-lg">
                  ${product.new_price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularWomen;
