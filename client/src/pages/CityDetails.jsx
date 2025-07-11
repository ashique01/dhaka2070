import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Import Leaflet CSS directly
import 'leaflet/dist/leaflet.css';

import {
  FaUsers,
  FaCloud,
  FaRobot,
  FaBolt,
  FaShieldAlt,
  FaIndustry,
  FaSmog,
  FaExclamationTriangle,
  FaArrowUp, // For scroll to top
} from "react-icons/fa";

// Fix Leaflet marker icons for production build
// This block is often necessary when not using a bundler that processes CSS url()s
// or when Leaflet's default icon paths conflict with your asset pipeline.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function CityDetails() {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const topOfPageRef = useRef(null); // Ref for scroll to top
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for scroll to top button

  useEffect(() => {
    setLoading(true);
    api
      .get(`/city/${id}`)
      .then((res) => setCity(res.data))
      .catch((error) => {
        console.error("Error fetching city data:", error);
        // You might want to set an error state here to show a user-friendly message
      })
      .finally(() => setLoading(false));
  }, [id]);

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

  const getTechArray = (techData) => {
    if (typeof techData === "string" && techData.trim() !== "") {
      return techData.split(",").map((t) => t.trim());
    }
    return [];
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-web3-dark-bg text-web3-text-primary font-futuristic p-4">
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-blue)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-64 gap-6">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-web3-accent-blue shadow-web3-glow-blue"></div>
          <p className="text-lg text-web3-text-secondary font-semibold animate-pulse">
            Accessing Quantum Zone data...
          </p>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-web3-dark-bg text-web3-text-secondary font-futuristic italic px-6 p-4">
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-red)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-orange)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        </div>
        <div className="relative z-10 text-center bg-web3-card/80 backdrop-blur-md p-8 rounded-xl border border-web3-accent-red/50 shadow-web3-glow-red-soft animate-fade-in">
          <p className="text-2xl mb-6">Quantum Zone data not found or inaccessible.</p>
          <Link
            to="/zone" // Link back to the all zones page
            className="inline-block px-6 py-2 text-web3-accent-blue border border-web3-accent-blue/60 rounded-full font-semibold text-base hover:bg-web3-accent-blue/20 hover:shadow-web3-glow-blue-soft transition-all duration-300"
          >
            ← Back to All Zones
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: FaUsers,
      label: "Population",
      value: city.population?.toLocaleString() ?? "N/A",
    },
    {
      icon: FaSmog,
      label: "Pollution Index",
      value: city.pollutionIndex ?? "N/A",
    },
    {
      icon: FaExclamationTriangle,
      label: "Crime Rate",
      value: city.crimeRate ?? "N/A",
    },
    {
      icon: FaRobot,
      label: "AI Integration",
      value: city.aiIntegrationLevel ? `Level ${city.aiIntegrationLevel}` : "N/A",
    },
    {
      icon: FaCloud,
      label: "Drone Traffic",
      value: city.droneTrafficDensity ?? "N/A",
    },
    {
      icon: FaShieldAlt,
      label: "Cybersecurity",
      value: city.cyberSecurityLevel ? `Level ${city.cyberSecurityLevel}` : "N/A",
    },
    {
      icon: FaIndustry,
      label: "Smart Infra Score",
      value: city.smartInfraScore ?? "N/A",
    },
    {
      icon: FaBolt,
      label: "Energy Source",
      value: city.energySource ?? "N/A",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen w-full font-futuristic select-none text-web3-text-primary overflow-hidden bg-web3-dark-bg p-4">
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

      {/* Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Back to All Zones Link */}
        <Link
          to="/zone" // Changed to /zone for consistency with AllZones page
          className="inline-block mb-12 text-web3-accent-blue hover:underline font-semibold transition-colors duration-300 animate-fade-in"
        >
          ← Back to All Zones
        </Link>

        {/* Header image or fallback */}
        <div className="relative rounded-3xl overflow-hidden shadow-web3-shadow-deep border border-web3-accent-blue/30 mb-12 animate-fade-in delay-200">
          {city.image ? (
            <img
              src={city.image}
              alt={city.name}
              loading="lazy"
              className="w-full h-72 object-cover object-center transition-transform duration-500 hover:scale-105 hover:brightness-110"
            />
          ) : (
            <div className="w-full h-72 bg-web3-card flex items-center justify-center italic text-web3-text-secondary text-2xl rounded-3xl">
              No Image Available for {city.name}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-web3-dark-bg/90 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <h1
            className="absolute bottom-6 left-8 text-6xl font-extrabold tracking-wide
            text-transparent bg-clip-text bg-gradient-to-r from-web3-accent-blue via-web3-accent-purple to-web3-accent-blue
            drop-shadow-[0_0_15px_rgba(33,150,243,0.9)] animate-pulse-light"
          >
            {city.name}
          </h1>
        </div>

        {/* Description */}
        <section className="mb-16 p-8 rounded-3xl bg-web3-card/80 border border-web3-accent-blue/50 backdrop-blur-md shadow-web3-shadow-deep hover:shadow-web3-glow-purple transition-shadow duration-300 animate-fade-in delay-300">
          <p className="leading-relaxed text-lg text-web3-text-primary/90 whitespace-pre-wrap">
            {city.description}
          </p>
        </section>

        {/* Stats & Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Stats */}
          <section className="bg-web3-card/80 border border-web3-accent-blue/70 rounded-3xl p-8 shadow-web3-shadow-deep flex flex-col gap-8 animate-fade-in delay-400">
            <h2 className="text-4xl font-bold mb-6 text-web3-accent-blue tracking-wide uppercase drop-shadow-[0_0_10px_var(--web3-accent-blue)]">
              Zone Metrics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 bg-web3-dark-bg/60 rounded-xl border border-web3-accent-blue/50 shadow-[inset_0_0_15px_rgba(33,150,243,0.4)] transform hover:scale-[1.02] transition-transform duration-300"
                >
                  <Icon className="text-web3-accent-blue text-3xl drop-shadow-[0_0_8px_var(--web3-accent-blue)]" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-web3-text-secondary">
                      {label}
                    </div>
                    <div className="text-lg font-semibold text-web3-text-primary">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            {getTechArray(city.notableTech).length > 0 && (
              <div className="mt-8">
                <h3 className="uppercase text-web3-accent-green tracking-widest text-sm font-semibold mb-3 drop-shadow-[0_0_5px_var(--web3-accent-green)]">
                  Technologies In Use
                </h3>
                <ul className="flex flex-wrap gap-3 text-web3-text-secondary">
                  {getTechArray(city.notableTech).map((tech, idx) => (
                    <li
                      key={idx}
                      className="bg-web3-accent-green/30 px-4 py-2 rounded-full text-xs tracking-wider cursor-default select-text shadow-web3-glow-purple-soft hover:shadow-web3-glow-blue-soft transition-shadow duration-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Map */}
          <section className="rounded-3xl overflow-hidden border border-web3-accent-blue/50 shadow-web3-shadow-deep hover:shadow-web3-glow-purple transition-shadow duration-300 animate-fade-in delay-500">
            {/* Conditional rendering for MapContainer: now uses city.coords.lat and city.coords.lng */}
            {city.coords && city.coords.lat !== undefined && city.coords.lng !== undefined && !isNaN(parseFloat(city.coords.lat)) && !isNaN(parseFloat(city.coords.lng)) ? (
              <MapContainer
                center={[parseFloat(city.coords.lat), parseFloat(city.coords.lng)]} // Access from city.coords
                zoom={14}
                scrollWheelZoom={false}
                style={{
                  height: "100%",
                  width: "100%",
                  minHeight: "460px", // Ensure minimum height for visibility
                  filter: "brightness(0.85)", // Darken map for theme
                }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap & CartoDB"
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme map tiles
                />
                <Marker position={[parseFloat(city.coords.lat), parseFloat(city.coords.lng)]}> // Access from city.coords
                  <Popup>
                    <strong className="text-web3-accent-blue font-semibold">
                      {city.name}
                    </strong>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="w-full h-full min-h-[460px] bg-web3-input-bg flex flex-col items-center justify-center text-web3-text-secondary italic text-lg p-4 text-center">
                <FaExclamationTriangle className="text-web3-accent-red text-5xl mb-4" />
                <p>Map coordinates unavailable for this zone.</p>
                <p>Please check zone data for Latitude and Longitude.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
