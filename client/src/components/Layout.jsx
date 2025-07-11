import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Layout now accepts 'theme' and 'setTheme' props
export default function Layout({ children, theme, setTheme }) {
  return (
    // Apply the current theme class to the outermost div
    <div className={`flex flex-col min-h-screen font-sans ${theme === 'dark' ? 'bg-web3-dark-bg bg-premium-dark text-web3-text-primary' : 'bg-light-web3-dark-bg bg-light-premium-dark text-light-web3-text-primary'}`}>
      {/* Top Navigation - Pass theme and setTheme to Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Main Content */}
      <main className="flex-grow w-full py-0">
        {children}
      </main>

      {/* Footer Section */}
      <Footer theme={theme} /> {/* Pass theme to Footer if it needs to adapt */}
    </div>
  );
}