import React, { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark"
  );

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    localStorage.setItem("color-theme", newDarkMode ? "dark" : "light");
    setDarkMode(newDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      {darkMode ? (
        <svg
          id="theme-toggle-dark-icon"
          className="mx-2 h-6 w-6"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg
          id="theme-toggle-light-icon"
          className="mx-2 h-6 w-6"
          fill="yellow"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      )}

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          defaultValue=""
          className="peer sr-only"
          onClick={handleDarkMode}
        />
        <div className="peer  h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-900 dark:peer-focus:ring-blue-800" />
      </label>
    </>
  );
};

export default ThemeToggleButton;
