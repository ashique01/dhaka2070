import React, { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaRobot,
  FaLightbulb,
  FaArrowUp,
  FaShieldAlt, // Using FaShieldAlt for Cyber Security for consistency
} from "react-icons/fa";
import { MdLocationCity, MdOutlineScience } from "react-icons/md";

export default function Home({ theme }) { // Add theme prop
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const exploreZonesRef = useRef(null);
  const topOfPageRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/city")
      .then((res) => setZones(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));

    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalPopulation = zones.reduce(
    (acc, zone) => acc + (zone.population || 0),
    0
  );
  const totalZones = zones.length;
  const avgAiIntegration =
    totalZones > 0
      ? zones.reduce((acc, zone) => acc + (zone.aiIntegrationLevel || 0), 0) /
        totalZones
      : 0;
  const avgSecurityLevel =
    totalZones > 0
      ? zones.reduce((acc, zone) => acc + (zone.cyberSecurityLevel || 0), 0) /
        totalZones
      : 0;

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const displayedZones = zones.slice(0, 6);

  return (
    // The main div's background and primary text color are handled by Layout, so remove them here
    <div className="relative min-h-screen w-full font-futuristic select-none overflow-hidden p-4">
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-colors-light-web3-accent-blue)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-colors-light-web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
      )}

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="relative text-center text-6xl md:text-7xl font-extrabold tracking-widest mb-16">
          <span className="relative z-10 animate-pulse-light drop-shadow-[0_0_25px_rgba(33,150,243,0.8)]
                       text-web3-accent-blue
                       light:text-light-web3-accent-blue light:drop-shadow-[0_0_25px_rgba(25,118,210,0.8)]">
            🧬 Dhaka 2070 Quantum Zones
          </span>
          {/* Glitch overlays for visual effect (only visible in dark mode) */}
          {theme === 'dark' && (
            <>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full text-web3-accent-blue opacity-0 animate-glitch-1"
                style={{ mixBlendMode: "screen" }}
              >
                🧬 Dhaka 2070 Quantum Zones
              </span>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full text-web3-accent-purple opacity-0 animate-glitch-2"
                style={{ mixBlendMode: "screen" }}
              >
                🧬 Dhaka 2070 Quantum Zones
              </span>
            </>
          )}
        </h1>

        <section className="text-center mb-24 px-4 py-8 rounded-xl border shadow-web3-shadow-soft animate-fade-in delay-200
                            bg-web3-card/50 backdrop-blur-sm border-web3-accent-blue/30
                            light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-soft">
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-8 font-light
                        text-web3-text-secondary
                        light:text-light-web3-text-secondary">
            Step into the future. Dhaka 2070 is a visionary metropolis
            transformed into a network of highly-advanced Quantum Zones. Each
            zone is a testament to cutting-edge technology, sustainable living,
            and interconnected communities.
          </p>
          <button
            onClick={() => scrollToSection(exploreZonesRef)}
            className="inline-flex items-center justify-center text-xl font-bold px-10 py-4 rounded-full shadow-web3-glow-blue hover:shadow-web3-glow-blue-strong transition-all duration-300 relative overflow-hidden group
                       bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple text-web3-text-primary
                       light:from-light-web3-accent-blue light:to-light-web3-accent-purple light:text-light-web3-text-primary light:shadow-light-web3-glow-blue light:hover:shadow-light-web3-glow-blue-strong"
            aria-label="Discover All Quantum Zones"
          >
            <span className="relative z-10">🚀 Discover Your Zone</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
                             bg-web3-accent-orange
                             light:bg-light-web3-accent-orange"></span>
          </button>
        </section>

        {/* Metric Cards Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard
            icon={<MdLocationCity />}
            label="Total Zones"
            value={totalZones}
            color="blue"
            theme={theme} // Pass theme to MetricCard
          />
          <MetricCard
            icon={<FaUsers />}
            label="Total Population"
            value={totalPopulation.toLocaleString()}
            color="purple"
            theme={theme} // Pass theme to MetricCard
          />
          <MetricCard
            icon={<FaRobot />}
            label="Avg AI Integration"
            value={`${avgAiIntegration.toFixed(1)}/10`}
            color="orange"
            theme={theme} // Pass theme to MetricCard
          />
          <MetricCard
            icon={<FaShieldAlt />}
            label="Avg Cyber Security"
            value={`${avgSecurityLevel.toFixed(1)}/10`}
            color="green"
            theme={theme} // Pass theme to MetricCard
          />
        </section>

        {/* Zones Preview */}
        <div ref={exploreZonesRef}>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-6">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 shadow-web3-glow-blue
                              border-web3-accent-blue
                              light:border-light-web3-accent-blue light:shadow-light-web3-glow-blue"></div>
              <p className="text-lg font-semibold
                            text-web3-text-secondary
                            light:text-light-web3-text-secondary">
                Loading Quantum Zones...
              </p>
            </div>
          ) : (
            <>
              {/* Section Heading */}
              <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 drop-shadow-[0_0_15px_var(--web3-accent-blue)]
                              text-web3-accent-blue
                              light:text-light-web3-accent-blue light:drop-shadow-[0_0_15px_var(--light-web3-accent-blue)]">
                🌐 Featured Quantum Zones of Dhaka 2070
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {displayedZones.map((zone) => (
                  <ZoneCard key={zone._id} zone={zone} theme={theme} /> // Pass theme to ZoneCard
                ))}
              </div>

              {zones.length > 6 && (
                <div className="mt-16 text-center">
                  <Link
                    to="/zone"
                    className="inline-block text-lg font-bold px-8 py-3 rounded-full shadow-web3-glow-purple hover:shadow-web3-glow-blue-strong transition-all duration-300
                               bg-gradient-to-r from-web3-accent-purple to-web3-accent-blue text-web3-text-primary
                               light:from-light-web3-accent-purple light:to-light-web3-accent-blue light:text-light-web3-text-primary light:shadow-light-web3-glow-purple light:hover:shadow-light-web3-glow-blue-strong"
                  >
                    🔍 Explore More Zones
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Call to Action Section */}
        <section className="mt-20 text-center py-12 rounded-xl border shadow-web3-shadow-deep
                            bg-web3-card/70 backdrop-blur-md border-web3-accent-blue/40
                            light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-deep">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-[0_0_15px_var(--web3-accent-blue)]
                        text-web3-accent-blue
                        light:text-light-web3-accent-blue light:drop-shadow-[0_0_15px_var(--light-web3-accent-blue)]">
            Ready to Connect?
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8
                        text-web3-text-secondary
                        light:text-light-web3-text-secondary">
            Dive deeper into the future of urban living, contribute to our
            network, or explore partnership opportunities.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full font-bold shadow-web3-glow-orange hover:shadow-web3-glow-orange-strong transition-all duration-300
                       bg-gradient-to-r from-web3-accent-orange to-web3-accent-red text-web3-text-primary
                       light:from-light-web3-accent-orange light:to-light-web3-accent-red light:text-light-web3-text-primary light:shadow-light-web3-glow-orange light:hover:shadow-light-web3-glow-orange-strong"
          >
            🤝 Contact Our Nexus
          </Link>
        </section>
      </div>
    </div>
  );
}

