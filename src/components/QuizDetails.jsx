import { useState } from "react";
import { quizAuth } from "../context/QuixContext";
import loader from "../assets/loader.svg"; // ✅ default import

const QuizDetails = ({ onClose, quiz }) => {
  const { handleStartQuiz } = quizAuth();
  const [loading, setLoading] = useState(false);
 

  const handleClick = async (quiz) => {
    try {
      setLoading(true); // show loader
      await handleStartQuiz(quiz); // wait for quiz start
    } catch (err) {
      console.error("Error starting quiz:", err);
      setLoading(false); // reset if failed
    }
  };
  // console.log("Quiz Details:", quiz);

 return (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 md:p-0">
    <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 relative">
      
      {/* Title & Close */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          📝 {quiz.title}
        </h2>
        <button
          onClick={onClose}
          disabled={loading}
          aria-label="Close"
          title="Close"
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-white hover:bg-red-500 transition-colors duration-300 text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Quiz Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700 text-sm md:text-base">
        <div>
          <span className="font-semibold">📌 Questions:</span> {quiz.no_questions || 0}
        </div>
        <div>
          <span className="font-semibold">⏱ Time:</span> {quiz.timer} min
        </div>
        <div>
          <span className="font-semibold">🧮 Total Marks:</span> {(quiz.no_questions || 0) * 10}
        </div>
        <div>
          <span className="font-semibold">Difficulty:</span> {quiz.difficulty || "N/A"}
        </div>
      </div>

      {/* Start Quiz / Loader */}
      {loading ? (
        <div className="flex justify-center">
          <img src={loader} alt="Loading..." className="w-32 md:w-48" />
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => handleClick(quiz)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm md:text-base font-semibold hover:bg-indigo-700 transition-shadow shadow-md"
          >
            🚀 Start Quiz
          </button>
        </div>
      )}
    </div>
  </div>
);

};

export default QuizDetails;