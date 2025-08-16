import MenuSection from "../components/MenuSection";

const AllQuizPage = () => {
  return(
    <>
     <div className="flex h-screen overflow-hidden">
      {/* Sidebar / Menu */}
      <MenuSection />

      {/* Main Content */}
       <div className="w-full h-screen px-4 py-4 flex flex-col overflow-y-scroll">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          All Quizzes page   
        </h1>
       </div>
    </div>
    </>
  );
}
export default AllQuizPage;