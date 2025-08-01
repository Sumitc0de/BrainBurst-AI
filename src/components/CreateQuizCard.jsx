const CreateQuizCard = () => {

    return(
        <>
    
  <div className="bg-white p-8 w-full max-w-full">
 
    <form className="space-y-5">
      {/* Quiz Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Quiz Title
        </label>
        <input
          type="text"
          placeholder="Enter quiz title"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Number of Questions */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Number of Questions
        </label>
        <input
          type="number"
          placeholder="e.g. 10"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
        />
      </div>

      {/* Timer (in minutes) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Timer (minutes)
        </label>
        <input
          type="number"
          placeholder="e.g. 15"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
        />
      </div>

      {/* Difficulty Level */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Difficulty Level
        </label>
        <select
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
      >
        Create Quiz
      </button>
    </form>
  </div>
        </>
    );
}

export default CreateQuizCard;
