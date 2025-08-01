
const QuizCard = ({onView}) => {
   
    return (
        <>
            {/* Quiz Card  */}
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Science Basics Quiz
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                    10 Questions · 8 mins
                </p>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-green-600 font-medium">Published</span>
                    <button className="text-xs px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
                    onClick={onView}
                    >
                        View
                    </button>
                </div>
            </div>

        </>
    );

}

export default QuizCard;