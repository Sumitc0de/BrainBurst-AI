// import createTopic from "../api/createTopic";
// import learnTopic from "../api/learnTopic";
import Card from "../components/learnPage/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const webDevTopics = {
  basic: [
    "HTML Basics",
    "CSS Basics",
    "JavaScript Basics",
  ],
  advanced_html_css: [
    "Forms and Validation",
    "Semantic HTML",
    "CSS Flexbox",
    "CSS Grid",
    "Responsive Design",
    "CSS Animations ",
    "Tailwind CSS",
  ],
  javascript: [
    "DOM Manipulation",
    "ES6+ Features",
    "Events ",
    "Promises & Async/Await",
    "Modules & Bundling",
    "Error Handling",
    "LocalStorage",
  ],
  frameworks: [
    "React Basics",
    "State & Props",
    "React Router",
    "Hooks (useState, useEffect)",
    "Component Lifecycle",
    "Context API",
    "Next.js Basics",
    "SSR vs SSG",
    "API Routes in Next.js",
  ],
};


const LearnPage = () => {
  const navigate = useNavigate();

  const handleView = async (topic) => {
    // console.log(`Viewing topic: ${topic}`);

    // Convert to lowercase + replace spaces with "-"
  const topicSlug = topic.toLowerCase().replace(/\s+/g, "-");
  navigate(`/learn/${topicSlug}` , { state: { topic } });
};



  return (
    <>
      <>
  <div className="w-full min-h-screen px-6 py-10 bg-gradient-to-b from-indigo-50 to-white flex flex-col">
    {/* Page Title */}
    <h1 className="mt-10 md:mt-0 text-3xl md:text-4xl font-extrabold text-indigo-700 mb-4">
      Start Your Learning Journey 🚀
    </h1>
    <p className=" md:text-xl text-gray-600 mb-12 max-w-3xl">
      Explore topics, learn step by step, and practice with quizzes all in one place.
    </p>

    {/* Basic Web Development Section */}
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 relative inline-block">
        Basic Web Development
        <span className="absolute left-0 -bottom-1 w-20 h-1 bg-indigo-400 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {webDevTopics.basic.map((topic, index) => (
          <Card key={index} topic={topic} onView={() => handleView(topic)} />
        ))}
      </div>
    </section>

    {/* Advanced HTML & CSS Section */}
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 relative inline-block">
        Advanced HTML & CSS
        <span className="absolute left-0 -bottom-1 w-20 h-1 bg-indigo-400 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {webDevTopics.advanced_html_css.map((topic, index) => (
          <Card key={index} topic={topic} onView={() => handleView(topic)} />
        ))}
      </div>
    </section>

    {/* JavaScript Section */}
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 relative inline-block">
        JavaScript
        <span className="absolute left-0 -bottom-1 w-20 h-1 bg-indigo-400 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {webDevTopics.javascript.map((topic, index) => (
          <Card key={index} topic={topic} onView={() => handleView(topic)} />
        ))}
      </div>
    </section>

    {/* Footer */}
    <div className="pt-6 w-full md:hidden text-center text-sm text-gray-400 md:mt-12">
      © 2025 BrainBurst AI. All rights reserved. Developed by Sumit Vishwakarma
    </div>
  </div>
</>

    </>
  );
}
export default LearnPage;