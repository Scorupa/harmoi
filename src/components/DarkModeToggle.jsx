import React, { useState, useEffect } from "react";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  return (
    <div className="dark-mode-toggle">
      <span className="toggle-text">Light Mode</span>
      <span>🌞</span>

      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <span className="slider"></span>
      </label>

      <span className="toggle-text">Dark Mode</span>
      <span>🌙</span>
    </div>
  );
};

export default DarkModeToggle;
