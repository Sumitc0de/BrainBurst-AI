import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ✅ Generate new topic content
export const generateContent = async (topic, title) => {
  const prompt = `
Generate a well-structured learning content for the topic: "${topic}".
The content should be strictly related to the topic: "${topic}".
Return the response ONLY in valid JSON format, like this:

{
  "topic": "${topic}",
  "introduction": "... (you may use Markdown like **bold**, *italic*, \`inline code\` inside values) ...",
  "detailedExplanation": "...",
  "codeExamples": ["..."],
  "useCases": ["...", "..."],
  "goodPractices": ["...", "..."],
  "conclusion": "..."
}

Use markdown formatting for all attributes like in the example above.
Do not include \`\`\` fences, headings, or extra text outside JSON.
Make sure that codeExamples is an array of strings, each string being a code snippet.
Make sure the JSON is properly formatted with no extra text, no markdown, no explanation.
The topic for which content is to be generated is: "${title}".
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const rawText = response.candidates[0].content.parts[0].text;
  const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

  return JSON.parse(cleaned);
};
