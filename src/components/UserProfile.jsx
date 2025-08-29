import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const userName = user?.name ? user.name.split(" ")[0] : "Guest"; 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-end">
      {/* Mobile: Avatar with dropdown */}
      <div className="md:hidden relative">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title={userName}
        >
          <span className="text-lg font-bold text-gray-800">
            {userName[0].toUpperCase()}
          </span>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <p
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              onClick={logout}
            >
              Logout
            </p>
          </div>
        )}
      </div>

      {/* Desktop: Direct Logout button */}
      <div className="w-full hidden md:flex  space-x-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
