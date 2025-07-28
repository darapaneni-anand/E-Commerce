import { useState } from "react";
import { HiMail, HiCheckCircle, HiExclamationCircle, HiShieldCheck } from "react-icons/hi";

const API_URL = import.meta.env.VITE_API_URL || "https://e-commerce-bsss.onrender.com";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Welcome to our community! Check your inbox for a confirmation email.");
        setEmail("");
        setTimeout(() => { setStatus("idle"); setMessage(""); }, 5000);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(errorData.message || "You're already subscribed or an error occurred.");
        setTimeout(() => { setStatus("idle"); setMessage(""); }, 5000);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Unable to connect to our servers. Please try again later.");
      setTimeout(() => { setStatus("idle"); setMessage(""); }, 5000);
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <section className="relative bg-gradient-to-r from-rose-50 via-pink-50 to-rose-100 py-16 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-100/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <div className="space-y-6 mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
            <HiMail className="w-8 h-8 text-rose-600" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 leading-tight">
              Stay in the Loop
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover new arrivals, exclusive deals, and style inspiration.
              Join our community of fashion enthusiasts!
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <HiShieldCheck className="w-5 h-5 text-rose-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <HiCheckCircle className="w-5 h-5 text-rose-500" />
              <span>No Spam, Ever</span>
            </div>
            <div className="flex items-center gap-2">
              <HiMail className="w-5 h-5 text-rose-500" />
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubscribe} className="space-y-6" noValidate>
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    className={`w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isError
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : isSuccess
                        ? "border-green-300 bg-green-50 focus:border-green-400"
                        : "border-rose-200 bg-white"
                    }`}
                    aria-label="Email address for newsletter subscription"
                    aria-describedby={message ? "newsletter-message" : undefined}
                    aria-invalid={isError}
                  />
                  {isSuccess && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <HiCheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  {isError && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <HiExclamationCircle className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="px-8 py-4 bg-rose-600 text-white rounded-full font-semibold text-lg hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  {isLoading ? "Subscribing..." : "Subscribe Now"}
                </button>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div
                id="newsletter-message"
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isError
                    ? "text-red-600 bg-red-50 border-red-200"
                    : isSuccess
                    ? "text-green-600 bg-green-50 border-green-200"
                    : ""
                }`}
                role={isError ? "alert" : "status"}
                aria-live="polite"
              >
                <div className="flex items-center gap-2">
                  {isSuccess && <HiCheckCircle className="w-5 h-5 flex-shrink-0" />}
                  {isError && <HiExclamationCircle className="w-5 h-5 flex-shrink-0" />}
                  <span className="text-sm font-medium">{message}</span>
                </div>
              </div>
            )}
          </form>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              By subscribing, you agree to our{" "}
              <a href="/privacy" className="underline hover:text-rose-600 transition-colors">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline hover:text-rose-600 transition-colors">
                Terms of Service
              </a>
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-rose-200 shadow-md">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-gray-700 text-sm font-medium ml-2">
              Join 10,000+ happy subscribers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
