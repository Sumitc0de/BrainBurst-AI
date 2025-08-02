const GeminiPrompt = async (title, numQuestions, difficulty) => {
  const GEMINI_API_KEY = 'AIzaSyA5Tf6a_mAh_WyUeUUCL_5zwWzpBIWIElY';

  const prompt = `
Generate a quiz on the topic "${title}".
- Number of questions: ${numQuestions}
- Difficulty: "${difficulty}"

Each question should include:
1. A question statement
2. 4 options (labeled "A", "B", "C", "D")
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

Only return valid JSON. Do not include explanations or any extra text.
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    // Adjusted URL for Gemini 1.5 Flash model
  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    // console.log('Gemini response:', text);

    if (!text) throw new Error('No text response from Gemini.');

    // Try to extract the JSON cleanly
    const jsonString = text.trim().match(/\{[\s\S]*\}/)?.[0];

    if (!jsonString) throw new Error('Could not extract JSON from response.');

    const quizData = JSON.parse(jsonString);
    return quizData;

  } catch (err) {
    console.error('❌ Gemini quiz generation error:', err.message);
    return null;
  }
};

export default GeminiPrompt;
