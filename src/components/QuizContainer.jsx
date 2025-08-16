import React, { useState } from "react";
import QuizCard from "./QuizCard";
import QuizDetails from "./QuizDetails";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext";
import { quizAuth } from "../context/QuixContext";
import { useNavigate } from "react-router-dom";


const QuizContainer = () => {
  const { user } = useAuth();
  const { quizzes,handleDeleteQuiz } = quizAuth();
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();


  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizDetails(true);
    console.log("Selected Quiz:", quiz);
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
    <div className="w-full h-[100vh]  px-4 py-4 flex flex-col overflow-y-scroll">
      <div className="w-full pt-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back,<span className="font-bold">{user.name}</span> 
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {quizzes &&
          quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onView={() => handleViewQuiz(quiz)}
              onDelete={() => handleDeleteQuiz(quiz.id)}  
            />
          ))}
      </div>

      {showQuizDetails && selectedQuiz && (
        <QuizDetails key={selectedQuiz.id} onClose={handleClose} quiz={selectedQuiz} />
      )}
    </div>
  );
};

export default QuizContainer;
