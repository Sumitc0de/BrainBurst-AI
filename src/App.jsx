import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute"; // Adjust path as needed
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
           <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
