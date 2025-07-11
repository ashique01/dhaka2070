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

export default function About({ theme }) { // Add theme prop to receive it from Layout
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

  // The main div's background is handled by Layout, so we remove the bg-web3-dark-bg here
  return (
    <div className="relative min-h-screen w-full font-futuristic select-none overflow-hidden p-4">
      {/* Top of Page Ref for Scroll-to-Top */}
      <div ref={topOfPageRef} className="absolute top-0 left-0 w-full h-px" />

      {/* Dynamic Background Layer (conditional based on theme) */}
      {theme === 'dark' && (
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-blue)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
      )}
      {theme === 'light' && (
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          {/* Light mode specific subtle background elements, if desired */}
          {/* Using custom properties to reference the light-mode gradient colors directly */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-colors-light-web3-accent-blue)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-colors-light-web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={() => scrollToSection(topOfPageRef)}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-web3-glow-blue-strong z-50 transition-all duration-300 flex items-center justify-center animate-fade-in-up
                     bg-web3-accent-blue/80 hover:bg-web3-accent-blue text-web3-text-primary
                     light:bg-light-web3-accent-blue/80 light:hover:bg-light-web3-accent-blue light:text-light-web3-text-primary light:shadow-light-web3-glow-blue-strong"
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
          className="inline-block mb-12 font-semibold transition-colors duration-300 animate-fade-in
                     text-web3-accent-blue hover:underline
                     light:text-light-web3-accent-blue"
        >
          ← Back to Quantum Hub
        </Link>

        {/* Main Heading */}
        <h1 className="relative text-center text-6xl md:text-7xl font-extrabold tracking-widest mb-16 animate-fade-in-up-delay">
          <span className="relative z-10 animate-pulse-light drop-shadow-[0_0_25px_rgba(155,89,182,0.8)]
                       text-web3-accent-purple
                       light:text-light-web3-accent-purple light:drop-shadow-[0_0_25px_rgba(103,58,183,0.8)]">
            About Dhaka 2070
          </span>
          {/* Glitch overlays for visual effect (only visible in dark mode) */}
          {theme === 'dark' && (
            <>
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
            </>
          )}
        </h1>

        {/* Mission Statement / Introduction */}
        <section className="text-center mb-20 px-4 py-8 rounded-xl border shadow-web3-shadow-soft animate-fade-in delay-200
                            bg-web3-card/50 backdrop-blur-sm border-web3-accent-blue/30
                            light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-soft">
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-8 font-light
                        text-web3-text-secondary
                        light:text-light-web3-text-secondary">
            In the year 2070, Dhaka has transcended its past, evolving into a beacon of **futuristic urbanism**. We are a collective vision brought to life, where advanced technology, human aspirations, and environmental harmony intertwine. Our mission is to forge a new paradigm of city living – resilient, intelligent, and deeply connected.
          </p>
          <p className="text-lg max-w-3xl mx-auto
                        text-web3-text-primary/80
                        light:text-light-web3-text-primary/80">
            This is not just a city; it's a living, breathing ecosystem designed for the next generation.
          </p>
        </section>

        {/* Our Core Principles Section */}
        <section className="mb-20 px-4 py-12 rounded-xl border shadow-web3-shadow-deep
                            bg-web3-card/60 backdrop-blur-lg border-web3-accent-purple/40
                            light:bg-light-web3-card/80 light:border-light-web3-accent-purple/50 light:shadow-deep">
          <h2 className="text-4xl font-bold text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-blue)]
                        text-web3-accent-blue
                        light:text-light-web3-accent-blue light:drop-shadow-[0_0_15px_var(--light-web3-accent-blue)]">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Principle 1: Innovation */}
            <div className="p-6 rounded-lg border shadow-web3-shadow-soft text-center hover:shadow-web3-glow-blue transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-card border-web3-accent-blue/30
                            light:bg-light-web3-card light:border-light-web3-accent-blue/50 light:shadow-soft light:hover:shadow-light-web3-glow-blue">
              <MdOutlineScience className="text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-blue)]
                                text-web3-accent-blue
                                light:text-light-web3-accent-blue light:drop-shadow-[0_0_12px_var(--light-web3-accent-blue)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-blue
                             light:text-light-web3-accent-blue">Pioneering Innovation</h3>
              <p className="text-sm leading-relaxed
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                Driving the forefront of quantum computing, AI, and bio-engineering to solve tomorrow's challenges today.
              </p>
            </div>
            {/* Principle 2: Sustainability */}
            <div className="p-6 rounded-lg border shadow-web3-shadow-soft text-center hover:shadow-web3-glow-green transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-card border-web3-accent-green/30
                            light:bg-light-web3-card light:border-light-web3-accent-green/50 light:shadow-soft light:hover:shadow-light-web3-glow-green">
              <FaRecycle className="text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-green)]
                                    text-web3-accent-green
                                    light:text-light-web3-accent-green light:drop-shadow-[0_0_12px_var(--light-web3-accent-green)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-green
                             light:text-light-web3-accent-green">Radical Sustainability</h3>
              <p className="text-sm leading-relaxed
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                Implementing closed-loop systems, renewable energy, and vertical ecosystems for a truly green metropolis.
              </p>
            </div>
            {/* Principle 3: Security */}
            <div className="p-6 rounded-lg border shadow-web3-shadow-soft text-center hover:shadow-web3-glow-purple transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-card border-web3-accent-purple/30
                            light:bg-light-web3-card light:border-light-web3-accent-purple/50 light:shadow-soft light:hover:shadow-light-web3-glow-purple">
              <FaShieldAlt className="text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-purple)]
                                    text-web3-accent-purple
                                    light:text-light-web3-accent-purple light:drop-shadow-[0_0_12px_var(--light-web3-accent-purple)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-purple
                             light:text-light-web3-accent-purple">Unwavering Security</h3>
              <p className="text-sm leading-relaxed
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                Fortified by quantum encryption and advanced cyber-defenses, ensuring citizen safety and data integrity.
              </p>
            </div>
            {/* Principle 4: Community (New) */}
            <div className="p-6 rounded-lg border shadow-web3-shadow-soft text-center hover:shadow-web3-glow-orange transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-card border-web3-accent-orange/30
                            light:bg-light-web3-card light:border-light-web3-accent-orange/50 light:shadow-soft light:hover:shadow-light-web3-glow-orange">
              <FaUsers className="text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-orange)]
                                text-web3-accent-orange
                                light:text-light-web3-accent-orange light:drop-shadow-[0_0_12px_var(--light-web3-accent-orange)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-orange
                             light:text-light-web3-accent-orange">Thriving Communities</h3>
              <p className="text-sm leading-relaxed
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                Designing zones that foster collaboration, well-being, and a vibrant social fabric for all residents.
              </p>
            </div>
              {/* Principle 5: Governance (New) */}
            <div className="p-6 rounded-lg border shadow-web3-shadow-soft text-center hover:shadow-web3-glow-blue transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-card border-web3-accent-blue/30
                            light:bg-light-web3-card light:border-light-web3-accent-blue/50 light:shadow-soft light:hover:shadow-light-web3-glow-blue">
              <FaBuilding className="text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-blue)]
                                    text-web3-accent-blue
                                    light:text-light-web3-accent-blue light:drop-shadow-[0_0_12px_var(--light-web3-accent-blue)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-blue
                             light:text-light-web3-accent-blue">Intelligent Governance</h3>
              <p className="text-sm leading-relaxed
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                AI-driven urban management systems ensuring efficiency, transparency, and adaptive city services.
              </p>
            </div>
              {/* Principle 6: Collaboration (New) */}
            <div className="p-6 rounded-lg border shadow-web3-shadow-soft text-center hover:shadow-web3-glow-purple transition-all duration-300 transform hover:-translate-y-1
                            bg-web3-card border-web3-accent-purple/30
                            light:bg-light-web3-card light:border-light-web3-accent-purple/50 light:shadow-soft light:hover:shadow-light-web3-glow-purple">
              <FaHandshake className="text-6xl mx-auto mb-4 drop-shadow-[0_0_12px_var(--web3-accent-purple)]
                                     text-web3-accent-purple
                                     light:text-light-web3-accent-purple light:drop-shadow-[0_0_12px_var(--light-web3-accent-purple)]" />
              <h3 className="text-2xl font-semibold mb-2
                             text-web3-accent-purple
                             light:text-light-web3-accent-purple">Global Collaboration</h3>
              <p className="text-sm leading-relaxed
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                Open to partnerships and knowledge exchange to further global urban development.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey / Timeline (Conceptual - could be expanded) */}
        <section className="mb-20 px-4 py-12 rounded-xl border shadow-web3-shadow-deep
                            bg-web3-card/60 backdrop-blur-lg border-web3-accent-blue/40
                            light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-deep">
          <h2 className="text-4xl font-bold text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-orange)]
                        text-web3-accent-orange
                        light:text-light-web3-accent-orange light:drop-shadow-[0_0_15px_var(--light-web3-accent-orange)]">
            Our Journey So Far
          </h2>
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full
                            bg-web3-border
                            light:bg-light-web3-border"></div>
            {/* Timeline Events */}
            <div className="space-y-12">
              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="hidden md:block w-1/2 md:even:order-2 md:even:text-right md:even:pr-8">
                  <h3 className="text-2xl font-bold
                                 text-web3-accent-blue
                                 light:text-light-web3-accent-blue">2040: Genesis Protocol</h3>
                  <p className="text-sm
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">Initial concept and foundational quantum research initiated.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 shadow-web3-glow-blue-soft
                                bg-web3-accent-blue border-web3-border
                                light:bg-light-web3-accent-blue light:border-light-web3-border light:shadow-light-web3-glow-blue-soft"></div>
                <div className="w-full md:w-1/2 md:odd:pl-8 md:even:pl-0">
                  <h3 className="text-2xl font-bold md:hidden
                                 text-web3-accent-blue
                                 light:text-light-web3-accent-blue">2040: Genesis Protocol</h3>
                  <p className="text-sm md:hidden
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">Initial concept and foundational quantum research initiated.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="w-full md:w-1/2 md:odd:pr-8 md:even:pl-0 md:order-2 md:odd:order-1">
                  <h3 className="text-2xl font-bold
                                 text-web3-accent-purple
                                 light:text-light-web3-accent-purple">2055: Zone Alpha Activation</h3>
                  <p className="text-sm
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">First fully autonomous Quantum Zone goes live, showcasing integrated AI.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 shadow-web3-glow-purple-soft
                                bg-web3-accent-purple border-web3-border
                                light:bg-light-web3-accent-purple light:border-light-web3-border light:shadow-light-web3-glow-purple-soft"></div>
                <div className="hidden md:block w-1/2 md:odd:order-2 md:odd:text-right md:odd:pr-0 md:even:pl-8">
                  <h3 className="text-2xl font-bold md:hidden
                                 text-web3-accent-purple
                                 light:text-light-web3-accent-purple">2055: Zone Alpha Activation</h3>
                  <p className="text-sm md:hidden
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">First fully autonomous Quantum Zone goes live, showcasing integrated AI.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="hidden md:block w-1/2 md:even:order-2 md:even:text-right md:even:pr-8">
                  <h3 className="text-2xl font-bold
                                 text-web3-accent-green
                                 light:text-light-web3-accent-green">2065: Eco-Dome Integration</h3>
                  <p className="text-sm
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">Large-scale sustainable living modules fully operational, achieving net-zero status.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 shadow-web3-glow-green-soft
                                bg-web3-accent-green border-web3-border
                                light:bg-light-web3-accent-green light:border-light-web3-border light:shadow-light-web3-glow-green-soft"></div>
                <div className="w-full md:w-1/2 md:odd:pl-8 md:even:pl-0">
                  <h3 className="text-2xl font-bold md:hidden
                                 text-web3-accent-green
                                 light:text-light-web3-accent-green">2065: Eco-Dome Integration</h3>
                  <p className="text-sm md:hidden
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">Large-scale sustainable living modules fully operational, achieving net-zero status.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-start md:even:justify-end">
                <div className="w-full md:w-1/2 md:odd:pr-8 md:even:pl-0 md:order-2 md:odd:order-1">
                  <h3 className="text-2xl font-bold
                                 text-web3-accent-blue
                                 light:text-light-web3-accent-blue">2070: Present Day</h3>
                  <p className="text-sm
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">Dhaka 2070 officially established as a network of interconnected Quantum Zones.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 shadow-web3-glow-blue-soft
                                bg-web3-accent-blue border-web3-border
                                light:bg-light-web3-accent-blue light:border-light-web3-border light:shadow-light-web3-glow-blue-soft"></div>
                <div className="hidden md:block w-1/2 md:odd:order-2 md:odd:text-right md:odd:pr-0 md:even:pl-8">
                  <h3 className="text-2xl font-bold md:hidden
                                 text-web3-accent-blue
                                 light:text-light-web3-accent-blue">2070: Present Day</h3>
                  <p className="text-sm md:hidden
                                text-web3-text-secondary
                                light:text-light-web3-text-secondary">Dhaka 2070 officially established as a network of interconnected Quantum Zones.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action / Quick Links */}
        <section className="mt-20 text-center py-12 rounded-xl border shadow-web3-shadow-deep
                            bg-web3-card/70 backdrop-blur-md border-web3-accent-blue/40
                            light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-deep">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-[0_0_15px_var(--web3-accent-blue)]
                        text-web3-accent-blue
                        light:text-light-web3-accent-blue light:drop-shadow-[0_0_15px_var(--light-web3-accent-blue)]">
            Join Our Quantum Future
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8
                        text-web3-text-secondary
                        light:text-light-web3-text-secondary">
            Whether you're a resident, innovator, or potential partner, connect with us to be part of Dhaka 2070's evolving story.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/zone"
              className="px-8 py-3 rounded-full font-bold transition-all duration-300
                         bg-web3-card border border-web3-accent-blue/60 text-web3-accent-blue hover:bg-web3-dark-bg hover:shadow-web3-glow-blue
                         light:bg-light-web3-card light:border-light-web3-accent-blue/60 light:text-light-web3-accent-blue light:hover:bg-light-web3-dark-bg light:hover:shadow-light-web3-glow-blue"
            >
              🔎 Explore All Zones
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}