import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import QuizProvider from "./context/QuixContext";
import QuizPage from "./pages/QuizPage";
import LearnPage from "./pages/LearnPage";
import ExplorePage from "./pages/ExplorePage";
import AllQuizPage from "./pages/AllQuizPage";
import ProgressPage from "./pages/ProgressPage";

function App() {
  return (
    <QuizProvider>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-quiz"
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <PrivateRoute>
              <LearnPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <ExplorePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-quizzes"
          element={
            <PrivateRoute>
              <AllQuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <ProgressPage />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </QuizProvider>
  );
}

export default App;
