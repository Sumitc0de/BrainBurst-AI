import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const UserProfile = () => {
  const { user,logout } = useAuth();
  const userName = user && user.name ? user.name.split(" ")[0] : "Guest"; // show first name
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDrop = () => {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div className="relative w-fit h-12 rounded-full cursor-pointer flex items-center justify-center shadow-md" title={userName}>
      {/* <img
        src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
        alt="User"
        className="w-12 h-12 rounded-full object-cover mb-1"
        onClick={handleDrop}
      /> */}
      <p
      onClick={handleDrop}
      className="w-12 h-12 text-xl font-bold text-center content-center fixed md:static top-3 right-3 z-50 bg-white/80 rounded-full p-2 shadow"

      >{userName[0].toUpperCase()}</p>
      {dropdownOpen && (
        <div className="absolute top-0 md:top-10 z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg ">
          <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={logout}
          >Logout</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
