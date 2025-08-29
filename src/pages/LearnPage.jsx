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
        <div className="mt-12 sm:mt-0 md:w-[80vw] h-fit px-4 py-4 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-wide">
            Start Your Learning Journey 🚀
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Explore topics, learn step by step, and practice with quizzes at the same place.
          </p>

          <br />
          <br />

          {/* Basic Web Development */}
          <h2 className="pl-1 text-xl md:text-2xl font-bold text-gray-
800 mb-4">Basic Web Development</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
            {/* Render Basic Web Development Topics */}
            {webDevTopics.basic.map((topic, index) => (
              <Card key={index} topic={topic}   onView={() => { handleView(topic) }} />
              
            ))}
          </div>

          <h2 className="pl-1 text-xl md:text-2xl mt-6 font-bold text-gray-
800 mb-4">Advanced HTML & CSS</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
            {/* Render Advanced HTML & CSS Topics */}
            {webDevTopics.advanced_html_css.map((topic, index) => (
              <Card key={index} topic={topic} onView={() => { handleView(topic) }} />
            ))}
          </div>

          <h2 className="pl-1 text-xl md:text-2xl mt-6 font-bold text-gray-
800 mb-4">JavaScript</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
            {/* Render JavaScript Topics */}
            {webDevTopics.javascript.map((topic, index) => (
              <Card key={index} topic={topic}  onView={() => { handleView(topic) }} />
            ))}

            
          </div>

         {/* Footer (mobile only) */}
      <div className="md:hidden pt-2 w-full text-center text-sm text-gray-400">
         © 2025 BrainBurst AI. All rights reserved.
            & developed by Sumit Vishwakarma
      </div>

        </div>
       

        
    </>
  );
}
export default LearnPage;