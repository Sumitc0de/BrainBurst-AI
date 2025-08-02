import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = 'AIzaSyDtqovwy-5qwkxddDfyN3YrMS8kpy19gAY';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function callGemini(title, numQuestions, difficulty) {
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
  "title": "${title}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "question": "What is ...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B"
    },
    ...
  ]
}

Only return valid JSON. Do not include explanations or any extra text.`
;
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  const text = response.text;
  const jsonString = text.trim().match(/\{[\s\S]*\}/)?.[0];  // safely extract JSON from text
const quizData = jsonString ? JSON.parse(jsonString) : null;

console.log(quizData);
}

export default callGemini;

