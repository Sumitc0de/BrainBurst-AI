import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import UserProfile from "./UserProfile";

const menuItems = [
  { name: "Learn", path: "/learn" },
  { name: "Explore Quizzes", path: "/explore" },
  { name: "My Quizzes", path: "/my-quizzes" },
];

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-5 py-3 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer shadow-sm ${
    isActive
      ? "bg-[#0065F8] text-white"
      : "bg-white text-gray-800 hover:bg-[#f0f4ff] hover:text-[#0065F8]"
  }`;

const MenuSection = () => {
  const [open, setOpen] = useState(false);

 return (
  <div>
    {/* Hamburger menu for mobile */}
    {!open && (
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/90 rounded-full p-2 shadow-md hover:shadow-lg transition"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <IoMdMenu className="w-8 h-8 text-gray-800" />
      </button>
    )}

    {/* Backdrop for mobile */}
    {open && (
      <div
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
        onClick={() => setOpen(false)}
      />
    )}

    {/* Sidebar */}
    <div
      className={`fixed md:static top-0 left-0 h-full 
        w-[80vw] md:w-64 bg-white border-r border-gray-200 shadow-xl
        transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Close Icon (mobile only) */}
        <button
          className="md:hidden self-start mb-6"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <IoMdClose className="w-8 h-8 text-gray-800" />
        </button>

        {/* Logo */}
        <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-12 tracking-wide">
          Brain<span className="text-indigo-600">Burst</span> AI
        </h1>

        {/* Create Quiz Link */}
        <NavLink
          to="/"
          end
          className={linkClasses}
          onClick={() => setOpen(false)}
        >
          <span>Create Quiz</span>
        </NavLink>

        {/* Optional description */}
        <p className="hidden md:block text-sm text-gray-500 my-6 px-1">
          Start creating your custom quizzes with ease.
        </p>
        <br />

        {/* Dynamic menu items */}
        <ul className="space-y-4">
          {menuItems.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Profile */}
        <div className="mt-6 md:mt-auto">
          <UserProfile />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 text-xs md:text-sm text-gray-400 ">
          © 2025 BrainBurst AI. All rights reserved.<br />Developed by Sumit Vishwakarma
        </div>
      </div>
    </div>
  </div>
);

};

export default MenuSection;
