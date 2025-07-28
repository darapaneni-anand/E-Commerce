import heroImage from "../assets/hero_image1.png";

function Hero() {
  const scrollToPopular = () => {
    const section = document.getElementById("popular");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-rose-50  to-rose-100 py-10 md:py-16 overflow-hidden">
      
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200 opacity-30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300 opacity-30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14 -mt-8">
        
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left space-y-6">
          
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Elevate Your Style<br />Discover Our New Collection
          </h1>

          <p className="text-base md:text-lg text-rose-700 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Carefully chosen designs to give your wardrobe a fresh look. Join us and make your style stand out.
          </p>

          <div className="flex items-center justify-center md:justify-start">
            <button
              onClick={scrollToPopular}
              className="bg-gradient-to-r from-rose-600 to-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={heroImage}
            alt="Fashion products"
            className="w-full max-w-md rounded-lg pointer-events-none outline-none"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
