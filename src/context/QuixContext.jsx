import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import callGemini from "../api/callGemini";

const QuizContext = createContext();
export const quizAuth = () => useContext(QuizContext);

const QuizProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [quizData, setQuizData] = useState([]);
  const [quizzes, setQuizzes] = useState([]); // quizzes owned by this user
  const [formData, setFormData] = useState({
    title: "",
    questions: "",
    timer: 1,
    difficulty: "",
  });

  // 🔁 Load quizzes for logged-in user
  useEffect(() => {
    if (user) {
      const allQuizzes = JSON.parse(localStorage.getItem("brainburst_quizzes")) || [];
      setQuizzes(allQuizzes.filter((q) => q.owner === user.email));
    } else {
      setQuizzes([]);
    }
  }, [user]);

  // 🖊 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Create new quiz
  const handleCreateQuiz = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const quizId = `quiz_${Date.now()}`;
    const newQuiz = {
      ...formData,
      id: quizId,
      owner: user.email,
      createdAt: new Date().toISOString(),
    };

    // Save quiz globally
    const allQuizzes = JSON.parse(localStorage.getItem("brainburst_quizzes")) || [];
    allQuizzes.push(newQuiz);
    localStorage.setItem("brainburst_quizzes", JSON.stringify(allQuizzes));

    // Update user’s quiz IDs
    const savedUsers = JSON.parse(localStorage.getItem("brainburst_users")) || [];
    const updatedUsers = savedUsers.map((u) =>
      u.email === user.email
        ? { ...u, userQuizIds: [...(u.userQuizIds || []), quizId] }
        : u
    );
    localStorage.setItem("brainburst_users", JSON.stringify(updatedUsers));

    // Update logged-in user in context
    const updatedUser = {
      ...user,
      userQuizIds: [...(user.userQuizIds || []), quizId],
    };
    setUser(updatedUser);
    localStorage.setItem("brainburst_user", JSON.stringify(updatedUser));

    // Update state
    setQuizzes((prev) => [...prev, newQuiz]);

    // Reset form
    setFormData({
      title: "",
      questions: "",
      timer: "",
      difficulty: "",
    });
  alert("Quiz created successfully!");
navigate("/");

  };

  // ▶ Start quiz
  const handleStartQuiz = async (quiz) => {
    if (quiz) {
      const { title, questions, difficulty, timer } = quiz;
      const data = await callGemini(title, questions, difficulty, timer);
      setQuizData(data);
      navigate("/quiz", { state: { data, timer } });
    }
  };

  // 🗑 Delete quiz
  const handleDeleteQuiz = (quizId) => {
    // Remove from state
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);

    // Update global storage
    const allQuizzes = JSON.parse(localStorage.getItem("brainburst_quizzes")) || [];
    const newAllQuizzes = allQuizzes.filter((quiz) => quiz.id !== quizId);
    localStorage.setItem("brainburst_quizzes", JSON.stringify(newAllQuizzes));

  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        formData,
        setFormData,
        handleChange,
        handleCreateQuiz,
        handleStartQuiz,
        handleDeleteQuiz, 
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
