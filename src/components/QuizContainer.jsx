import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import QuizDetails from "./QuizDetails";
import { useAuth } from "../context/AuthContext";
import { quizAuth } from "../context/QuixContext";
import { useNavigate } from "react-router-dom";

const QuizContainer = () => {
  const { user } = useAuth();
  const { quizzes, handleDeleteQuiz } = quizAuth(); // no fetchQuizzes needed
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizDetails(true);
  };

  const handleClose = () => {
    setShowQuizDetails(false);
    setSelectedQuiz(null);
  };

  const handleCreateQuiz = () => {
    if (user) navigate("/create-quiz");
    else navigate("/login");
  };

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen px-6 py-10 bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <div className="mt-10 md:mt-0 w-full mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Welcome back,{" "}
          <span className="text-indigo-600">{user?.name || "Guest"}</span> 👋
        </h1>
      </div>

      {/* Create Quiz Button */}
      <div className="mb-8">
        <button
          onClick={handleCreateQuiz}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-700 transition-shadow shadow-md"
        >
          + Create Quiz
        </button>
      </div>

      {/* Quiz Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-b-4"></div>
          </div>
        ) : quizzes && quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onView={() => handleViewQuiz(quiz)}
                onDelete={() => handleDeleteQuiz(quiz.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg mt-10">
            No quizzes available. Create your first one!
          </p>
        )}
      </div>

      {/* Quiz Details Modal */}
      {showQuizDetails && selectedQuiz && (
        <QuizDetails onClose={handleClose} quiz={selectedQuiz} />
      )}

      {/* Footer */}
      <div className="pt-6 md:mt-12 mb-4 md:hidden w-full text-center text-sm text-gray-400">
        © 2025 BrainBurst AI. All rights reserved. Developed by Sumit Vishwakarma
      </div>
    </div>
  );
};

export default QuizContainer;
