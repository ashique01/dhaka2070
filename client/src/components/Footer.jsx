import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-web3-dark-bg text-web3-text-secondary py-12 mt-24 overflow-hidden shadow-inner shadow-web3-shadow-deep">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#30363D" strokeWidth="0.3" /> {/* Using web3-border for grid lines */}
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top Separator Glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-web3-accent-blue to-transparent opacity-60 blur-sm" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-web3-accent-purple to-transparent opacity-50" />

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <p className="font-futuristic text-sm sm:text-base tracking-wide leading-relaxed text-web3-text-secondary">
          &copy; 2070 <span className="text-web3-accent-blue font-bold">Dhaka Futurism Project</span>
          <br className="sm:hidden" />
          <span className="inline-block mt-2">
            Built by{" "}
            <a
              href="https://github.com/Ashique01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-web3-accent-purple font-semibold hover:text-web3-accent-blue transition-colors duration-300 underline underline-offset-4"
            >
              Ashique Murad
            </a>{" "}
            🚀
          </span>
        </p>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-web3-accent-blue to-transparent opacity-30 blur-sm" />
    </footer>
  );
}