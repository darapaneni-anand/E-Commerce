import heroImage from "../assets/hero_image1.png";

function Hero() {
  const scrollToPopular = () => {
    const section = document.getElementById("popular");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-rose-50 to-rose-100 py-10 md:py-16 overflow-hidden">
      
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200 opacity-30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300 opacity-30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14 -mt-8">
        
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left space-y-8">
          
          {/* Main Heading with Gradient Text */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              

              <span className="block bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent font-medium tracking-[0.01em]">
                Elevate Your Style
              </span>
              <span className="block text-slate-800 font-bold text-3xl md:text-4xl lg:text-5xl mt-2 tracking-wide">
                Discover Our New Collection
              </span>
            </h1>
          </div>

          {/* Enhanced Description */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-slate-700 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
              <span className="text-rose-800 font-semibold">Carefully chosen</span> designs to give your wardrobe a fresh look
             
            </p>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Join us and make your style{" "}
              <span className="font-semibold text-rose-700 italic">stand out</span> with confidence.
            </p>
          </div>

          {/* Enhanced Button */}
          <div className="flex items-center justify-center md:justify-start pt-2">
            <button
              onClick={scrollToPopular}
              className="group relative bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Shop Now
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </div>

         
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            <img
              src={heroImage}
              alt="Fashion products"
              className="w-full max-w-md rounded-2xl pointer-events-none outline-none "
            />
           
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

