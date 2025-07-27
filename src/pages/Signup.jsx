import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
                    Create Your Account on BrainBurst AI
                </h2>

                <form className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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
                            placeholder="Create a password"
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter password"
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Signup Button */}
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm mt-5 text-gray-700">
                    Already have an account?{" "}
                    <span className="text-blue-600 font-semibold cursor-pointer underline hover:text-blue-800">
                        <Link to="/login"> Login</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
