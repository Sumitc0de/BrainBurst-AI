import { useState, useEffect } from "react";

const Card = ({ topic, onView }) => {
  const [topicLength, setTopicLength] = useState(0);

  useEffect(() => {
    const topicSlug = topic.toLowerCase().replace(/\s+/g, "-");
    const storedData = localStorage.getItem(`topic_${topicSlug}`);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTopicLength(parsedData.length);
    } else {
      setTopicLength(0);
    }
  }, [topic]); // runs whenever topic changes

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 border transition-transform hover:scale-[1.02] duration-200 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{topic}</h2>
   <p className="text-sm text-gray-500 mb-1">
  {topicLength === 0 ? "Create Topic" : `📋 ${topicLength} Topics`}
</p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-green-600 font-medium">
         {topicLength === 0 ? "Start Learning" : "Continue Learning"}
        </span>

        <button
          className="text-sm px-3 py-1 cursor-pointer border text-white bg-blue-600 border-gray-300 rounded-lg hover:scale-105 transition"
          onClick={onView}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
