import { Link } from "react-router-dom";
import heroImage from "../assets/hero_image1.png";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-rose-200 to-rose-300 pt-8 md:pt-12 pb-20 md:pb-28">

      {/* Decorative shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-white opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white opacity-20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Text Section */}
        <div className="max-w-xl text-center md:text-left">
          {/* Subheadline */}
          <p className="text-rose-700 text-lg md:text-xl font-medium uppercase tracking-wider mb-4">
            New Collections
          </p>

          {/* Smaller Big Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-rose-800 mb-6 leading-tight">
            Discover Beautiful Products
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-rose-700 mb-8">
            Shop the latest trends and enjoy exclusive deals across all categories.
          </p>

          {/* CTA Button */}
          <Link
            to="/shop"
            className="inline-block bg-rose-700 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-rose-800 transition-all duration-300 text-lg"
          >
            Explore Latest Collections
          </Link>
        </div>

        {/* Hero Image */}
        <div className="mt-12 md:mt-0 md:ml-10">
          <img
            src={heroImage}
            alt="Fashion model holding clothes"
            aria-hidden="true"
            className="w-full max-w-md rounded-lg pointer-events-none outline-none"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
