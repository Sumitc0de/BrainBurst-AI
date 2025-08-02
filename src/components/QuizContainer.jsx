import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import QuizDetails from "./QuizDetails";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext";
import { quizAuth } from "../context/QuixContext";
import { useNavigate } from "react-router-dom";
// import generateQuiz from "../api/generateQuiz";
import GeminiPrompt from "../api/GeminiPrompt"; 

const QuizContainer = () => {
  const { user } = useAuth();
  const { quizzes } = quizAuth();
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quiz, setQuiz] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    quizzes.map((quiz) => {
      setQuiz({
        title: quiz.title,
        questionNo: quiz.questions,
        difficulty: quiz.difficulty,
      });
    })

  }, [quizzes])

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizData = await GeminiPrompt(quiz.title, quiz.questionNo, quiz.difficulty);
      if (quizData) {
        // setQuiz(quizData);
        console.log(quizData);
      } else {
        alert('Failed to generate quiz.');
      }
    }

    fetchQuizzes();
  }, []);



  // const handleGenerate = async () => {
  //    
  //   };

  //   handleGenerate();

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
    <div className="w-full h-screen mt-6 px-4 flex flex-col">
      <div className="w-full pt-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome back, {user.name}
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
            <QuizCard key={quiz.id} quiz={quiz} onView={() => handleViewQuiz(quiz)} />
          ))}
      </div>

      {showQuizDetails && selectedQuiz && (
        <QuizDetails onClose={handleClose} quiz={selectedQuiz} />
      )}
    </div>
  );
};

export default QuizContainer;
