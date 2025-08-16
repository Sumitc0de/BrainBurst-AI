import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimer } from "../hook/useTimer";

 const QuizPage = ()=> {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state;


  if (!quizData || !quizData.data || !quizData.data.questions) {
    return <div className="p-8 text-red-500">No quiz data found.</div>;
  }

  const questions = quizData.data.questions;

  // Load saved state from localStorage
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("quizAnswers");
    return saved ? JSON.parse(saved) : {};
  });

  const [currentQ, setCurrentQ] = useState(() => {
    const savedIndex = localStorage.getItem("quizCurrentQ");
    return savedIndex ? Number(savedIndex) : 0;
  });

  const [score, setScore] = useState(null);

  const question = questions[currentQ];
  const selectedOption = answers[currentQ] ?? null;

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  }, [answers]);

  // Save current question index
  useEffect(() => {
    localStorage.setItem("quizCurrentQ", currentQ);
  }, [currentQ]);

  const handleOptionClick = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ]: option
    }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

const handleSubmit = () => {
  timer.stop(); // Stop timer if submitting early
  let correctCount = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) {
      correctCount++;
    }
  });
  setScore(correctCount);
  localStorage.removeItem("quizCurrentQ");
  localStorage.removeItem("quizTimeLeft"); // Clear timer on submit
};

  const handleBackToHome = () => {
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("quizCurrentQ");
    navigate("/");
  };

  // ✅ Use timer (minutes → converted in hook)
  const timer = useTimer(quizData.data.timer, () => {
    // ⏰ Auto-submit when time’s up
    handleSubmit();
  });

  // console.log("Time left:", quizData.data.timer);

  // ✅ Format seconds -> mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-blue-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full max-w-3xl bg-white shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          {quizData.data.title || "Quiz"}
        </h1>
        <div className="text-lg font-semibold">
          Time Left:{" "}
          <span className="text-red-500">{formatTime(timer.timeLeft)}</span>
        </div>
      </div>

      {/* Score Card */}
      {score !== null ? (
        <div className="w-full max-w-3xl bg-white shadow-lg p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            🎉 Quiz Completed!
          </h2>
          <p className="text-lg text-gray-700">
            You scored <span className="text-blue-600">{score}</span> out of{" "}
            {questions.length}
          </p>

          {score < questions.length && (
            <p className="mt-2 text-red-500 font-semibold">
              {score < questions.length / 2
                ? "You can do better! Keep practicing."
                : "Good job! But there's room for improvement."}
            </p>
          )}

          <button
            onClick={handleBackToHome}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Home
          </button>
        </div>
      ) : (
        /* Question Card */
        <div className="w-full max-w-3xl bg-white shadow-lg p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Q{currentQ + 1}. {question.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className={`p-3 rounded-lg border transition 
                  ${
                    selectedOption === option
                      ? "bg-blue-500 text-white"
                      : "bg-blue-50 hover:bg-blue-100"
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              disabled={currentQ === 0}
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
            >
              Back
            </button>

            {currentQ < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default QuizPage;