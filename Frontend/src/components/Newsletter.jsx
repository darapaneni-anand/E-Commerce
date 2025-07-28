import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "https://e-commerce-bsss.onrender.com";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("❌ Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("🎉 Subscribed successfully!");
        setEmail("");
      } else {
        setMessage("⚠️ Already subscribed or error occurred.");
      }
    } catch (err) {
      setMessage("⚠️ Server error, please try again later.");
    }
  };

  return (
    <section className="bg-rose-50 py-10 px-4 text-center">
      <h2 className="text-xl font-bold text-rose-700 mb-4">Join Our Newsletter</h2>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition"
        >
          Subscribe
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </section>
  );
}

export default Newsletter;
