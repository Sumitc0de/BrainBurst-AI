import MenuSection from "../components/MenuSection";

const ExplorePage = () => {
  return(
    <>
     <div className="flex h-screen overflow-hidden">
      {/* Sidebar / Menu */}
      <MenuSection />

      {/* Main Content */}
       <div className="w-full h-screen px-4 py-4 flex flex-col overflow-y-scroll">
        <h1 className="text-2xl font-semibold mt-15 md:mt-0 text-gray-800 mb-6">
          Explore page   
        </h1>
       </div>
    </div>
    </>
  );
}
export default ExplorePage;