import React, { useState } from "react";
import QuizCard from "./QuizCard";
import QuizDetails from "./QuizDetails";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext";
import { quizAuth } from "../context/QuixContext";
import { useNavigate } from "react-router-dom";

const QuizContainer = () => {
  const { user } = useAuth();
  const { quizzes, handleDeleteQuiz } = quizAuth();
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
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
    if (user) {
      navigate("/create-quiz");
    }
  };

  return (
    <div className="flex-1 h-screen px-4 py-4 flex flex-col overflow-y-scroll ">
      <div className="w-full pt-5 flex items-center justify-between">
        <h1 className="mt-8 md:mt-0 text-2xl font-semibold text-gray-800">
          Welcome back, <span className="font-bold">{user?.name || "Guest"}</span>
        </h1>
        <div id="User_account">
          <UserProfile />
        </div>
      </div>

      <div className="mt-10 mb-5">
        <button
          onClick={handleCreateQuiz}
          className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
        >
          + Create Quiz
        </button>
      </div>

      <div
        id="Quiz_Container"
        className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4"
      >
        {quizzes && quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onView={() => handleViewQuiz(quiz)}
              onDelete={() => handleDeleteQuiz(quiz.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No quizzes available. Create your first one!
          </p>
        )}
      </div>

      {showQuizDetails && selectedQuiz && (
        <QuizDetails onClose={handleClose} quiz={selectedQuiz} />
      )}

      {/* Footer (mobile only) */}
      <div className="md:hidden mt-auto pt-10 text-center text-sm text-gray-400">
        © 2025 BrainBurst AI. All rights reserved.
      </div>
    </div>
  );
};

export default QuizContainer;
