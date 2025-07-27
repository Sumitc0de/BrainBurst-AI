import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-2xl font-bold text-blue-600">BrainBurst AI</h1>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
          <a href="#plans" className="text-gray-700 hover:text-blue-600 font-medium">Plans</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In</Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between px-10 pt-28 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white">
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Develop your skills in a smarter way
          </h1>
          <p className="text-lg">
            Enter a topic and instantly generate AI-powered quizzes tailored for your learning style. Fast, accurate, and interactive!
          </p>
          <div className="flex space-x-4">
            <Link to="/signup" className="bg-white text-blue-700 px-6 py-3 font-semibold rounded-md hover:bg-blue-100 transition">
              Get Started
            </Link>
            <a href="#features" className="text-white font-medium underline">
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image / Floating Cards */}
        <div className="relative hidden md:block">
          <img
            src="https://cdn.pixabay.com/photo/2017/08/30/07/52/girl-2696947_960_720.jpg"
            alt="hero"
            className="w-[380px] h-auto rounded-xl shadow-lg"
          />

          {/* Floating Cards */}
          <div className="absolute top-2 left-[-50px] bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg font-medium text-sm">
            🎯 50+ Quiz Templates
          </div>
          <div className="absolute bottom-10 left-[-70px] bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg font-medium text-sm">
            👥 10k+ Users Learning
          </div>
          <div className="absolute bottom-0 right-[-60px] bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg font-medium text-sm">
            🚀 Powered by AI
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="bg-white py-6">
        <div className="text-center text-gray-600 font-medium mb-4">
          Trusted by learners from:
        </div>
        <div className="flex justify-center items-center space-x-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Microsoft_logo.svg" className="h-6" alt="Microsoft" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Codecov_logo.svg" className="h-6" alt="Codecov" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Duolingo_logo.svg" className="h-6" alt="Duolingo" />
        </div>
      </section>
    </>
  );
};

export default Home;