// Component for metrics
function MetricCard({ icon, label, value, color, theme }) {
  // Updated colors object to directly provide the Tailwind class names for dark and light modes
  const colors = {
    blue: { dark: "web3-accent-blue", light: "light-web3-accent-blue" },
    purple: { dark: "web3-accent-purple", light: "light-web3-accent-purple" },
    orange: { dark: "web3-accent-orange", light: "light-web3-accent-orange" },
    green: { dark: "web3-accent-green", light: "light-web3-accent-green" },
  };

  const shadowGlows = {
    blue: { dark: "web3-glow-blue", light: "light-web3-glow-blue" },
    purple: { dark: "web3-glow-purple", light: "light-web3-glow-purple" },
    orange: { dark: "web3-glow-orange", light: "light-web3-glow-orange" },
    green: { dark: "web3-glow-green", light: "light-web3-glow-green" },
  };

  const shadowSoft = { dark: "web3-shadow-soft", light: "soft" };
  const borderColors = {
    blue: { dark: "web3-accent-blue/50", light: "light-web3-accent-blue/50" },
    purple: { dark: "web3-accent-purple/50", light: "light-web3-accent-purple/50" },
    orange: { dark: "web3-accent-orange/50", light: "light-web3-accent-orange/50" },
    green: { dark: "web3-accent-green/50", light: "light-web3-accent-green/50" },
  };

  // Helper to get the specific RGB values for drop-shadows based on theme and color key
  const getDropShadowColor = (colorKey, currentTheme) => {
    const colorMap = {
      "web3-accent-blue": "33,150,243",
      "web3-accent-purple": "123,97,255",
      "web3-accent-orange": "255,152,0",
      "web3-accent-green": "51,204,153",
      "light-web3-accent-blue": "25,118,210",
      "light-web3-accent-purple": "103,58,183",
      "light-web3-accent-orange": "245,124,0",
      "light-web3-accent-green": "46,125,50",
    };
    // Ensure we pick the correct color string for the current theme
    const actualColorClass = colors[colorKey][currentTheme];
    return colorMap[actualColorClass];
  };


  return (
    <div
      // Default (dark mode) classes applied first, then light: overrides
      className={`p-6 rounded-xl border text-center transform hover:scale-105 transition-transform duration-300
                  bg-web3-card border-${borderColors[color].dark} shadow-${shadowSoft.dark}
                  light:bg-light-web3-card light:border-${borderColors[color].light} light:shadow-${shadowSoft.light}
                  hover:shadow-${shadowGlows[color].dark}
                  light:hover:shadow-${shadowGlows[color].light}`}
    >
      <div
        // Dynamically set icon color based on theme
        className={`text-5xl mx-auto mb-3
                    text-${colors[color].dark} drop-shadow-[0_0_10px_rgba(${getDropShadowColor(color, 'dark')},0.8)]
                    light:text-${colors[color].light} light:drop-shadow-[0_0_10px_rgba(${getDropShadowColor(color, 'light')},0.8)]`}
      >
        {icon}
      </div>
      <h3
        // Dynamically set h3 (label) color based on theme
        className={`text-2xl font-bold mb-1
                     text-${colors[color].dark}
                     light:text-${colors[color].light}`}>
        {label}
      </h3>
      <p className={`text-4xl font-extrabold
                     text-web3-text-primary
                     light:text-light-web3-text-primary`}>{value}</p>
    </div>
  );
}

