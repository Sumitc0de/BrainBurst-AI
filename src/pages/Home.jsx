import MenuSection from "../components/MenuSection";
import QuizContainer from "../components/QuizContainer";

function Home() {
 return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <MenuSection />

      {/* Main Content */}
      <QuizContainer />
    </div>
  );
};


export default Home;
