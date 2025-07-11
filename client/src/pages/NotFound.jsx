import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa"; // Importing an icon for error

export default function NotFound({ theme }) { // Add theme prop
  const currentYear = new Date().getFullYear();

  return (
    // The main div's background and primary text color are handled by Layout, so remove them here
    // This component is designed to be rendered OUTSIDE of the main Layout.
    <div className="relative min-h-screen flex flex-col justify-center items-center font-futuristic select-none overflow-hidden p-4
                    bg-web3-dark-bg text-web3-text-primary
                    light:bg-light-web3-dark-bg light:text-light-web3-text-primary">
      {/* Dynamic Background Layer (fixed, full screen, behind content) */}
      {theme === 'dark' && (
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-red)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-orange)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
      )}
      {theme === 'light' && (
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-colors-light-web3-accent-red)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-colors-light-web3-accent-orange)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
      )}

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-12 rounded-3xl border shadow-web3-glow-red max-w-lg w-full animate-fade-in-up-delay
                      bg-web3-card/70 backdrop-blur-md border-web3-accent-red/50
                      light:bg-light-web3-card/80 light:border-light-web3-accent-red/50 light:shadow-light-web3-glow-red">
        <FaExclamationTriangle className="text-8xl mb-8 animate-pulse-light drop-shadow-[0_0_20px_var(--web3-accent-red)]
                                       text-web3-accent-red
                                       light:text-light-web3-accent-red light:drop-shadow-[0_0_20px_var(--light-web3-accent-red)]" />

        {/* 404 Heading with Glitch Effect (conditional for dark mode) */}
        <h1 className="relative text-7xl md:text-8xl font-extrabold tracking-widest mb-6
                       text-web3-accent-red drop-shadow-[0_0_25px_rgba(231,76,60,0.8)]
                       light:text-light-web3-accent-red light:drop-shadow-[0_0_25px_rgba(200,50,50,0.8)]">
          <span className="relative z-10">ERROR 404</span>
          {/* Glitch overlays for visual flair (only visible in dark mode) */}
          {theme === 'dark' && (
            <>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full text-web3-accent-red opacity-0 animate-glitch-1"
                style={{ mixBlendMode: "screen" }}
              >
                ERROR 404
              </span>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full text-web3-accent-orange opacity-0 animate-glitch-2"
                style={{ mixBlendMode: "screen" }}
              >
                ERROR 404
              </span>
            </>
          )}
        </h1>

        <p className="text-xl md:text-2xl leading-relaxed mb-8 animate-fade-in delay-200
                      text-web3-text-secondary
                      light:text-light-web3-text-secondary">
          Quantum data stream interrupted. The requested zone could not be located.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center text-lg font-bold px-8 py-3 rounded-full shadow-web3-glow-blue hover:shadow-web3-glow-purple-strong transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-0.5 animate-fade-in delay-400
                     bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple text-web3-text-primary
                     light:from-light-web3-accent-blue light:to-light-web3-accent-purple light:text-light-web3-text-primary light:shadow-light-web3-glow-blue light:hover:shadow-light-web3-glow-purple-strong"
        >
          <span className="relative z-10">← Return to Quantum Hub</span>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
                           bg-web3-accent-orange
                           light:bg-light-web3-accent-orange"></span>
        </Link>
      </div>

      {/* Simple Footer (positioned absolutely at the bottom of this component) */}
      <footer className="absolute bottom-4 text-center text-sm py-4 relative z-10 animate-fade-in delay-600
                         text-web3-text-secondary/70
                         light:text-light-web3-text-secondary/70">
        <p>&copy; {currentYear} Dhaka 2070 Quantum Zones. All Rights Reserved.</p>
        <p className="mt-1">
          System integrity is our priority.
        </p>
      </footer>
    </div>
  );
}