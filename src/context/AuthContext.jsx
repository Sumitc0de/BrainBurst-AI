import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On initial load, check if user is in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("brainburst_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (name, email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("brainburst_users")) || [];

    // If user already exists
    if (savedUsers.find(u => u.email === email)) return false;

    const newUser = { name, email, password };
    savedUsers.push(newUser);

    localStorage.setItem("brainburst_users", JSON.stringify(savedUsers));
    localStorage.setItem("brainburst_user", JSON.stringify(newUser));

    setUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("brainburst_users")) || [];
    const existingUser = savedUsers.find(u => u.email === email && u.password === password);

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("brainburst_user", JSON.stringify(existingUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("brainburst_user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
