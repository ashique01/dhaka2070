import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaPaperPlane,
  FaPhoneAlt, // For contact number
  FaMapMarkerAlt, // For address
  FaArrowUp, // For scroll to top
} from "react-icons/fa";
import { MdMessage } from "react-icons/md"; // For message icon

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" }); // { type: 'success' | 'error', message: '...' }
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" }); // Clear previous status
    setIsSubmitting(true);

    // Basic validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: "error", message: "All fields are required." });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call for sending message
    try {
      // In a real application, you would send this data to your backend API:
      // await axios.post("/api/contact", form);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      setStatus({ type: "success", message: "Message transmitted successfully! We will connect with you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus({ type: "error", message: "Transmission failed. Please try again later." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: "", message: "" }), 5000); // Clear status message after 5 seconds
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
          <span className="relative z-10 animate-pulse-light text-web3-accent-green drop-shadow-[0_0_25px_rgba(46,204,113,0.8)]">
            Connect with Us
          </span>
          {/* Glitch overlays for visual effect */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-web3-accent-green opacity-0 animate-glitch-1"
            style={{ mixBlendMode: "screen" }}
          >
            Connect with Us
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-web3-accent-blue opacity-0 animate-glitch-2"
            style={{ mixBlendMode: "screen" }}
          >
            Connect with Us
          </span>
        </h1>

        {/* Introduction / Slogan */}
        <section className="text-center mb-20 px-4 py-8 bg-web3-card/50 backdrop-blur-sm rounded-xl border border-web3-accent-blue/30 shadow-web3-shadow-soft animate-fade-in delay-200">
          <p className="text-xl md:text-2xl text-web3-text-secondary leading-relaxed max-w-4xl mx-auto mb-4 font-light">
            Your connection to the future of urban innovation.
          </p>
          <p className="text-lg text-web3-text-primary/80 max-w-3xl mx-auto">
            Whether you have inquiries, partnership proposals, or feedback, our Nexus team is ready to receive your data stream.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="mb-20 px-4 py-12 bg-web3-card/60 backdrop-blur-lg rounded-xl border border-web3-accent-purple/40 shadow-web3-shadow-deep animate-fade-in delay-300">
          <h2 className="text-4xl font-bold text-web3-accent-purple text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-purple)]">
            Send a Data Stream
          </h2>

          {status.message && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg text-center font-semibold text-sm shadow-web3-glow-blue-soft
                ${
                  status.type === "success"
                    ? "bg-web3-success/20 border border-web3-success text-web3-success"
                    : "bg-web3-error/20 border border-web3-error text-web3-error"
                }`}
              role="alert"
              aria-live="assertive"
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Name Input */}
            <div className="relative animate-fade-in delay-400">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Quantum Alias"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-3 rounded-xl bg-web3-input-bg border border-web3-accent-blue/60 placeholder-web3-placeholder text-web3-text-primary text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-web3-accent-blue focus:border-transparent shadow-web3-glow-blue-soft transition-all duration-300"
                required
                aria-label="Your Name"
              />
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-web3-text-secondary/70 text-xl" />
            </div>

            {/* Email Input */}
            <div className="relative animate-fade-in delay-500">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Secure Comms ID"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-3 rounded-xl bg-web3-input-bg border border-web3-accent-purple/60 placeholder-web3-placeholder text-web3-text-primary text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-web3-accent-purple focus:border-transparent shadow-web3-glow-purple-soft transition-all duration-300"
                required
                aria-label="Your Email"
              />
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-web3-text-secondary/70 text-xl" />
            </div>

            {/* Subject Input */}
            <div className="relative animate-fade-in delay-600">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Data Stream Subject Line"
                value={form.subject}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-3 rounded-xl bg-web3-input-bg border border-web3-accent-orange/60 placeholder-web3-placeholder text-web3-text-primary text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-web3-accent-orange focus:border-transparent shadow-web3-glow-orange-soft transition-all duration-300"
                required
                aria-label="Subject"
              />
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-web3-text-secondary/70 text-xl" />
            </div>

            {/* Message Textarea */}
            <div className="relative animate-fade-in delay-700">
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Your Message Data Packet"
                value={form.message}
                onChange={handleChange}
                className="w-full pl-5 pr-5 py-3 rounded-xl bg-web3-input-bg border border-web3-accent-green/60 placeholder-web3-placeholder text-web3-text-primary text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-web3-accent-green focus:border-transparent shadow-web3-glow-green-soft transition-all duration-300 resize-y"
                required
                aria-label="Your Message"
              ></textarea>
              <MdMessage className="absolute left-4 top-6 text-web3-text-secondary/70 text-xl" /> {/* Adjusted icon position for textarea */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple hover:from-web3-accent-purple hover:to-web3-accent-blue text-web3-text-primary rounded-xl font-bold text-lg shadow-web3-glow-blue-strong hover:shadow-web3-glow-purple-strong transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-web3-text-primary"></div>
                  Transmitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-lg" /> Send Data Stream
                </>
              )}
            </button>
          </form>
        </section>

        {/* Direct Contact Info Section */}
        <section className="mb-20 px-4 py-12 bg-web3-card/60 backdrop-blur-lg rounded-xl border border-web3-accent-blue/40 shadow-web3-shadow-deep animate-fade-in delay-800">
          <h2 className="text-4xl font-bold text-web3-accent-blue text-center mb-10 drop-shadow-[0_0_15px_var(--web3-accent-blue)]">
            Direct Communication Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-web3-text-primary">
            <div className="text-center bg-web3-input-bg p-6 rounded-lg border border-web3-accent-purple/30 shadow-web3-shadow-soft hover:shadow-web3-glow-purple transition-all duration-300 transform hover:-translate-y-1">
              <FaPhoneAlt className="text-web3-accent-purple text-5xl mx-auto mb-4 drop-shadow-[0_0_10px_var(--web3-accent-purple)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-purple mb-2">Secure Comms Link</h3>
              <p className="text-lg font-mono">+(880) 2070-DHAKA</p>
              <p className="text-sm text-web3-text-secondary">(Standard data rates apply)</p>
            </div>
            <div className="text-center bg-web3-input-bg p-6 rounded-lg border border-web3-accent-orange/30 shadow-web3-shadow-soft hover:shadow-web3-glow-orange transition-all duration-300 transform hover:-translate-y-1">
              <FaMapMarkerAlt className="text-web3-accent-orange text-5xl mx-auto mb-4 drop-shadow-[0_0_10px_var(--web3-accent-orange)]" />
              <h3 className="text-2xl font-semibold text-web3-accent-orange mb-2">Nexus Command Center</h3>
              <p className="text-lg font-mono">Quantum District 7, Dhaka 2070</p>
              <p className="text-sm text-web3-text-secondary">(Coordinates: 23.777 N, 90.399 E)</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