// Component for zone card
function ZoneCard({ zone, theme }) { // Add theme prop
  return (
    <Link
      to={`/city/${zone._id}`}
      // Default (dark mode) classes applied first, then light: overrides
      className="group relative flex flex-col rounded-3xl border backdrop-blur-md shadow-web3-shadow-soft hover:shadow-web3-glow-blue-strong transition-all duration-400 transform hover:-translate-y-2
                 bg-web3-card/80 border-web3-accent-blue/50
                 light:bg-light-web3-card/80 light:border-light-web3-accent-blue/50 light:shadow-soft light:hover:shadow-light-web3-glow-blue-strong"
    >
      {zone.image && (
        <div className="rounded-t-3xl overflow-hidden relative">
          <img
            src={zone.image}
            alt={zone.name}
            loading="lazy"
            className="w-full h-52 object-cover group-hover:brightness-110 transition duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none rounded-b-3xl
                          bg-gradient-to-t from-web3-accent-blue/80 to-transparent
                          light:bg-gradient-to-t light:from-light-web3-accent-blue/80 light:to-transparent"></div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-3">
        <h3 className="text-3xl font-extrabold drop-shadow-[0_0_15px_rgba(33,150,243,0.9)] tracking-wide
                       text-web3-accent-blue
                       light:text-light-web3-accent-blue light:drop-shadow-[0_0_15px_rgba(25,118,210,0.9)]">
          {zone.name}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-4
                      text-web3-text-primary/90
                      light:text-light-web3-text-primary/90">
          {zone.description}
        </p>
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm font-mono
                        text-web3-accent-blue
                        light:text-light-web3-accent-blue">
          <div className="flex items-center gap-2">
            <FaUsers />{" "}
            <span>
              {zone.population?.toLocaleString() ?? "Unknown"} residents
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaShieldAlt />{" "}
            <span>Security: {zone.cyberSecurityLevel ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRobot />{" "}
            <span>AI Level: {zone.aiIntegrationLevel ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLightbulb />{" "}
            <span>Energy: {zone.energySource ?? "Unknown"}</span>
          </div>
        </div>
        {zone.notableTech?.length > 0 && (
          <div className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-2 select-text
                           text-web3-accent-blue
                           light:text-light-web3-accent-blue">
              Technologies
            </h4>
            <ul className="flex flex-wrap gap-2">
              {zone.notableTech.map((tech, idx) => (
                <li
                  key={idx}
                  className="backdrop-blur-sm px-3 py-1 rounded-full text-xs tracking-wide cursor-default select-text
                             bg-web3-accent-blue/30 text-web3-text-primary
                             light:bg-light-web3-accent-blue/30 light:text-light-web3-text-primary"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8 font-semibold tracking-wider text-lg transition-all duration-300
                        text-web3-accent-blue group-hover:text-web3-accent-orange group-hover:drop-shadow-[0_0_10px_var(--web3-accent-orange)]
                        light:text-light-web3-accent-blue light:group-hover:text-light-web3-accent-orange light:group-hover:drop-shadow-[0_0_10px_var(--light-web3-accent-orange)]">
          Explore Zone →
        </div>
      </div>
    </Link>
  );
}