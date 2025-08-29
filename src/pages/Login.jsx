import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const success = await login(email, password); // login first
      if (success) {
        setEmail("");
        setPassword("");
        console.log("Login successful!");
        navigate("/");
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      alert("Login failed. Try again.");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-700 px-4">
    <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl flex flex-col items-center">
      
      {/* Branding / Logo */}
      <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-wide">
          Brain<span className="text-indigo-600">Burst</span> AI
        </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Login to your account
      </h2>

      {/* Form */}
      <form className="w-full space-y-6" onSubmit={handleLogin}>
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p className="text-center text-sm mt-6 text-gray-700">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 font-semibold underline hover:text-blue-800 transition"
        >
          Sign Up
        </Link>
      </p>

      {/* Footer (mobile) */}
      <div className="mt-8 text-center text-xs text-gray-400 md:hidden">
        © 2025 BrainBurst AI. All rights reserved. Developed by Sumit Vishwakarma
      </div>
    </div>
  </div>
);
};

export default Login;
