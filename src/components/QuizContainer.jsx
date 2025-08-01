import React, { useState } from "react";
import QuizCard from "./QuizCard";
import QuizDetails from "./QuizDetails";
import CreateQuizCard from "./CreateQuizCard";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext"; 

const QuizContainer = () => {

const { user } = useAuth();
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(false);

  const handleViewQuiz = () => {
    setShowQuizDetails(prev => !prev);
    console.log(showQuizDetails);
  };

  const handleClose = () => {
    setShowQuizDetails(prev => !prev);
  }

  const handleCreateQuiz = () => {
    setCreateQuiz(prev => !prev);

  }

  return (
    <>
      <div className="w-full h-screen mt-6 px-4 flex flex-col ">
         
         {/* Header with Title and UserProfile */}
        <div className="w-full pt-5 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome back, {user.name}
          </h1>
          <div id="User_account">
            <UserProfile />
          </div>
        </div>

        {/* Create Button  */}
        <div className="mt-10 mb-5">
          <button
            onClick={handleCreateQuiz}
            className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition">
            + Create Quiz
          </button>
        </div>

        {/* Demo Quiz Card */}

        {createQuiz ? <CreateQuizCard /> : (<div
          id="Quiz_Container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >

          <QuizCard onView={handleViewQuiz} />
          <QuizCard onView={handleViewQuiz} />
          <QuizCard onView={handleViewQuiz} />
          <QuizCard onView={handleViewQuiz} />

          {showQuizDetails && <QuizDetails onClose={handleClose} />}

        </div>)}


      </div>
    </>
  );
}

export default QuizContainer;