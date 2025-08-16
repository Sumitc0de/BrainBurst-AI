import { useState } from "react";

const MenuSection = () => {
  const [activeItem, setActiveItem] = useState("create-quiz");

  // Rearranged items: first one is separate
  const otherMenuItems = ["Learn", "Explore Quizzes", "My Quizzes", "My Progress"];

  return (
    <div className="p-6 shadow-xl w-[30vw] max-w-sm h-screen bg-white/80 backdrop-blur-md border border-gray-200  flex flex-col justify-start">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 tracking-wide">
        Brain<span className="text-[#0065F8]">Burst</span> AI
      </h1>

      {/* Create Quiz Button */}
      <div
        onClick={() => setActiveItem("Create Quiz")}
        className={`px-5 py-3 mb-2 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer shadow-sm ${
          activeItem === "Create Quiz"
            ? "bg-[#0065F8] text-white"
            : "bg-white text-gray-800 hover:bg-[#f0f4ff] hover:text-[#0065F8]"
        }`}
      >
        Create Quiz
      </div>

      {/* Description below Create Quiz */}
      <p className="text-sm text-gray-500 mb-6 px-1">
        Start creating your custom quizzes with ease.
      </p>

      {/* Other Menu Items */}
      <ul className="space-y-4">
        {otherMenuItems.map((item, idx) => (
          <li
            key={idx}
            onClick={() => setActiveItem(item)}
            className={`flex items-center gap-3 px-5 py-3 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer shadow-sm ${
              activeItem === item
                ? "bg-[#0065F8] text-white"
                : "bg-white text-gray-800 hover:bg-[#f0f4ff] hover:text-[#0065F8]"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10 text-sm text-gray-400">
        © 2025 BrainBurst AI. All rights reserved.
      </div>
    </div>
  );
};

export default MenuSection;
