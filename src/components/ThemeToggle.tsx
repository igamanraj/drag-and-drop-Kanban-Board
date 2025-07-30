// src/components/ThemeToggle.tsx
import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all"
    >
      <div
        className={`bg-white dark:bg-black w-6 h-6 rounded-full shadow-md transform transition-transform ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
