import { quizAuth } from "../context/QuixContext";
import { useState } from "react";
import QuizCard from "../components/QuizCard.jsx";
import QuizDetails from "../components/QuizDetails.jsx";


const AllQuizPage = () => {
  const { quizzes, handleDeleteQuiz } = quizAuth();
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizDetails(true);
  };


  const handleClose = () => {
    setShowQuizDetails(false);
    setSelectedQuiz(null);
  };

return (
  <>
    <div className="w-full min-h-screen px-6 py-10 bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Page Title */}
      <h1 className="mt-10 md:mt-0 text-3xl md:text-4xl font-extrabold text-indigo-700 mb-10">
        🎯 Explore Your Quizzes
      </h1>

      {/* Quizzes Grid */}
      <div
        id="Quiz_Container"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
          <p className="text-gray-500 col-span-full text-center text-lg">
            No quizzes available. Create your first one!
          </p>
        )}
      </div>

      {/* Quiz Details Modal */}
      {showQuizDetails && selectedQuiz && (
        <QuizDetails onClose={handleClose} quiz={selectedQuiz} />
      )}

      {/* Footer */}
      <div className="pt-6 md:hidden md:mt-12 w-full text-center text-sm text-gray-400">
        © 2025 BrainBurst AI. All rights reserved. Developed by Sumit Vishwakarma
      </div>
    </div>
  </>
);

}
export default AllQuizPage;