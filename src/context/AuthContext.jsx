import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const STORAGE_KEYS = {
  users: "brainburst_users",
  currentUser: "brainburst_user",
};

const AuthProvider = ({ children }) => {  // authentication context provider
  const [user, setUser] = useState(null);

  //  Load current user on initial mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Signup
  const signup = (name, email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];

    if (savedUsers.some((u) => u.email === email)) return false; // user exists

    const newUser = { name, email, password};   // creating new user
    const updatedUsers = [...savedUsers, newUser];                // update the newUser by creating a temp savedUser

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(newUser));
    setUser(newUser);

    return true;
  };

  // Login
  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];
    const existingUser = savedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) return false;

    setUser(existingUser);
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(existingUser));
    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
