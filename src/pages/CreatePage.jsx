import QuizContainer from "../components/QuizContainer";
import MenuSection from "../components/MenuSection";


const CreatePage = () => {
    return (
        <>
            <div className="flex items-center justify-between w-full h-screen">
                <MenuSection />
                <QuizContainer />

            </div>
        </>
    );
}

export default CreatePage;