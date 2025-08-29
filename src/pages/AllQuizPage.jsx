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
      <div className="w-full h-screen px-4 py-4 flex flex-col">
        <h1 className="text-2xl font-semibold mt-15 md:mt-0 text-gray-800 mb-6">
          Explore your Quizzes
        </h1>

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
    </>
  );
}
export default AllQuizPage;