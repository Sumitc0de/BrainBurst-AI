// import { createContext, useContext, useState, useEffect } from "react";

// // Create context
// const ContentContext = createContext();

// // Hook for easy access
// export const useContent = () => useContext(ContentContext);

// export const ContentProvider = ({ children }) => {
//   const [topicData, setTopicData] = useState(() => {
//     // Load from localStorage initially
//     const saved = localStorage.getItem("topicData");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Save to localStorage whenever topicData changes
//   useEffect(() => {
//     localStorage.setItem("topicData", JSON.stringify(topicData));
//   }, [topicData]);

//   // Handler to update topic data
//   const updateTopicData = (data) => {
//     setTopicData(data || []);
//   };

//   return (
//     <ContentContext.Provider value={{ topicData, updateTopicData }}>
//       {children}
//     </ContentContext.Provider>
//   );
// };
