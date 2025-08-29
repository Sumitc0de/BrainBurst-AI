import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import QuizProvider from "./context/QuixContext";
import QuizPage from "./pages/QuizPage";
import LearnPage from "./pages/LearnPage";
import ExplorePage from "./pages/ExplorePage";
import AllQuizPage from "./pages/AllQuizPage";
import Layout from "./components/Layout";
import LearnDetailPage from "./components/learnPage/LearnDetailPage";
import QuizContainer from "./components/QuizContainer";
import CreateQuizCard from "./components/CreateQuizCard";
import AuthProvider, { useAuth } from "./context/AuthContext";
import TopicContent from "./components/learnPage/TopicContent";

function App() {
  const { user } = useAuth();

  return (
    <AuthProvider>
    <QuizProvider>
      <Routes>
        {/* Redirect '/' to login if not logged in */}
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>

          {/* Public pages inside layout if user is logged in */}
          {user && (
            <>
              <Route index element={<QuizContainer />} />
              <Route path="learn" element={<LearnPage />} />
              <Route path="learn/:title" element={<LearnDetailPage />}>
                <Route path=":topic" element={<TopicContent />} />
              </Route>
              <Route path="explore" element={<ExplorePage />} />

              {/* Protected pages */}
              <Route
                path="create-quiz"
                element={
                  <PrivateRoute>
                    <CreateQuizCard />
                  </PrivateRoute>
                }
              />
              <Route
                path="my-quizzes"
                element={
                  <PrivateRoute>
                    <AllQuizPage />
                  </PrivateRoute>
                }
              />
            </>
          )}
        </Route>

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected route outside layout */}
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </QuizProvider>
    </AuthProvider>
  );
}

export default App;
