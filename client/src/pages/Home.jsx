import React, { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCloud,
  FaRobot,
  FaMicrochip,
  FaShieldAlt,
  FaLightbulb,
  FaArrowUp,
  FaGlobe,
  FaCogs,
  FaRecycle,
} from "react-icons/fa";
import { MdSecurity, MdLocationCity, MdOutlineScience } from "react-icons/md";

export default function Home() {
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
    <div className="relative min-h-screen w-full font-futuristic select-none text-web3-text-primary overflow-hidden bg-web3-dark-bg">
      <div ref={topOfPageRef} className="absolute top-0 left-0 w-full h-px" />

      <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-blue)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
      </div>

      {showScrollToTop && (
        <button
          onClick={() => scrollToSection(topOfPageRef)}
          className="fixed bottom-8 right-8 bg-web3-accent-blue/80 hover:bg-web3-accent-blue text-web3-text-primary p-4 rounded-full shadow-web3-glow-blue-strong z-50 transition-all duration-300 flex items-center justify-center animate-fade-in-up"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="relative text-center text-6xl md:text-7xl font-extrabold tracking-widest mb-16">
          <span className="relative z-10 animate-pulse-light text-web3-accent-blue drop-shadow-[0_0_25px_rgba(33,150,243,0.8)]">
            🧬 Dhaka 2070 Quantum Zones
          </span>
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
        </h1>

        <section className="text-center mb-24 px-4 py-8 bg-web3-card/50 backdrop-blur-sm rounded-xl border border-web3-accent-blue/30 shadow-web3-shadow-soft animate-fade-in delay-200">
          <p className="text-xl md:text-2xl text-web3-text-secondary leading-relaxed max-w-4xl mx-auto mb-8 font-light">
            Step into the future. Dhaka 2070 is a visionary metropolis
            transformed into a network of highly-advanced Quantum Zones. Each
            zone is a testament to cutting-edge technology, sustainable living,
            and interconnected communities.
          </p>
          <button
            onClick={() => scrollToSection(exploreZonesRef)}
            className="inline-flex items-center justify-center bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple text-web3-text-primary text-xl font-bold px-10 py-4 rounded-full shadow-web3-glow-blue hover:shadow-web3-glow-blue-strong transition-all duration-300 relative overflow-hidden group"
            aria-label="Discover All Quantum Zones"
          >
            <span className="relative z-10">🚀 Discover Your Zone</span>
            <span className="absolute inset-0 bg-web3-accent-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard
            icon={<MdLocationCity />}
            label="Total Zones"
            value={totalZones}
            color="blue"
          />
          <MetricCard
            icon={<FaUsers />}
            label="Total Population"
            value={totalPopulation.toLocaleString()}
            color="purple"
          />
          <MetricCard
            icon={<FaRobot />}
            label="Avg AI Integration"
            value={`${avgAiIntegration.toFixed(1)}/10`}
            color="orange"
          />
          <MetricCard
            icon={<FaShieldAlt />}
            label="Avg Cyber Security"
            value={`${avgSecurityLevel.toFixed(1)}/10`}
            color="green"
          />
        </section>

        {/* Zones Preview */}
        <div ref={exploreZonesRef}>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-6">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-web3-accent-blue shadow-web3-glow-blue"></div>
              <p className="text-lg text-web3-text-secondary font-semibold">
                Loading Quantum Zones...
              </p>
            </div>
          ) : (
            <>
              {/* Section Heading */}
              <h2 className="text-center text-4xl md:text-5xl font-bold text-web3-accent-blue mb-12 drop-shadow-[0_0_15px_var(--web3-accent-blue)]">
                🌐 Featured Quantum Zones of Dhaka 2070
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {displayedZones.map((zone) => (
                  <ZoneCard key={zone._id} zone={zone} />
                ))}
              </div>

              {zones.length > 6 && (
                <div className="mt-16 text-center">
                  <Link
                    to="/zone"
                    className="inline-block bg-gradient-to-r from-web3-accent-purple to-web3-accent-blue text-web3-text-primary text-lg font-bold px-8 py-3 rounded-full shadow-web3-glow-purple hover:shadow-web3-glow-blue-strong transition-all duration-300"
                  >
                    🔍 Explore More Zones
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        <section className="mt-20 text-center py-12 bg-web3-card/70 backdrop-blur-md rounded-xl border border-web3-accent-blue/40 shadow-web3-shadow-deep">
          <h2 className="text-3xl font-bold text-web3-accent-blue mb-6 drop-shadow-[0_0_15px_var(--web3-accent-blue)]">
            Ready to Connect?
          </h2>
          <p className="text-lg text-web3-text-secondary max-w-3xl mx-auto mb-8">
            Dive deeper into the future of urban living, contribute to our
            network, or explore partnership opportunities.
          </p>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-web3-accent-orange to-web3-accent-red text-web3-text-primary px-8 py-3 rounded-full font-bold shadow-web3-glow-orange hover:shadow-web3-glow-orange-strong transition-all duration-300"
          >
            🤝 Contact Our Nexus
          </Link>
        </section>
      </div>
    </div>
  );
}

// Component for metrics
function MetricCard({ icon, label, value, color }) {
  const colors = {
    blue: "web3-accent-blue",
    purple: "web3-accent-purple",
    orange: "web3-accent-orange",
    green: "web3-accent-green",
  };

  return (
    <div
      className={`bg-web3-card p-6 rounded-xl border border-${colors[color]}/50 shadow-web3-shadow-soft text-center transform hover:scale-105 transition-transform duration-300`}
    >
      <div
        className={`text-${colors[color]} text-5xl mx-auto mb-3 drop-shadow-[0_0_10px_var(--${colors[color]})]`}
      >
        {icon}
      </div>
      <h3 className={`text-2xl font-bold text-${colors[color]} mb-1`}>
        {label}
      </h3>
      <p className="text-4xl font-extrabold text-web3-text-primary">{value}</p>
    </div>
  );
}

// Component for zone card
function ZoneCard({ zone }) {
  return (
    <Link
      to={`/city/${zone._id}`}
      className="group relative flex flex-col bg-web3-card/80 rounded-3xl border border-web3-accent-blue/50 backdrop-blur-md shadow-web3-shadow-soft hover:shadow-web3-glow-blue-strong transition-all duration-400 transform hover:-translate-y-2"
    >
      {zone.image && (
        <div className="rounded-t-3xl overflow-hidden relative">
          <img
            src={zone.image}
            alt={zone.name}
            className="w-full h-52 object-cover group-hover:brightness-110 transition duration-500"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-web3-accent-blue/80 to-transparent pointer-events-none rounded-b-3xl"></div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-3">
        <h3 className="text-3xl font-extrabold text-web3-accent-blue drop-shadow-[0_0_15px_rgba(33,150,243,0.9)] tracking-wide">
          {zone.name}
        </h3>
        <p className="text-web3-text-primary/90 text-sm leading-relaxed line-clamp-4">
          {zone.description}
        </p>
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-web3-accent-blue font-mono">
          <div className="flex items-center gap-2">
            <FaUsers />{" "}
            <span>
              {zone.population?.toLocaleString() ?? "Unknown"} residents
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdSecurity />{" "}
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
            <h4 className="text-xs font-semibold uppercase tracking-widest text-web3-accent-blue mb-2 select-text">
              Technologies
            </h4>
            <ul className="flex flex-wrap gap-2">
              {zone.notableTech.map((tech, idx) => (
                <li
                  key={idx}
                  className="bg-web3-accent-blue/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs tracking-wide cursor-default select-text"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8 font-semibold text-web3-accent-blue cursor-pointer tracking-wider text-lg group-hover:text-web3-accent-orange group-hover:drop-shadow-[0_0_10px_var(--web3-accent-orange)] transition-all duration-300">
          Explore Zone →
        </div>
      </div>
    </Link>
  );
}
