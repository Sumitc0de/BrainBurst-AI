import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import QuizPage from "./pages/QuizPage";
import LearnPage from "./pages/LearnPage";
import ExplorePage from "./pages/ExplorePage";
import AllQuizPage from "./pages/AllQuizPage";
import Layout from "./components/Layout";
import LearnDetailPage from "./components/learnPage/LearnDetailPage";
import QuizContainer from "./components/QuizContainer";
import CreateQuizCard from "./components/CreateQuizCard";
import AuthProvider from "./context/AuthContext";
import TopicContent from "./components/learnPage/TopicContent";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirect '/' to QuizContainer if logged in, else to login */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<QuizContainer />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:title" element={<LearnDetailPage />}>
            <Route path=":topic" element={<TopicContent />} />
          </Route>
          <Route path="explore" element={<ExplorePage />} />
          <Route path="create-quiz" element={<CreateQuizCard />} />
          <Route path="my-quizzes" element={<AllQuizPage />} />
        </Route>

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected quiz page outside layout */}
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />

        {/* Catch all: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
