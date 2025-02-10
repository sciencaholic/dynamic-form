import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// added ThemeContext to test ContextAPI
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme === "light" ? "bg-white" : "bg-gray-900";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen w-full ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);