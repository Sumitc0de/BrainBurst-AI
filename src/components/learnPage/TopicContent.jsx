import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import learnTopic from "../../api/learnTopic"; 
import ReactMarkdown from "react-markdown";

const TopicContent = () => {
  const { topic } = useParams();
  const location = useLocation();
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Convert "html-structure" → "HTML Structure"
  const topicName = topic
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Extract title from URL (e.g., "html-basics")
  const title = location.pathname.split('/')[2]; 
  // console.log("Topic Name:", topicName);

  useEffect(() => {
    const fetchTopicContent = async () => {
      setLoading(true);
      try {
        // ✅ 1. Try reading from backend first
        const res = await fetch(`http://localhost:8000/read/${topicName}`);   // Load from the backend 
        if (res.ok) {
          const data = await res.json();
          // console.log("✅ Loaded from backend:", data);
          setTopicData(data);
        } else if (res.status === 404) {                                       // Data not found , create it and save it
          // ✅ 2. If not found, call AI (learnTopic)
          console.log("⚠️ Not found in backend. Calling AI...");
          const data = await learnTopic(topicName,title);
          setTopicData(data);
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch (err) {
        console.error("❌ Error fetching topic:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicContent();
  }, [topicName]);  // changes when topicName is change


if (loading)
  return (
    <div className="h-[30vw] flex flex-col items-center justify-start mt-5 gap-4">
      <span className="text-2xl text-center sm:text-4xl text-blue-400 font-bold animate-pulse">
        🧠 Summoning AI brainpower… please wait!
      </span>
      <p className="text-center text-gray-300 text-lg">
        Fetching your topic content for an amazing learning experience.
      </p>
    </div>
  );

  if (!topicData) return <p className="text-red-400">Failed to load content.</p>;

  return (
    <>
    
    <div className="w-full  h-fit mx-auto p-4 md:p-6 bg-gray-800 flex flex-col justify-baseline rounded-xl shadow-lg text-gray-100 space-y-6 prose prose-invert">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-400">{topicData.topic}</h1>

      {/* Introduction */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Introduction</h2>
        <ReactMarkdown>{topicData.introduction}</ReactMarkdown>
      </section>

      {/* Detailed Explanation */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">
          Detailed Explanation
        </h2>
        <ReactMarkdown>{topicData.detailedExplanation}</ReactMarkdown>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Code Examples</h2>
        {Array.isArray(topicData.codeExamples) && topicData.codeExamples.length > 0 ? (
          topicData.codeExamples.map((example, index) => (
            <div key={index} className="mb-4">
              <pre className="bg-gray-900 text-yellow-400 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{example}</code>
              </pre>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No code examples available.</p>
        )}
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Use Cases</h2>
        <ReactMarkdown>
          {Array.isArray(topicData.useCases)
            ? topicData.useCases.map((point) => `- ${point}`).join("\n")
            : ""}
        </ReactMarkdown>
      </section>

      {/* Good Practices */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Good Practices</h2>
        <ReactMarkdown>
          {Array.isArray(topicData.goodPractices)
            ? topicData.goodPractices.map((point) => `- ${point}`).join("\n")
            : ""}
        </ReactMarkdown>
      </section>

      {/* Conclusion */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Conclusion</h2>
        <ReactMarkdown>
          {topicData.conclusion ? `- ${topicData.conclusion}` : ""}
        </ReactMarkdown>
      </section>
    </div>
  </>
  );
};

export default TopicContent;
