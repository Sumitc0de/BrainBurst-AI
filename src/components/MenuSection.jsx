import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Learn", path: "/learn" },
  { name: "Explore Quizzes", path: "/explore" },
  { name: "My Quizzes", path: "/my-quizzes" },
  { name: "My Progress", path: "/progress" },
];

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-5 py-3 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer shadow-sm ${
    isActive
      ? "bg-[#0065F8] text-white"
      : "bg-white text-gray-800 hover:bg-[#f0f4ff] hover:text-[#0065F8]"
  }`;

const MenuSection = () => {
  return (
    <div className="p-6 shadow-xl w-[30vw] h-screen bg-white/80 backdrop-blur-md border border-gray-200 flex flex-col justify-start">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 tracking-wide">
        Brain<span className="text-[#0065F8]">Burst</span> AI
      </h1>

      {/* Create Quiz (default route) */}
      <NavLink to="/" end className={linkClasses}>
        Create Quiz
      </NavLink>

      <p className="text-sm text-gray-500 mb-6 px-1">
        Start creating your custom quizzes with ease.
      </p>

      {/* Dynamic menu items */}
      <ul className="space-y-4">
        {menuItems.map(({ name, path }) => (
          <li key={path}>
            <NavLink to={path} className={linkClasses}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-10 text-sm text-gray-400">
        © 2025 BrainBurst AI. All rights reserved.
      </div>
    </div>
  );
};

export default MenuSection;
