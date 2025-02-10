import React from "react";
import './App.css'

// import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import FormSection from "./components/form/FormSection";

function App() {
  return (
    /* TODO: got issues with tailwindcss, postcss & vite with them - need more time to debug */
    // <ThemeProvider>
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <main className="flex-1 w-full pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <FormSection />
          </div>
        </main>
      </div>
    // </ThemeProvider>
  );
}

export default App;