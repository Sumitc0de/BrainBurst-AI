import { MdDelete } from "react-icons/md";

const QuizCard = ({ quiz, onView, onDelete }) => {
  const questionCount = quiz.no_questions
    
  return (
    <>
    <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 transition-transform hover:scale-[1.02] duration-200">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {quiz.title || "Untitled Quiz"}
      </h2>

      <p className="text-sm text-gray-500 mb-1">
        📋{questionCount} Questions · ⏱️ {quiz.timer || 1} min
      </p>

      <p className="text-xs text-indigo-500 mb-3">
        Difficulty: {quiz.difficulty || "Not selected"}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-green-600 font-medium">✅ Published</span>

        <div className="flex items-center space-x-2">
          {/* Delete Button */}
          <button
            className="border border-gray-300 rounded-sm p-1.5 hover:bg-gray-100 transition"
            onClick={onDelete}
          >
            <MdDelete className="text-red-500 cursor-pointer hover:text-red-700 transition" />
          </button>

          {/* View Button */}
          <button
            className="text-sm px-3 py-1 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            onClick={onView}
          >
            View
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuizCard;
