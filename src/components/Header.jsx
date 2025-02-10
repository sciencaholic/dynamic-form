import React from "react";
// import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
          <span className="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=x6CQfeRfB5TZ&format=png&color=000000"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Dynamic Form Generator
            </span>
          </span>
          {/* TODO: got issues with tailwindcss, postcss & vite with them - need more time to debug */}
          {/* <div className="flex items-center">
            <ThemeToggleButton />
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;