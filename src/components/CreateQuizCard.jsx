import { FaPen, FaHashtag, FaClock, FaSignal } from "react-icons/fa";
import { quizAuth } from "../context/QuixContext";
// import { useState } from "react";

const CreateQuizCard = () => {
  const {formData,handleChange,handleCreateQuiz} = quizAuth();
  

  
return (
  <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-8">
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-4 md:p-8 space-y-6">
      
      {/* Header */}
      <h2 className="text-2xl w-full md:text-4xl font-extrabold text-gray-800 text-center">
        🎯 Create Your Quiz
      </h2>

      {/* Quiz Title */}
      <div className="flex flex-row items-center md:space-x-3 space-y-3 md:space-y-0">
        <FaPen className="hidden md:block
         text-blue-600 text-2xl md:text-3xl" />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Quiz Title"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Number of Questions */}
      <div className="flex flex-row  items-center md:space-x-3 space-y-3 md:space-y-0">
        <FaHashtag className="hidden md:block text-green-600 text-2xl md:text-3xl" />
        <input
          type="number"
          name="no_questions"
          value={formData.no_questions}
          onChange={handleChange}
          min="1"
          placeholder="Number of Questions (e.g., 10)"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      {/* Timer */}
      <div className="flex flex-row items-center md:space-x-3 space-y-3 md:space-y-0">
        <FaClock className="hidden md:block text-yellow-600 text-2xl md:text-3xl" />
        <input
          type="number"
          name="timer"
          value={formData.timer}
          onChange={handleChange}
          placeholder="Time Limit (in minutes)"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
      </div>

      {/* Difficulty Level */}
      <div className="flex flex-row  items-center md:space-x-3 space-y-3 md:space-y-0">
        <FaSignal className="hidden md:block text-purple-600 text-2xl md:text-3xl" />
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="">Select Difficulty Level</option>
          <option value="easy">🟢 Easy</option>
          <option value="medium">🟡 Medium</option>
          <option value="hard">🔴 Hard</option>
        </select>
      </div>

      {/* Create Quiz Button */}
      <button
        onClick={handleCreateQuiz}
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-shadow shadow-md"
      >
        🚀 Create Quiz
      </button>
    </div>
  </div>
);


};

export default CreateQuizCard;
