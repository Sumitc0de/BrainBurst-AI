import { useState, useEffect } from "react";
import { NavLink, Outlet,  useParams  } from "react-router-dom";
import createTopic from "../../api/createTopic";


const LearnDetailPage = () => {
  const { title } = useParams();
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen,setIsOpen] = useState(false);



  useEffect(() => {
    // Check Local Storage first
    const localData = localStorage.getItem(`topic_${title}`);
    // console.log(title)
    
    if (localData) {
      setTopicData(JSON.parse(localData));
      setLoading(false);
    } else {
      const fetchAndSetData = async () => {
        try {
          const data = await createTopic(title);
          setTopicData(data || []);
          localStorage.setItem(`topic_${title}`, JSON.stringify(data || []));
        } catch (err) {
          console.error("Error fetching topic data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchAndSetData();
    }
  }, [title]);

if (loading)
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-4">
      <span className="text-2xl md:text-5xl text-center text-blue-500 font-extrabold animate-bounce">
        🚀 Launching your learning material..
      </span>
      <p className="text-center text-gray-300 text-lg">
        Hold tight! Knowledge is on its way.
      </p>
    </div>
  );

  if (!topicData.length) return <div>No data available</div>;

 return (
  <div className="bg-white flex flex-col justify-between p-2 sm:p-4 w-full min-h-screen">
    {/* Topics (always visible at top, flex-wrap style) */}
    <div className="mt-15 md:mt-0 w-full bg-gray-50 p-3 flex flex-wrap gap-2 rounded-md shadow-sm  z-10">
      {/* Mobile header with Show/Hide button */}
      <div className="w-full sm:hidden  h-fit  flex items-center justify-between">
        <p className="text-lg font-semibold">Topics</p>
        <button
          className="px-2 bg-white rounded-lg shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>

      {/* Topic list */}
      <div
        className={`w-full flex gap-2 flex-wrap transition-all duration-300
          ${isOpen ? "h-auto opacity-100 mt-2" : "h-0 opacity-0 overflow-hidden sm:h-auto sm:opacity-100 sm:mt-2"}
        `}
      >
        {topicData.map((item, index) => (
          <NavLink
            key={index}
            to={`/learn/${title}/` + item.toLowerCase().replace(/\s+/g, "-")}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-semibold transition cursor-pointer shadow-sm
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </div>
    </div>

    <div className="mt-6">
      {/* Pass topicData to nested routes using Outlet context */}
      <Outlet context={{ topicData }} />
    </div>

    {/* Footer */}
          <div className="md:hidden py-4 text-center text-sm text-gray-400">
            © 2025 BrainBurst AI. All rights reserved.
            & developed by Sumit Vishwakarma
          </div>
  </div>
);

};

export default LearnDetailPage;
