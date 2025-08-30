import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Init Gemini client
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

// Difficulty + Timer rules
const difficulties = ["Easy", "Medium", "Hard"];
const timerRules = {
  Easy: 1,   // minutes
  Medium: 2,
  Hard: 3,
};

async function createQuiz(title) {
  // Randomize number of questions
  const numQuestions = Math.random() > 0.5 ? 10 : 5;
  // Random difficulty
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  // Timer based on difficulty
  const timer = timerRules[difficulty];

  const prompt = `
Generate a quiz on the topic "${title}".
- Number of questions: ${numQuestions}
- Difficulty: "${difficulty}"

Each question should include:
1. "question": a question statement
2. "options": exactly 4 possible answers
3. "correctAnswer": the correct answer from those options

Return the entire quiz as a single JSON object with the following structure:

{
  "id": "<unique_quiz_id>",
  "title": "${title}",
  "difficulty": "${difficulty}",
  "timer": "${timer}", // default timer in minutes
  "questions": [
    {
      "question": "What is ...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B"
    }
  ]
}

Rules:
- The "id" field must be a unique identifier (UUID or alphanumeric string).
- Try to create new quiz every TIME.
- Only return valid JSON (no extra text).
`;

  try {
    // Ask Gemini
    const response = await ai
      .getGenerativeModel({ model: "gemini-2.0-flash-001" })
      .generateContent(prompt);

    // Extract AI response text
    const rawText = response.response.candidates[0].content.parts[0].text;

    // Extract only JSON
    const jsonString = rawText.trim().match(/\{[\s\S]*\}/)?.[0];
    const quizData = jsonString ? JSON.parse(jsonString) : null;

    return quizData;
  } catch (error) {
    console.error("❌ Gemini Quiz Error:", error);
    return null;
  }
}

export default createQuiz;
