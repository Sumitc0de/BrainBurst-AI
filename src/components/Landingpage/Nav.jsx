import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      {/* Brand Name */}
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
        BrainBurst AI
      </h1>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <a href="#features" className="text-gray-700 font-medium hover:text-blue-600 transition">Features</a>
        <a href="#how-it-works" className="text-gray-700 font-medium hover:text-blue-600 transition">How It Works</a>
        <a href="#faq" className="text-gray-700 font-medium hover:text-blue-600 transition">FAQ</a>
      </div>

      {/* Call to Action */}
      <Link
        to="/login"
        className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </nav>
  );
};

export default Nav;
