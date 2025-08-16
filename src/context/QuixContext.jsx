import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import callGemini from "../api/callGemini";

const QuizContext = createContext();
export const quizAuth = () => useContext(QuizContext);

const QuizProvider = ({ children }) => {
  const { user, setUser } = useAuth();   // ⬅ we need setUser here
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);
  const [quizzes, setQuizzes] = useState([]); // quizzes for this user only
  const [formData, setFormData] = useState({
    title: "",
    questions: "",
    timer: "",
    difficulty: "",
  });

  // 🔁 Load quizzes for this user
  useEffect(() => {
    if (user) {
      const allQuizzes = JSON.parse(localStorage.getItem("brainburst_quizzes")) || [];
      const userQuizzes = allQuizzes.filter(q => q.owner === user.email);
      setQuizzes(userQuizzes);
    } else {
      setQuizzes([]);
    }
  }, [user]);

  // 🖊 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Create and save new quiz for current user
  const handleCreateQuiz = () => {
    if (!user) {
      console.warn("User not logged in");
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

    // --- Save quiz globally ---
    const allQuizzes = JSON.parse(localStorage.getItem("brainburst_quizzes")) || [];
    allQuizzes.push(newQuiz);
    localStorage.setItem("brainburst_quizzes", JSON.stringify(allQuizzes));

    // --- Update user object with this quizId ---
    const savedUsers = JSON.parse(localStorage.getItem("brainburst_users")) || [];
    const updatedUsers = savedUsers.map((u) => {
      if (u.email === user.email) {
        return {
          ...u,
          userQuizIds: [...(u.userQuizIds || []), quizId],
        };
      }
      return u;
    });
    localStorage.setItem("brainburst_users", JSON.stringify(updatedUsers));

    // --- Update current user in context + storage ---
    const updatedUser = {
      ...user,
      userQuizIds: [...(user.userQuizIds || []), quizId],
    };
    setUser(updatedUser);
    localStorage.setItem("brainburst_user", JSON.stringify(updatedUser));

    // --- Update state ---
    setQuizzes((prev) => [...prev, newQuiz]);

    // Clear form
    setFormData({
      title: "",
      questions: "",
      timer: "",
      difficulty: "",
    });

    navigate("/");
  };

  // ▶ Start quiz by fetching AI data
  const handleStartQuiz = async (quiz) => {
    if (quiz) {
      const { title, questions, difficulty ,timer} = quiz;
      const data = await callGemini(title, questions, difficulty,timer);
      setQuizData(data);
      navigate("/quiz", { state: { data } });
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,          // quizzes for current user only
        formData,
        setFormData,
        handleChange,
        handleCreateQuiz,
        handleStartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
