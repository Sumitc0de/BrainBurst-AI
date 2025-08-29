import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const createTopic = async (topic) => {

//     const prompt = `You are a topic generator. Given a title,Return only a valid JSON array of strings using double quotes (") and no extra text, markdown, or explanation. 
// Rules:
// - Output must be a JS array of strings.
// - No explanations, no keys/objects, no code fences, no trailing commas, no extra text.
// - Keep topics concise and beginner-friendly.

// Title: ${topic}


// `;

const prompt = `
You are a subtopic generator.

Given a single Title, return ONLY a valid JSON array of strings (double quotes). 
STRICT RULES:
- Output must be a JSON array of strings (e.g., ["...", "..."]).
- No objects, no keys, no headings, no prose, no code fences, no trailing commas.
- Keep each subtopic concise (2–6 words), beginner-friendly, and specific.
- No duplicates. No numbers or bullets. No emojis.
- Cover fundamentals, core concepts, common tasks, best practices, and tooling.
- Include at least 12 and at most 20 subtopics.

Title: ${topic}
`;


    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log(response.text.split);

   return response.text
  .replace(/```json/g, "")
  .split(",")
  .map(item => item.trim().replace(/["[\]$]/g, ""));

}

export default createTopic;