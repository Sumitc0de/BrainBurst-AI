import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Login to BrainBurst AI
        </h2>

        <form className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm mt-5 text-gray-700">
          Don’t have an account?{" "}
          <span className="text-blue-700 font-semibold cursor-pointer underline hover:text-black">
            <Link to="/signup"> Sign Up </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
