import new_collections from "../assets/new_collections"; // adjust path if needed

function NewCollections() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-rose-700 mb-12">
          New Collections
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {new_collections.map((item) => (
            <div
              key={item.id}
              className="bg-rose-50 p-4 rounded-xl shadow hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <div className="mt-2 text-sm">
                <span className="text-rose-600 font-bold">₹{item.new_price}</span>
                <span className="ml-2 text-gray-500 line-through">₹{item.old_price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewCollections;
