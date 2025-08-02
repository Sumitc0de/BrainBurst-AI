import CreateQuizCard from "../components/CreateQuizCard";
import MenuSection from "../components/MenuSection";


const CreateQuiz = () => {
    return (
        <>
            <div className="flex items-center justify-between w-full h-screen">
                <MenuSection />
               <CreateQuizCard />

            </div>
        </>
    );
}

export default CreateQuiz;