import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/login", {
        username: form.username,
        password: form.password,
      });

      // Assuming your login function stores token & user info in context/localStorage
      login({ user: { username: data.username, _id: data._id }, token: data.token });

      navigate("/admin/dashboard");
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center font-futuristic select-none text-web3-text-primary overflow-hidden bg-web3-dark-bg p-4">
      {/* Background Gradients & Effects */}
      <div className="fixed inset-0 z-0 opacity-20 animate-pulse-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--web3-accent-blue)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--web3-accent-purple)_0%,_transparent_50%)] animate-pulse-bg-2"></div>
        <div className="absolute inset-0 z-0 opacity-30 animate-scatter-glow"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-web3-card/90 backdrop-blur-md p-8 rounded-3xl border border-web3-accent-blue/50 shadow-web3-glow-blue-strong space-y-6 w-full max-w-sm
                   transform transition-all duration-500 hover:scale-[1.01] hover:shadow-web3-glow-purple-strong
                   animate-fade-in-up-delay relative"
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none z-0">
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent animate-border-pulse"></div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-web3-accent-blue drop-shadow-[0_0_20px_rgba(33,150,243,0.9)] tracking-widest leading-tight animate-pulse-light">
            Dhaka 2070
          </h1>
          <p className="text-web3-text-secondary text-sm md:text-base font-mono mt-2 tracking-wider animate-fade-in delay-100">
            Quantum Zone Administration Nexus
          </p>
          <p className="text-web3-text-primary/70 text-xs mt-3 animate-fade-in delay-200">
            Securely access the future of urban management.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-center text-web3-accent-purple drop-shadow-[0_0_10px_var(--web3-accent-purple)] animate-fade-in delay-300">
          Administrator Login
        </h2>
        <p className="text-web3-text-secondary text-center text-sm mb-4 animate-fade-in delay-400">
          Authenticate your identity to maintain system integrity.
        </p>

        {error && (
          <div className="bg-web3-accent-red/20 border border-web3-accent-red text-web3-accent-red text-sm px-4 py-2 rounded-lg text-center shadow-web3-glow-red-soft animate-fade-in">
            {error}
          </div>
        )}

        {/* Username Input with Icon */}
        <div className="relative animate-fade-in delay-500">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full pl-12 pr-5 py-3 rounded-xl bg-web3-input-bg border border-web3-accent-blue/60 placeholder-web3-placeholder text-web3-text-primary text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-web3-accent-blue focus:border-transparent shadow-web3-glow-blue-soft transition-all duration-300"
            required
            aria-label="Username"
          />
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-web3-text-secondary/70 text-xl" />
        </div>

        {/* Password Input with Icon */}
        <div className="relative animate-fade-in delay-600">
          <input
            type="password"
            placeholder="Secure Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full pl-12 pr-5 py-3 rounded-xl bg-web3-input-bg border border-web3-accent-purple/60 placeholder-web3-placeholder text-web3-text-primary text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-web3-accent-purple focus:border-transparent shadow-web3-glow-purple-soft transition-all duration-300"
            required
            aria-label="Secure Password"
          />
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-web3-text-secondary/70 text-xl" />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple hover:from-web3-accent-purple hover:to-web3-accent-blue text-web3-text-primary rounded-xl font-bold text-lg shadow-web3-glow-blue-strong hover:shadow-web3-glow-purple-strong transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-web3-text-primary"></div>
              Authenticating...
            </>
          ) : (
            "Initiate Secure Login"
          )}
        </button>

        <div className="text-center pt-6 border-t border-web3-border/30 mt-6 animate-fade-in delay-800">
          <Link
            to="/"
            className="inline-block px-6 py-2 text-web3-accent-blue border border-web3-accent-blue/60 rounded-full font-semibold text-base hover:bg-web3-accent-blue/20 hover:shadow-web3-glow-blue-soft transition-all duration-300"
          >
            ← Back to Quantum Hub
          </Link>
        </div>

        <div className="text-center text-web3-text-secondary/60 text-xs pt-4 space-x-4 animate-fade-in delay-900">
          <Link to="/privacy" className="hover:text-web3-accent-blue transition-colors duration-200">
            Privacy Protocols
          </Link>
          <Link to="/terms" className="hover:text-web3-accent-blue transition-colors duration-200">
            Service Agreements
          </Link>
          <p className="mt-2">&copy; {currentYear} Dhaka 2070. All Rights Reserved.</p>
        </div>
      </form>
    </div>
  );
}
