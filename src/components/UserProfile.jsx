import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();
  const userName = user && user.name ? user.name.split(" ")[0] : "Guest"; // show first name

  return (
    <div title={userName} className="w-fit h-12 rounded-full flex items-center justify-center shadow-md">
      <img
        src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
        alt="User"
        className="w-12 h-12 rounded-full object-cover mb-1"
      />
    </div>
  );
};

export default UserProfile;
