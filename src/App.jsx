import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute"; // Adjust path as needed
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import QuizProvider from "./context/QuixContext";
import QuizPage from "./pages/QuizPage";
// import callGemini from "./api/callGemini"; // Adjust path as needed

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
      <Route path="/quiz" element={<QuizPage />} />

    </Routes>
  );
}

export default App;

