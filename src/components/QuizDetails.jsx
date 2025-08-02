const QuizDetails = ({ onClose,quiz }) => {
console.log(quiz);
    return (
        <div className="w-full h-screen absolute top-0 left-0 z-50 bg-[#000000ad] flex items-center justify-center">
            <div className="max-w-3xl w-full mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        📝 {quiz.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white hover:bg-red-500 transition-colors duration-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
                        aria-label="Close"
                        title="Close"
                    >
                        ×
                    </button>
                </div>



                {/* Quiz Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700 text-sm">
                    <div>
                        <span className="font-semibold">📌 Number of Questions: </span>
                        {quiz.questions}
                    </div>
                    <div>
                        <span className="font-semibold">⏱ Total Time: </span>
                        {quiz.timer} mins
                    </div>
                    <div>
                        <span className="font-semibold">🧮 Total Marks: </span>
                        {quiz.questions * 10}
                    </div>
                </div>

                {/* Question List */}
                {/* <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">📋 Questions Preview:</h3>
                    <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                        {quiz.questions.map((q, idx) => (
                            <li key={idx}>{q.question}</li>
                        ))}
                    </ul>
                </div> */}

                {/* Start Quiz Button */}
                <div className="flex justify-end">
                    <button className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
                        🚀 Start Quiz
                    </button>
                </div>
            </div>
        </div>

    );
};

export default QuizDetails;
