import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaRecycle,
  FaUsers,
  FaMicrochip,
  FaShieldAlt,
  FaLightbulb,
  FaArrowUp,
  FaBuilding, // New icon for urban development
  FaHandshake, // New icon for collaboration
} from "react-icons/fa";
import { MdOutlineScience, MdSecurity } from "react-icons/md"; // MdSecurity already there, MdOutlineScience for tech

export default function About() {
  const topOfPageRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen w-full font-futuristic select-none text-web3-text-primary overflow-hidden bg-web3-dark-bg">
      {/* Top of Page Ref for Scroll-to-Top */}
      <div ref={topOfPageRef} className="absolute top-0 left-0 w-full h-px" />

      {/* Dynamic Background Layer (fixed, full screen, behind content) */}
      <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-blue)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={() => scrollToSection(topOfPageRef)}
          className="fixed bottom-8 right-8 bg-web3-accent-blue/80 hover:bg-web3-accent-blue text-web3-text-primary p-4 rounded-full shadow-web3-glow-blue-strong z-50 transition-all duration-300 flex items-center justify-center animate-fade-in-up"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

      {/* Content Wrapper: This div contains all page content, centered with max-width */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-block mb-12 text-web3-accent-blue hover:underline font-semibold transition-colors duration-300 animate-fade-in"
        >
          ← Back to Quantum Hub
        </Link>

        {/* Main Heading */}
        <h1 className="relative text-center text-6xl md:text-7xl font-extrabold tracking-widest mb-16 animate-fade-in-up-delay">
          <span className="relative z-10 animate-pulse-light text-web3-accent-purple drop-shadow-[0_0_25px_rgba(155,89,182,0.8)]">
            About Dhaka 2070
          </span>
          {/* Glitch overlays for visual effect */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-web3-accent-purple opacity-0 animate-glitch-1"
            style={{ mixBlendMode: "screen" }}
          >
            About Dhaka 2070
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-web3-accent-blue opacity-0 animate-glitch-2"
            style={{ mixBlendMode: "screen" }}
          >
            About Dhaka 2070
          </span>
        </h1>

        {/* Mission Statement / Introduction */}
        <section className="text-center mb-20 px-4 py-8 bg-web3-card/50 backdrop-blur-sm rounded-xl border border-web3-accent-blue/30 shadow-web3-shadow-soft animate-fade-in delay-200">
          <p className="text-xl md:text-2xl text-web3-text-secondary leading-relaxed max-w-4xl mx-auto mb-8 font-light">
            In the year 2070, Dhaka has transcended its past, evolving into a beacon of **futuristic urbanism**. We are a collective vision brought to life, where advanced technology, human aspirations, and environmental harmony intertwine. Our mission is to forge a new paradigm of city living – resilient, intelligent, and deeply connected.
          </p>
          <p className="text-lg text-web3-text-primary/80 max-w-3xl mx-auto">
            This is not just a city; it's a living, breathing ecosystem designed for the next generation.
          </p>
        </section>

        {/* Our Core Principles Section */}
        <section className="mb-20 px-4 py-12 bg-web3-card/60 backdrop-blur-lg rounded-xl border border-web3-accent-purple/40 shadow-web3-shadow-deep">
          <h2 className="text-4xl font-bold text-web3-accent-blue text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-blue)]">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Principle 1: Innovation */}
            <div className="bg-web3-card p-6 rounded-lg border border-web3-accent-blue/30 shadow-web3-shadow-soft text-center hover:shadow-web3-glow-blue transition-all duration-300 transform hover:-translate-y-1">
              <MdOutlineScience className="text-web3-accent-blue text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-blue)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-blue mb-2">Pioneering Innovation</h3>
              <p className="text-web3-text-secondary text-sm leading-relaxed">
                Driving the forefront of quantum computing, AI, and bio-engineering to solve tomorrow's challenges today.
              </p>
            </div>
            {/* Principle 2: Sustainability */}
            <div className="bg-web3-card p-6 rounded-lg border border-web3-accent-green/30 shadow-web3-shadow-soft text-center hover:shadow-web3-glow-green transition-all duration-300 transform hover:-translate-y-1">
              <FaRecycle className="text-web3-accent-green text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-green)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-green mb-2">Radical Sustainability</h3>
              <p className="text-web3-text-secondary text-sm leading-relaxed">
                Implementing closed-loop systems, renewable energy, and vertical ecosystems for a truly green metropolis.
              </p>
            </div>
            {/* Principle 3: Security */}
            <div className="bg-web3-card p-6 rounded-lg border border-web3-accent-purple/30 shadow-web3-shadow-soft text-center hover:shadow-web3-glow-purple transition-all duration-300 transform hover:-translate-y-1">
              <FaShieldAlt className="text-web3-accent-purple text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-purple)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-purple mb-2">Unwavering Security</h3>
              <p className="text-web3-text-secondary text-sm leading-relaxed">
                Fortified by quantum encryption and advanced cyber-defenses, ensuring citizen safety and data integrity.
              </p>
            </div>
            {/* Principle 4: Community (New) */}
            <div className="bg-web3-card p-6 rounded-lg border border-web3-accent-orange/30 shadow-web3-shadow-soft text-center hover:shadow-web3-glow-orange transition-all duration-300 transform hover:-translate-y-1">
              <FaUsers className="text-web3-accent-orange text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-orange)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-orange mb-2">Thriving Communities</h3>
              <p className="text-web3-text-secondary text-sm leading-relaxed">
                Designing zones that foster collaboration, well-being, and a vibrant social fabric for all residents.
              </p>
            </div>
             {/* Principle 5: Governance (New) */}
            <div className="bg-web3-card p-6 rounded-lg border border-web3-accent-blue/30 shadow-web3-shadow-soft text-center hover:shadow-web3-glow-blue transition-all duration-300 transform hover:-translate-y-1">
              <FaBuilding className="text-web3-accent-blue text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-blue)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-blue mb-2">Intelligent Governance</h3>
              <p className="text-web3-text-secondary text-sm leading-relaxed">
                AI-driven urban management systems ensuring efficiency, transparency, and adaptive city services.
              </p>
            </div>
             {/* Principle 6: Collaboration (New) */}
            <div className="bg-web3-card p-6 rounded-lg border border-web3-accent-purple/30 shadow-web3-shadow-soft text-center hover:shadow-web3-glow-purple transition-all duration-300 transform hover:-translate-y-1">
              <FaHandshake className="text-web3-accent-purple text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-purple)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-purple mb-2">Global Collaboration</h3>
              <p className="text-web3-text-secondary text-sm leading-relaxed">
                Open to partnerships and knowledge exchange to further global urban development.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey / Timeline (Conceptual - could be expanded) */}
        <section className="mb-20 px-4 py-12 bg-web3-card/60 backdrop-blur-lg rounded-xl border border-web3-accent-blue/40 shadow-web3-shadow-deep">
          <h2 className="text-4xl font-bold text-web3-accent-orange text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-orange)]">
            Our Journey So Far
          </h2>
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-web3-border rounded-full"></div>
            {/* Timeline Events */}
            <div className="space-y-12">
              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="hidden md:block w-1/2 md:even:order-2 md:even:text-right md:even:pr-8">
                  <h3 className="text-web3-accent-blue text-2xl font-bold">2040: Genesis Protocol</h3>
                  <p className="text-web3-text-secondary text-sm">Initial concept and foundational quantum research initiated.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-web3-accent-blue rounded-full border-2 border-web3-border z-10 shadow-web3-glow-blue-soft"></div>
                <div className="w-full md:w-1/2 md:odd:pl-8 md:even:pl-0">
                  <h3 className="text-web3-accent-blue text-2xl font-bold md:hidden">2040: Genesis Protocol</h3>
                  <p className="text-web3-text-secondary text-sm md:hidden">Initial concept and foundational quantum research initiated.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="w-full md:w-1/2 md:odd:pr-8 md:even:pl-0 md:order-2 md:odd:order-1">
                  <h3 className="text-web3-accent-purple text-2xl font-bold">2055: Zone Alpha Activation</h3>
                  <p className="text-web3-text-secondary text-sm">First fully autonomous Quantum Zone goes live, showcasing integrated AI.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-web3-accent-purple rounded-full border-2 border-web3-border z-10 shadow-web3-glow-purple-soft"></div>
                <div className="hidden md:block w-1/2 md:odd:order-2 md:odd:text-right md:odd:pr-0 md:even:pl-8">
                  <h3 className="text-web3-accent-purple text-2xl font-bold md:hidden">2055: Zone Alpha Activation</h3>
                  <p className="text-web3-text-secondary text-sm md:hidden">First fully autonomous Quantum Zone goes live, showcasing integrated AI.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="hidden md:block w-1/2 md:even:order-2 md:even:text-right md:even:pr-8">
                  <h3 className="text-web3-accent-green text-2xl font-bold">2065: Eco-Dome Integration</h3>
                  <p className="text-web3-text-secondary text-sm">Large-scale sustainable living modules fully operational, achieving net-zero status.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-web3-accent-green rounded-full border-2 border-web3-border z-10 shadow-web3-glow-green-soft"></div>
                <div className="w-full md:w-1/2 md:odd:pl-8 md:even:pl-0">
                  <h3 className="text-web3-accent-green text-2xl font-bold md:hidden">2065: Eco-Dome Integration</h3>
                  <p className="text-web3-text-secondary text-sm md:hidden">Large-scale sustainable living modules fully operational, achieving net-zero status.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="w-full md:w-1/2 md:odd:pr-8 md:even:pl-0 md:order-2 md:odd:order-1">
                  <h3 className="text-web3-accent-blue text-2xl font-bold">2070: Present Day</h3>
                  <p className="text-web3-text-secondary text-sm">Dhaka 2070 officially established as a network of interconnected Quantum Zones.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-web3-accent-blue rounded-full border-2 border-web3-border z-10 shadow-web3-glow-blue-soft"></div>
                <div className="hidden md:block w-1/2 md:odd:order-2 md:odd:text-right md:odd:pr-0 md:even:pl-8">
                  <h3 className="text-web3-accent-blue text-2xl font-bold md:hidden">2070: Present Day</h3>
                  <p className="text-web3-text-secondary text-sm md:hidden">Dhaka 2070 officially established as a network of interconnected Quantum Zones.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Final Call to Action / Quick Links */}
        <section className="mt-20 text-center py-12 bg-web3-card/70 backdrop-blur-md rounded-xl border border-web3-accent-blue/40 shadow-web3-shadow-deep">
          <h2 className="text-3xl font-bold text-web3-accent-blue mb-6 drop-shadow-[0_0_15px_var(--web3-accent-blue)]">
            Join Our Quantum Future
          </h2>
          <p className="text-lg text-web3-text-secondary max-w-3xl mx-auto mb-8">
            Whether you're a resident, innovator, or potential partner, connect with us to be part of Dhaka 2070's evolving story.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {/* <Link
              to="/contact"
              className="bg-gradient-to-r from-web3-accent-orange to-web3-accent-red text-web3-text-primary px-8 py-3 rounded-full font-bold shadow-web3-glow-orange hover:shadow-web3-glow-orange-strong transition-all duration-300"
            >
              🤝 Contact Our Nexus
            </Link> */}
            <Link
              to="/zone" 
              className="bg-web3-card border border-web3-accent-blue/60 text-web3-accent-blue px-8 py-3 rounded-full font-bold hover:bg-web3-dark-bg hover:shadow-web3-glow-blue transition-all duration-300"
            >
              🔎 Explore All Zones
            </Link>
          </div>
        </section>

       
      </div>
    </div>
  );
}
