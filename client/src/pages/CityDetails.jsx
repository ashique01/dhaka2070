import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  FaUsers,
  FaCloud,
  FaRobot,
  FaBolt,
  FaFingerprint,
  FaServer,
} from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

export default function CityDetails() {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/city/${id}`)
      .then((res) => setCity(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-web3-dark-bg text-web3-accent-blue"> {/* Updated bg and text colors */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-web3-accent-blue border-t-transparent"></div> {/* Updated border color */}
        <span className="ml-5 text-xl font-semibold font-mono tracking-wide text-web3-text-secondary"> {/* Updated text color */}
          Loading city data...
        </span>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-web3-dark-bg text-web3-text-secondary font-mono italic px-6"> {/* Updated bg and text colors */}
        <p className="text-2xl mb-6">City data not found.</p>
        <Link
          to="/"
          className="text-web3-accent-blue underline hover:text-web3-accent-purple transition" // Updated text colors
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-futuristic select-none text-web3-text-primary"> {/* Updated text color */}
      {/* Back Link */}
      <Link
        to="/"
        className="inline-block mb-8 text-web3-accent-blue font-semibold underline hover:text-web3-accent-purple transition" // Updated text colors
      >
        &larr; Back to Home
      </Link>

      {/* Image & Title */}
      <div className="relative rounded-3xl overflow-hidden shadow-web3-shadow-deep border border-web3-accent-blue/30 mb-12"> {/* Updated shadow and border colors */}
        {city.image ? (
          <img
            src={city.image}
            alt={city.name}
            loading="lazy"
            className="w-full h-72 object-cover object-center transition-transform duration-500 hover:scale-105 hover:brightness-110"
          />
        ) : (
          <div className="w-full h-72 bg-web3-card flex items-center justify-center italic text-web3-text-secondary text-2xl rounded-3xl"> {/* Updated bg and text colors */}
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-web3-dark-bg/90 via-transparent to-transparent pointer-events-none rounded-3xl" /> {/* Updated gradient color */}
        <h1
          className="absolute bottom-6 left-8 text-6xl font-extrabold tracking-wide
          text-transparent bg-clip-text bg-gradient-to-r from-web3-accent-blue via-web3-accent-purple to-web3-accent-blue
          drop-shadow-[0_0_15px_rgba(33,150,243,0.9)] animate-pulse-light" // Updated gradient and drop-shadow colors
        >
          {city.name}
        </h1>
      </div>

      {/* Description */}
      <section
        className="mb-16 p-8 rounded-3xl bg-web3-card/80 border border-web3-accent-blue/50 backdrop-blur-md
        shadow-web3-shadow-deep hover:shadow-web3-glow-purple transition-shadow duration-300" // Updated bg, border, and shadows
      >
        <p className="leading-relaxed text-lg text-web3-text-primary/90 whitespace-pre-wrap"> {/* Updated text color */}
          {city.description}
        </p>
      </section>

      {/* Stats + Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Stats */}
        <section
          className="bg-web3-card/80 border border-web3-accent-blue/70 rounded-3xl p-8 shadow-web3-shadow-deep flex flex-col gap-8" // Updated bg, border, and shadow
        >
          <h2 className="text-4xl font-bold mb-6 text-web3-accent-blue tracking-wide uppercase"> {/* Updated text color */}
            Zone Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: FaUsers,
                label: "Population",
                value: city.population?.toLocaleString() ?? "Unknown",
              },
              {
                icon: MdSecurity,
                label: "Security Level",
                value: city.securityLevel ?? "Unknown",
              },
              { icon: FaRobot, label: "AI Level", value: city.aiLevel ?? "Basic" },
              { icon: FaCloud, label: "Cloud Nodes", value: city.cloudNodes ?? 0 },
              { icon: FaBolt, label: "Energy Grid", value: city.energyGrid ?? "Unknown" },
              {
                icon: FaFingerprint,
                label: "Biometric Access",
                value: city.biometricAccess ? "Enabled" : "Disabled",
              },
              { icon: FaServer, label: "Server Nodes", value: city.serverNodes ?? 0 },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 bg-web3-dark-bg/60 rounded-xl border border-web3-accent-blue/50
                shadow-[inset_0_0_15px_rgba(33,150,243,0.4)]" // Updated bg, border, and shadow
              >
                <Icon className="text-web3-accent-blue text-3xl" /> {/* Updated icon color */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-web3-text-secondary"> {/* Updated text color */}
                    {label}
                  </div>
                  <div className="text-lg font-semibold text-web3-text-primary">{value}</div> {/* Updated text color */}
                </div>
              </div>
            ))}
          </div>

          {/* Technologies */}
          {city.notableTech && city.notableTech.length > 0 && (
            <div>
              <h3 className="uppercase text-web3-accent-blue tracking-widest text-sm font-semibold mb-3"> {/* Updated text color */}
                Technologies In Use
              </h3>
              <ul className="flex flex-wrap gap-3 text-web3-text-secondary"> {/* Updated text color */}
                {city.notableTech.map((tech, idx) => (
                  <li
                    key={idx}
                    className="bg-web3-accent-blue/30 px-4 py-2 rounded-full text-xs tracking-wider cursor-default select-text
                             shadow-web3-glow-purple" // Updated bg and shadow
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Map */}
        <section
          className="rounded-3xl overflow-hidden border border-web3-accent-blue/50 shadow-web3-shadow-deep hover:shadow-web3-glow-purple transition-shadow duration-300" // Updated border and shadows
          style={{ height: 460 }}
        >
          <MapContainer
            center={[city.coords.lat, city.coords.lng]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", filter: "brightness(0.85)" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap & CartoDB"
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[city.coords.lat, city.coords.lng]}>
              <Popup>
                <strong className="text-web3-accent-blue font-semibold">{city.name}</strong> {/* Updated text color */}
              </Popup>
            </Marker>
          </MapContainer>
        </section>
      </div>
    </div>
  );
}