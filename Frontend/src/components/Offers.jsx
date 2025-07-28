import exclusive_image from "../assets/exclusive_image.png";

function Offers() {
  const scrollToNewCollections = () => {
    const section = document.getElementById("new-collections");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 bg-gradient-to-b from-white  to-white">
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-32 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-rose-50  to-rose-100 relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
        
        {/* LEFT: Text */}
        <div className="flex-1 text-center md:text-left space-y-5">
          <p className="text-rose-500 font-semibold tracking-wider uppercase">
            Special Offer
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Exclusive Deals<br />Made Just for You
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto md:mx-0">
            Discover curated collections with timeless style. Limited-time prices on our most-loved pieces.
          </p>
          <button
            onClick={scrollToNewCollections}
            className="mt-3 bg-rose-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-rose-700 hover:scale-105 transition-transform duration-300"
          >
            Explore Offers
          </button>
          
          {/* Highlighted perks */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            {["Free Shipping", "30-Day Returns", "Exclusive Discounts"].map((perk, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-gray-900 font-medium bg-rose-100 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                {perk}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={exclusive_image}
            alt="Exclusive collection"
            className="w-full max-w-sm md:max-w-md rounded-xl pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}

export default Offers;
