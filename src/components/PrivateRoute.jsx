import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until auth state is loaded
  if (loading) return <div>Loading...</div>;

  // If user exists, render the route, else redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
