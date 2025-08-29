import createQuiz from "../api/createQuiz.js"; // AI function

// JSONBin details
const BIN_ID = import.meta.env.VITE_JSONBIN_QUIZ_ID; // <-- replace with your JSONBin ID
const API_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY; // <-- replace with your JSONBin API key
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Difficulty → Timer mapping
const difficultyTimerMap = {
  easy: 60,
  medium: 120,
  hard: 180,
};

// Helper randomizer
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 🔹 Fetch quizzes from JSONBin
export const fetchQuizzes = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { "X-Master-Key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    const data = await res.json();
    return data.record || [];
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return [];
  }
};

// 🔹 Save quizzes to JSONBin
export const saveQuizzes = async (quizzes) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(quizzes),
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Save error:", err);
  }
};

// 🔹 Generate quizzes for given topics (AI powered, only for missing ones)
export const generateQuizzes = async (topics, existing = []) => {
  const difficulties = ["easy", "medium", "hard"];
  let quizzes = [...existing];

  for (const [category, titles] of Object.entries(topics)) {
    for (const title of titles) {
      // Check if already exists
      const exists = quizzes.find(
  (q) => q?.title && q.title.toLowerCase() === title.toLowerCase()
);

      if (exists) continue; // skip AI call if already stored

      // Call AI for new quiz
      const aiQuiz = await createQuiz(title);
      const difficulty = getRandom(difficulties);
      const timer = difficultyTimerMap[difficulty];

      const quiz = {
        id: Math.floor(Math.random() * 1000000),
        category,
        title,
        difficulty,
        timer,
        questions: aiQuiz.questions || [],
      };

      quizzes.push(quiz);
    }
  }

  return quizzes;
};

// 🔹 Prepare quizzes: fetch if available, else generate+save
export const prepareQuizzes = async (topics) => {
  let stored = await fetchQuizzes();

  // Generate new ones for missing topics
  const updated = await generateQuizzes(topics, stored);

  // If new data added → save back
  if (updated.length > stored.length) {
    await saveQuizzes(updated);
  }

  return updated;
};
