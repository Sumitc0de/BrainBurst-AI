import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const QuizContext = createContext();
export const quizAuth = () => useContext(QuizContext);

const QuizProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🧠 Store multiple quizzes
  const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    questions: '',
    timer: '',
    difficulty: '',
  });

  // 🔁 Load quizzes from localStorage on mount
  useEffect(() => {
    const storedQuizzes = localStorage.getItem("quizzesData");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  // 📦 Save all quizzes to localStorage when updated
  useEffect(() => {
    localStorage.setItem("quizzesData", JSON.stringify(quizzes));
  }, [quizzes]);

  // 🖊 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Save the new quiz
  const handleCreateQuiz = () => {
    if (!user) {
      console.warn("User not logged in");
      navigate("/login");
      return;
    }

    const newQuiz = {
      ...formData,
      id: Date.now(), // unique ID
      createdAt: new Date().toISOString(),
    };

    setQuizzes(prev => [...prev, newQuiz]);

    // Clear form
    setFormData({
      title: '',
      questions: '',
      timer: '',
      difficulty: '',
    });

    navigate("/"); // redirect if needed
    // console.log("New quiz saved:", newQuiz);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        setQuizzes,
        formData,
        setFormData,
        handleChange,
        handleCreateQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
