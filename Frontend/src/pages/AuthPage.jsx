import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password } = formData;

    const endpoint = isLogin
      ? 'http://localhost:4000/login'
      : 'http://localhost:4000/signup';

    const payload = isLogin
      ? { email, password }
      : { username: name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      localStorage.setItem('token', data.token);
     localStorage.setItem('user', JSON.stringify(data.user)); // ← store user info (like _id)

      alert(`${isLogin ? 'Login' : 'Signup'} successful`);
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-rose-50 to-rose-100 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-extrabold text-rose-600 text-center mb-6">
          {isLogin ? 'Welcome Back!' : 'Join Us Today'}
        </h1>

        {error && (
          <p className="text-center text-red-600 font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-xs text-gray-500 hover:text-rose-500 transition"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={handleToggle}
            className="text-rose-600 font-semibold hover:underline ml-1"
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
