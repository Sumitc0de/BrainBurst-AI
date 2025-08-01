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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Login to BrainBurst AI
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm mt-5 text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-700 font-semibold underline hover:text-black">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
