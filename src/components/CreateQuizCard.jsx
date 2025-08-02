import { FaPen, FaHashtag, FaClock, FaSignal } from "react-icons/fa";
import { quizAuth } from "../context/QuixContext";
// import { useState } from "react";

const CreateQuizCard = () => {
  const {formData,handleChange,handleCreateQuiz} = quizAuth();
  

  
  return (
    <div className="w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        🎯 Create Your Quiz
      </h2>

      {/* Quiz Title */}
      <div className="flex items-center space-x-3">
        <FaPen className="text-blue-600 text-lg" />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e)=>handleChange(e)}
          placeholder="Quiz Title"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Number of Questions */}
      <div className="flex items-center space-x-3">
        <FaHashtag className="text-green-600 text-lg" />
        <input
          type="number"
          name="questions"
          value={formData.questions}
          onChange={(e)=>handleChange(e)}
          min="1"
          placeholder="Number of Questions (e.g., 10)"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Timer */}
      <div className="flex items-center space-x-3">
        <FaClock className="text-yellow-600 text-lg" />
        <input
          type="number"
          name="timer"
          value={formData.timer}
          onChange={(e)=>handleChange(e)}
          placeholder="Time Limit (in minutes)"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Difficulty Level */}
      <div className="flex items-center space-x-3">
        <FaSignal className="text-purple-600 text-lg" />
        <select
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          name="difficulty"
          value={formData.difficulty}
          onChange={(e)=>handleChange(e)}

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
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300">
        🚀 Create Quiz
      </button>
    </div>
  );
};

export default CreateQuizCard;
