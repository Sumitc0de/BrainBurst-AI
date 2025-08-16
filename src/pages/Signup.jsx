import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [userData, setUserData] = useState({
        name: "",   
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const { signup } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = userData;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await signup(name,email,password); // assuming your signup handles name
            navigate("/"); // redirect to home on successful signup
            setUserData({ name: "", email: "", password: "", confirmPassword: "" });

        } catch (err) {
            console.error("Signup error:", err.message);
            alert("Signup failed. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
                <h2 className="md:hidden text-2xl font-extrabold mb-6 text-center text-blue-700">
                    Create Account 
                </h2>
                
                <h2 className="hidden md:block text-3xl font-extrabold mb-6 text-center text-blue-700">
                    Create Your Account on BrainBurst AI
                </h2>

                <form className="space-y-5" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm mt-5 text-gray-700">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold underline hover:text-blue-800">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
