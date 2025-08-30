import { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard.jsx";
import QuizDetails from "../components/QuizDetails.jsx";
import { prepareQuizzes } from "../utils/generateQuiz.js";

const topics = {
  frontend: ["HTML", "CSS","JavaScript", "React"],
  backend: ["Node.js", "Express", "Databases", "APIs"],
  programming: ["C", "C++", "Python",],
  maths : ["Algebra", "Geometry", ],
  generalTech: ["Computer Networks", "Operating Systems"]

};

const ExplorePage = () => {
  const [quizzesByCategory, setQuizzesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const quizzes = await prepareQuizzes(topics);

        // ✅ Group quizzes by category
        const grouped = quizzes.reduce((acc, quiz) => {
          if (!acc[quiz.category]) acc[quiz.category] = [];
          acc[quiz.category].push(quiz);
          return acc;
        }, {});

        setQuizzesByCategory(grouped);
      } catch (error) {
        console.error("Error loading quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="w-full min-h-screen px-6 py-10 bg-gradient-to-b from-indigo-50 to-white">
      <h1 className="mt-10 md:mt-0 text-2xl md:text-4xl font-extrabold text-indigo-700 mb-12">
        🚀 Explore & Challenge Your Mind – Quiz Time!
      </h1>

      {loading ? (
       <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-b-4"></div>
          </div>
      ) : (
        Object.entries(quizzesByCategory).map(([category, quizzes]) => (
          <div key={category} className="mb-10">
            {/* Category Heading */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 capitalize relative inline-block">
              {category} Quizzes
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-indigo-400 rounded-md"></span>
            </h2>

            {/* Quiz Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onView={() => handleViewQuiz(quiz)}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {showQuizDetails && selectedQuiz && (
        <QuizDetails onClose={handleClose} quiz={selectedQuiz} />
      )}

        {/* Footer */}
    <div className="w-full md:hidden text-center text-sm text-gray-400 md:mt-12">
      © 2025 BrainBurst AI. All rights reserved. Developed by Sumit Vishwakarma
    </div>
    </div>
  );
};

export default ExplorePage;
