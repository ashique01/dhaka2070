import React, { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FaUsers,
  FaCloud,
  FaRobot,
  FaShieldAlt, // Changed from MdSecurity for consistency with FaShieldAlt in other components
  FaArrowUp, // For scroll to top
  FaSignOutAlt, // Logout icon
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  const topOfPageRef = useRef(null); // Ref for scroll to top
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for scroll to top button

  useEffect(() => {
    fetchCities();

    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchCities = () => {
    setLoading(true);
    api
      .get("/city")
      .then((res) => setCities(res.data))
      .catch((err) => {
        console.error("Error fetching cities:", err);
        setMessage("❌ Failed to load zones. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/city/${deletingId}`);
      setMessage("✅ Zone deleted successfully!");
      fetchCities(); // Re-fetch cities after deletion
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Failed to delete zone. Try again.");
    } finally {
      setDeletingId(null); // Close modal
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  const handleLogout = () => {
    // Clear authentication token/session
    localStorage.removeItem("token"); // Assuming 'token' is your auth key
    // You might also clear user context here if you have one
    // auth.logout(); // If using a context-based auth system

    // Redirect to login page
    navigate("/login");
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
        {/* Header with Title and Logout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="relative text-center md:text-left text-5xl md:text-6xl font-extrabold tracking-widest text-web3-accent-blue drop-shadow-[0_0_20px_rgba(33,150,243,0.9)] animate-fade-in-up-delay mb-6 md:mb-0">
            🛡️ Admin Nexus
          </h1>
          <button
            onClick={handleLogout}
            className="bg-web3-error text-web3-text-primary px-6 py-3 rounded-full font-semibold shadow-web3-glow-red hover:shadow-web3-glow-red-strong transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 animate-fade-in delay-200"
            aria-label="Logout"
          >
            <FaSignOutAlt className="text-lg" /> Disconnect
          </button>
        </div>

        {/* System Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-center font-semibold text-sm shadow-web3-glow-blue-soft animate-fade-in
              ${
                message.includes("✅")
                  ? "bg-web3-success/20 border border-web3-success text-web3-success"
                  : message.includes("⚠️")
                  ? "bg-web3-warning/20 border border-web3-warning text-web3-warning"
                  : "bg-web3-error/20 border border-web3-error text-web3-error"
              }`}
            role="alert"
            aria-live="assertive"
          >
            {message}
          </div>
        )}

        {/* Stats Summary */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-fade-in delay-300">
          <div className="bg-web3-card p-6 rounded-xl border border-web3-accent-blue/50 shadow-web3-shadow-soft text-center transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-web3-glow-blue-soft">
            <h2 className="text-xl font-semibold text-web3-accent-blue mb-1">Total Zones</h2>
            <p className="text-4xl font-bold mt-2">{cities.length}</p>
          </div>
          <div className="bg-web3-card p-6 rounded-xl border border-web3-accent-purple/50 shadow-web3-shadow-soft text-center transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-web3-glow-purple-soft">
            <h2 className="text-xl font-semibold text-web3-accent-purple mb-1">Active Admins</h2>
            <p className="text-4xl font-bold mt-2">1</p> {/* Placeholder for active admins */}
          </div>
          <div className="bg-web3-card p-6 rounded-xl border border-web3-accent-green/50 shadow-web3-shadow-soft text-center transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-web3-glow-green-soft">
            <h2 className="text-xl font-semibold text-web3-accent-green mb-1">Network Status</h2>
            <p className="text-lg font-medium text-web3-accent-green mt-2">Operational</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12 flex flex-wrap justify-center gap-6 animate-fade-in delay-400">
          <Link
            to="/add"
            className="bg-gradient-to-r from-web3-accent-blue to-web3-accent-orange px-8 py-3 rounded-full font-semibold text-web3-text-primary shadow-web3-glow-blue hover:shadow-web3-glow-orange-strong hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            ➕ Add New Zone
          </Link>
          <Link
            to="/"
            className="bg-web3-card px-8 py-3 rounded-full border border-web3-accent-blue text-web3-text-primary hover:bg-web3-dark-bg hover:shadow-web3-glow-blue-soft transition-all duration-300 flex items-center gap-2"
          >
            <FaCloud className="text-web3-accent-blue" /> Back to Quantum Hub
          </Link>
        </section>

        {/* Zone Table */}
        <section className="bg-web3-card p-6 rounded-xl border border-web3-border shadow-web3-shadow-deep overflow-x-auto animate-fade-in delay-500">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-6">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-web3-accent-blue shadow-web3-glow-blue"></div>
              <p className="text-lg text-web3-text-secondary font-semibold animate-pulse">
                Accessing Zone Registry...
              </p>
            </div>
          ) : cities.length === 0 ? (
            <div className="text-center py-8 text-web3-text-secondary italic text-lg">
              No zones found. Try adding some from the Add Zone page.
            </div>
          ) : (
            <table className="w-full table-auto text-left text-web3-text-primary border-collapse">
              <thead>
                <tr className="text-web3-accent-blue border-b border-web3-border text-sm uppercase tracking-widest">
                  <th className="p-3">Zone Name</th>
                  <th className="p-3 max-w-xs">Description</th>
                  <th className="p-3">Population</th>
                  <th className="p-3">AI Level</th>
                  <th className="p-3">Security</th>
                  <th className="p-3">Energy</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city) => (
                  <tr
                    key={city._id}
                    className="border-b border-web3-border hover:bg-web3-card/50 transition-colors duration-200"
                  >
                    <td className="p-3 font-semibold">{city.name}</td>
                    <td className="p-3 max-w-xs truncate text-web3-text-secondary" title={city.description}>
                      {city.description}
                    </td>
                    <td className="p-3">{city.population?.toLocaleString() ?? "N/A"}</td>
                    <td className="p-3">{city.aiIntegrationLevel ?? "N/A"}</td> {/* Corrected property name */}
                    <td className="p-3">{city.cyberSecurityLevel ?? "N/A"}</td> {/* Corrected property name */}
                    <td className="p-3">{city.energySource ?? "N/A"}</td> {/* Added Energy Source */}
                    <td className="p-3 space-x-3 whitespace-nowrap">
                      <Link
                        to={`/city/${city._id}`}
                        className="text-web3-accent-blue hover:underline transition-colors duration-300"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${city._id}`}
                        className="text-web3-accent-orange hover:underline transition-colors duration-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeletingId(city._id)}
                        className="text-web3-error hover:underline transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {/* Confirm Delete Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-web3-card border border-web3-error rounded-xl p-8 max-w-sm w-full shadow-web3-glow-red text-center animate-scale-in">
            <h3 className="text-2xl font-bold text-web3-error mb-4">Confirm Deletion</h3>
            <p className="text-web3-text-secondary mb-6">
              Are you sure you want to permanently delete this Quantum Zone? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-web3-error hover:bg-red-700 px-6 py-3 rounded-full font-semibold text-web3-text-primary transition-all duration-300 shadow-web3-glow-red-soft hover:shadow-web3-glow-red"
              >
                Confirm Deletion
              </button>
              <button
                onClick={() => setDeletingId(null)}
                className="bg-web3-card hover:bg-web3-dark-bg px-6 py-3 rounded-full border border-web3-border text-web3-text-primary transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
