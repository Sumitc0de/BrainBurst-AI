import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function callGemini(title, numQuestions, difficulty, timer = 1) {
  const prompt = `
Generate a quiz on the topic "${title}".
- Number of questions: ${numQuestions}
- Difficulty: "${difficulty}"

Each question should include:
1. A question statement
2. 4 options 
3. The correct answer from those options

Return the entire quiz as a single JSON object with the following structure:

{
  "id": "<unique_quiz_id>",
  "title": "${title}",
  "difficulty": "${difficulty}",
  "timer": '${timer}', // default timer in minutes
  "questions": [
    {
      "question": "What is ...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B"
    },
    ...
  ]
}

- The "id" field must be a unique identifier for this quiz (for example, a UUID or a random alphanumeric string).
- Only return valid JSON. Do not include explanations or any extra text.`
    ;
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  const text = response.text;
  const jsonString = text.trim().match(/\{[\s\S]*\}/)?.[0];  // safely extract JSON from text
  const quizData = jsonString ? JSON.parse(jsonString) : null;

  // console.log(quizData);
  return quizData;
}

export default callGemini;

