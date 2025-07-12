import exclusive_image from "../assets/exclusive_image.png";

function Offers() {
  return (
    <section className="py-10 bg-white">
      {/* Banner container */}
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-32 rounded-lg overflow-hidden shadow-lg bg-rose-100 flex flex-col md:flex-row items-center gap-12 p-6">
        
        {/* LEFT: Text Container */}
       <div className="text-center md:text-left space-y-4 max-w-xl ml-20">
  <h2 className="text-5xl md:text-6xl font-extrabold text-rose-700 leading-tight">
    Exclusive Offers for You
  </h2>
  <p className="text-rose-900 text-xl md:text-2xl leading-relaxed">
    Save big on our newest arrivals and special collections, just for you!
  </p>
  <button className="bg-rose-600 text-white text-lg px-8 py-3 rounded hover:bg-rose-700 transition">
    Shop Offers
  </button>
</div>


        {/* RIGHT: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={exclusive_image}
            alt="Exclusive Offer"
            className="
              w-full
              max-w-md
              rounded-lg
              opacity-80
              mix-blend-multiply
              pointer-events-none
              outline-none
            "
          />
        </div>
      </div>
    </section>
  );
}

export default Offers;
