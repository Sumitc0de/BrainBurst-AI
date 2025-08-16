import MenuSection from "../components/MenuSection";
import QuizContainer from "../components/QuizContainer";

function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar / Menu */}
      <MenuSection />

      {/* Main Content */}
        <QuizContainer />
    </div>
  );
}

export default Home;
