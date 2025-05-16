import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext(null);

// Provider Component
export const AuthProvider = ({ children }) => {
  // Load initial state from localStorage
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return token && user ? { token, user: JSON.parse(user) } : null;
  });

  // Save to localStorage on authData change
  useEffect(() => {
    if (authData) {
      localStorage.setItem("token", authData.token);
      localStorage.setItem("user", JSON.stringify(authData.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [authData]);

  // Login function
  const login = (data) => {
    setAuthData(data);
  };

  // Logout function
  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
