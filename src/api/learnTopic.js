// import { GoogleGenAI } from '@google/genai';

// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// // JSONBin.io config
// const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;         // Your JSONBin ID
// const MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY; // Your JSONBin Master Key
// const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// // Fetch existing topics array from JSONBin
// // Fetch existing topics array from JSONBin
// const fetchExistingData = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/latest`, {
//       headers: { "X-Master-Key": MASTER_KEY }
//     });
//     const data = await res.json();

//     // ensure it's always an array
//     if (Array.isArray(data.record)) return data.record;
//     return [];
//   } catch (err) {
//     console.error("❌ Error fetching JSONBin data:", err);
//     return [];
//   }
// };

// // Save updated array back to JSONBin
// const saveData = async (array) => {
//   try {
//     const res = await fetch(BASE_URL, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Master-Key": MASTER_KEY
//       },
//       body: JSON.stringify(array)
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("❌ Error saving to JSONBin:", err);
//     return null;
//   }
// };

// // Main function
// const learnTopic = async (topicName, title) => {
//   try {
//     // 1️⃣ Fetch all topics already stored
//     const existingData = await fetchExistingData();

//     // 2️⃣ Check if topic already exists in collection
//   // 2️⃣ Check if topic already exists in collection
// const found = existingData.find(
//   (item) =>
//     item?.topic &&
//     item.topic.toLowerCase() === topicName.toLowerCase()
// );


//     if (found) {
//       console.log("✅ Found in JSONBin:", found.topic);
//       return found; // return existing content, no AI call
//     }

//     // 3️⃣ Not found → generate new content
//     console.log("⚠️ Not found in JSONBin. Generating via AI...");
//       const prompt = `
// Generate a well-structured learning content for the topic: "${topicName}".
// The content should be strictly related to the topic: "${topicName}".
// Return the response ONLY in valid JSON format, like this:

// {
//   "topic": "${topicName}",
//   "introduction": "... (you may use Markdown like **bold**, *italic*, \`inline code\` inside values) ...",
//   "detailedExplanation": "...",
//   "codeExamples": ["..."],
//   "useCases": ["...", "..."],
//   "goodPractices": ["...", "..."],
//   "conclusion": "..."
// }

// Use markdown formatting for all attributes like in the example above.
// Do not include \`\`\` fences, headings, or extra text outside JSON.
// Make sure that codeExamples is an array of strings, each string being a code snippet.
// Make sure the JSON is properly formatted with no extra text, no markdown, no explanation.
// The topic for which content is to be generated is: "${title}".
// `;


//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash-001",
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const rawText = response.candidates[0].content.parts[0].text;
//     const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
//     const newTopic = JSON.parse(cleaned);

//     // 4️⃣ Append new topic → don’t replace
//     const updatedArray = [...existingData, newTopic];
//     await saveData(updatedArray);

//     console.log("✅ Saved new topic to JSONBin:", newTopic.topic);
//     return newTopic;
//   } catch (error) {
//     console.error("❌ Error in learnTopic:", error);
//     return null;
//   }
// };

// export default learnTopic;


import { fetchExistingData, saveData } from "./jsonbin";
import { generateContent } from "./aiGenerator";

// ✅ Orchestrator
const learnTopic = async (topicName, title) => {
  try {
    // 1. Fetch existing topics
    const existingData = await fetchExistingData();

    // 2. Check if topic exists
    const found = existingData.find(
      (item) =>
        item?.topic &&
        item.topic.toLowerCase() === topicName.toLowerCase()
    );

    if (found) {
      console.log("📂 Found in JSONBin:", found);
      return found;
    }

    // 3. Not found → Generate with AI
    console.log("⚠️ Not found, generating...");
    const newData = await generateContent(topicName, title);

    // 4. Save back
    const updatedArray = [...existingData, newData];
    await saveData(updatedArray);

    console.log("✅ New topic saved:", newData);
    return newData;
  } catch (err) {
    console.error("❌ Error in learnTopic:", err);
    return null;
  }
};

export default learnTopic;
