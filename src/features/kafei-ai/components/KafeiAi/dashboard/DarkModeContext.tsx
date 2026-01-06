import React, { useState, useEffect } from "react";
import { DarkModeContext } from "./darkModeContextDef";

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("dashboard-dark-mode");
    return saved ? JSON.parse(saved) : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem("dashboard-dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev);

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, setIsDarkMode, toggleDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
