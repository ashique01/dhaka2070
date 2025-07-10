import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Importing icons
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const { pathname } = useLocation();

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" }, 
];

  return (
    <nav className="sticky top-0 z-50 bg-web3-dark-bg text-web3-text-primary border-b border-web3-border shadow-md backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo with Glitch Effect */}
        <Link
          to="/"
          className="text-3xl lg:text-4xl font-black font-futuristic tracking-wide relative inline-block group"
        >
          <span className="relative z-10 text-web3-accent-blue transition-colors duration-300 group-hover:text-web3-accent-purple">
            Dhaka <span className="text-web3-accent-purple group-hover:text-web3-accent-blue">2070</span>
          </span>
          {/* Glitch effects for visual flair */}
          <span
            className="absolute top-0 left-0 w-full h-full text-web3-accent-blue opacity-0 animate-glitch-1"
            aria-hidden="true"
          >
            Dhaka 2070
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full text-web3-accent-purple opacity-0 animate-glitch-2"
            aria-hidden="true"
          >
            Dhaka 2070
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 sm:gap-8 text-sm sm:text-base font-semibold">
          {navLinks.map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                aria-current={pathname === link.to ? "page" : undefined}
                className={`transition duration-300 ${
                  pathname === link.to
                    ? "text-web3-accent-blue" // Active link color
                    : "text-web3-text-secondary hover:text-web3-accent-purple" // Inactive link color with hover
                }`}
              >
                {link.name}
              </Link>
              {/* Underline effect on hover/active */}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-web3-accent-purple transition-transform duration-300 origin-left ${pathname === link.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-web3-accent-blue hover:text-web3-accent-purple text-3xl focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-web3-dark-bg text-web3-text-primary
                     border-l border-web3-border shadow-2xl transform
                     ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
                     transition-transform duration-500 ease-in-out z-50 md:hidden`}
        role="dialog"
        aria-modal="true" // Indicate it's a modal dialog
        aria-label="Mobile menu"
      >
        <div className="p-6 pt-10 flex flex-col h-full justify-between">
          <div>
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-web3-accent-blue text-3xl focus:outline-none"
              aria-label="Close menu"
            >
              <HiX />
            </button>

            <ul className="flex flex-col gap-6 text-lg font-futuristic">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={toggleMobileMenu} // Close menu on link click
                    className={`block py-2 border-b border-web3-border transition-colors duration-300 ${
                      pathname === link.to
                        ? "text-web3-accent-blue"
                        : "hover:text-web3-accent-purple text-web3-text-secondary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="text-sm text-web3-text-secondary pt-6 font-mono">
                ⚙ System Status: <span className="text-web3-accent-green">LIVE</span>
              </li>
            </ul>
          </div>

          {/* Sidebar Footer */}
          <footer className="text-xs text-web3-text-secondary border-t border-web3-border pt-4 font-mono">
            <p>&copy; 2070 CyberGrid</p>
            <p className="mt-1 text-web3-text-secondary">Quantum Core Secured</p>
          </footer>
        </div>
      </aside>
    </nav>
  );
}