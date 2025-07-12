function Newsletter() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto rounded-lg bg-rose-50 p-10 shadow-lg px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-8">
            Join Our Newsletter
          </h2>
          <p className="text-lg md:text-xl text-rose-900 mb-8">
            Get exclusive updates, special offers, and the latest collections directly in your inbox!
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
  type="email"
  placeholder="Enter your email"
  className="
    w-full sm:w-auto
    px-6 py-3
    rounded-full
    border border-rose-300
    bg-white/80
    backdrop-blur
    placeholder-rose-400
    text-gray-700
    text-lg
    shadow-inner
    focus:outline-none
    focus:border-rose-500
    transition
  "
/>



            <button
              type="submit"
              className="bg-rose-600 text-white px-8 py-3 rounded hover:bg-rose-700 transition text-lg font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
