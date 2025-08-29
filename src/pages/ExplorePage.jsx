import { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard.jsx";
import createQuiz from "../api/createQuiz.js";
import QuizDetails from "../components/QuizDetails.jsx";

const topics = {
  frontend: ["HTML", "CSS"],
  backend: ["Node.js"],
  programming: ["C"],
  sports: ["Football"],
};

const ExplorePage = () => {
  const [quizzesByCategory, setQuizzesByCategory] = useState({
    frontend: [],
    backend: [],
    programming: [],
  });
  const [loading, setLoading] = useState(true);
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Track collapsible categories
  const [openCategories, setOpenCategories] = useState({
    frontend: true,
    backend: true,
    programming: true,
  });

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizDetails(true);
  };

  const handleClose = () => {
    setShowQuizDetails(false);
    setSelectedQuiz(null);
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);

      try {
        const categoryResults = {};

        for (const category in topics) {
          const quizzesForCategory = [];

          for (const title of topics[category]) {
            const topicSlug = title.toLowerCase().replace(/\s+/g, "-");

            // Check if quiz exists in localStorage
            const storedQuiz = localStorage.getItem(`quiz_${topicSlug}`);
            let quiz;

            if (storedQuiz) {
              quiz = JSON.parse(storedQuiz); // load from localStorage
            } else {
              quiz = await createQuiz(title); // generate via API
              localStorage.setItem(`quiz_${topicSlug}`, JSON.stringify(quiz)); // store in localStorage
            }

            quizzesForCategory.push(quiz);
          }

          categoryResults[category] = quizzesForCategory;
        }

        setQuizzesByCategory(categoryResults);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 py-4 flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Explore & Challenge Your Mind – Quiz Time!
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading quizzes...</p>
      ) : (
        Object.entries(quizzesByCategory).map(([category, quizzes]) => (
          <div key={category} className="mb-8">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex justify-between items-center text-left 
                 bg-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition"
            >
              <span className="text-lg font-bold text-gray-700  capitalize">
                {category} Quizzes
              </span>
              <span className="text-gray-600">
                {openCategories[category] ? "−" : "+"}
              </span>
            </button>

            {/* Category Quizzes */}
            {openCategories[category] && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quizzes.length > 0 ? (
                  quizzes.map((quiz, index) => (
                    <QuizCard
                      key={quiz.id || `${category}-${index}`}
                      quiz={quiz}
                      onView={() => handleViewQuiz(quiz)}
                      onDelete={() => {
                        setQuizzesByCategory((prev) => ({
                          ...prev,
                          [category]: prev[category].filter(
                            (q) => q.id !== quiz.id
                          ),
                        }));
                      }}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full text-center">
                    No {category} quizzes available.
                  </p>
                )}
              </div>
            )}
          </div>
        ))
      )}

      {showQuizDetails && selectedQuiz && (
        <QuizDetails onClose={handleClose} quiz={selectedQuiz} />
      )}
    </div>
  );
};

export default ExplorePage;