import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute"; // Adjust path as needed
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import QuizProvider from "./context/QuixContext";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-quiz" element={
        <QuizProvider>
          <CreateQuiz />
        </QuizProvider>} />

    </Routes>
  );
}

export default App;
