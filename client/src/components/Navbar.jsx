import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
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
        {/* Brand Logo */}
        <Link to="/" className="text-3xl font-black font-futuristic tracking-wide text-web3-accent-blue">
          Dhaka <span className="text-web3-accent-purple">2070</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`transition duration-300 ${
                  pathname === link.to
                    ? "text-web3-accent-blue"
                    : "text-web3-text-secondary hover:text-web3-accent-purple"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-full border border-web3-border bg-web3-card text-web3-accent-blue hover:text-web3-accent-purple shadow-md"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-web3-card text-web3-text-primary border-t border-web3-border animate-fade-in">
          <ul className="flex flex-col gap-4 px-6 py-4 text-base font-semibold">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 transition-colors ${
                    pathname === link.to
                      ? "text-web3-accent-blue"
                      : "hover:text-web3-accent-purple text-web3-text-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="text-xs text-web3-text-secondary pt-4 font-mono">
              ⚙ System Status: <span className="text-web3-accent-green">LIVE</span>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
