import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simple hash function (for demo - in production use bcrypt)
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
};

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }

    try {
      // Get all users from localStorage
      const usersData = localStorage.getItem("all_users");
      const users = usersData ? JSON.parse(usersData) : {};

      // Check if username already exists
      if (users[username]) {
        setError("Username already taken! Try another one.");
        setLoading(false);
        return;
      }

      // Create new user
      const hashedPassword = hashPassword(password);
      users[username] = {
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        netWorth: 0,
        goals: [],
      };

      // Save to localStorage
      localStorage.setItem("all_users", JSON.stringify(users));

      // Log them in
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong! Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get all users from localStorage
      const usersData = localStorage.getItem("all_users");
      const users = usersData ? JSON.parse(usersData) : {};

      // Check if user exists
      if (!users[username]) {
        setError("Account not found! Sign up first.");
        setLoading(false);
        return;
      }

      const userData = users[username];
      const hashedPassword = hashPassword(password);

      // Check password
      if (userData.password !== hashedPassword) {
        setError("Wrong password! Try again.");
        setLoading(false);
        return;
      }

      // Log them in
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong! Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (isSignUp) {
      handleSignUp(e);
    } else {
      handleSignIn(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <img
            src="/images/ll_logo_test_2.png"
            alt="Lucrative Ladies"
            className="w-32 h-32 mx-auto mb-6 object-contain"
          />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Lucrative Ladies
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Empower Your Wealth Journey
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a community of women building financial freedom, tracking
            goals, and supporting each other every step of the way.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Track Your Money
            </h3>
            <p className="text-gray-600">
              Monitor income, expenses, and watch your wealth grow with
              beautiful dashboards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Achieve Your Goals
            </h3>
            <p className="text-gray-600">
              Set financial goals, visualize progress, and celebrate every
              milestone.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Build Your Circle
            </h3>
            <p className="text-gray-600">
              Connect with like-minded women, share tips, and inspire each
              other.
            </p>
          </div>
        </div>

        {/* Login/Signup Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-pink-200">
            {/* Toggle */}
            <div className="flex gap-2 mb-6 bg-pink-50 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  !isSignUp
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                    : "text-gray-600"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  isSignUp
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                    : "text-gray-600"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              autoComplete="off"
            >
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter your username"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 pr-12"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500 text-xl"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium disabled:opacity-50"
              >
                {loading
                  ? "Loading..."
                  : isSignUp
                  ? "Create Account 🚀"
                  : "Sign In 💖"}
              </button>
            </form>

            {/* Quick Demo Button */}
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", "Demo User");
                navigate("/dashboard");
              }}
              className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-all text-sm"
            >
              ✨ Try Demo (No Sign Up)
            </button>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            "A woman's best protection is a little money of her own." - Clare
            Boothe Luce
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
