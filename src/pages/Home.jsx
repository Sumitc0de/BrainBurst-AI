import { useState } from "react";
import MenuSection from "../components/MenuSection";
import QuizContainer from "../components/QuizContainer";

const Home = () => {  
  return (
    <>
      <div className="flex items-center justify-between w-full h-screen overflow-y-hidden">
          <MenuSection/>
          <QuizContainer />
      </div>
    </>
  );
};

export default Home;
