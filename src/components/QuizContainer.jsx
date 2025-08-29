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
    <div className="mt-10 sm:mt-0 h-fit px-4 flex flex-col  ">
      <div className="w-full flex items-center justify-between">
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
      <div className="md:hidden py-4 w-full text-center text-sm text-gray-400">
         © 2025 BrainBurst AI. All rights reserved.
            & developed by Sumit Vishwakarma
      </div>
    </div>
  );
};

export default QuizContainer;
