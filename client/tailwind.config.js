/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors (unchanged)
        "web3-dark-bg": "#0D1117",
        "web3-card": "#161B22",
        "web3-border": "#30363D",
        "web3-text-primary": "#C9D1D9",
        "web3-text-secondary": "#8B949E",
        "web3-accent-blue": "#2196F3",
        "web3-accent-purple": "#7B61FF",
        "web3-accent-green": "#33CC99",
        "web3-accent-orange": "#FF9800",
        "web3-input-bg": "#010409",
        "web3-placeholder": "#545D68",
        "web3-success": "#33CC99",
        "web3-warning": "#FFB300",
        "web3-error": "#EF5350",
        "web3-shadow-soft": "rgba(0, 0, 0, 0.2)",
        "web3-shadow-deep": "rgba(0, 0, 0, 0.4)",
        "web3-gradient-start": "#2A0055",
        "web3-gradient-end": "#001D3D",

        // === New Light Mode Colors (Vivid Futuristic Web3 Style) ===
        "light-web3-dark-bg": "#F9FAFB",          // Light gray background
        "light-web3-card": "#FFFFFF",             // White cards
        "light-web3-border": "#E0E7FF",           // Light indigo border
        "light-web3-text-primary": "#1E293B",     // Dark slate text
        "light-web3-text-secondary": "#64748B",   // Slate gray secondary text
        "light-web3-accent-blue": "#3B82F6",      // Bright blue accent
        "light-web3-accent-purple": "#8B5CF6",    // Vivid purple accent
        "light-web3-accent-green": "#22C55E",     // Bright green accent
        "light-web3-accent-orange": "#F97316",    // Orange accent
        "light-web3-input-bg": "#F3F4F6",          // Light input background
        "light-web3-placeholder": "#94A3B8",       // Medium gray placeholder
        "light-web3-success": "#22C55E",           // Green success
        "light-web3-warning": "#F59E0B",           // Amber warning
        "light-web3-error": "#DC2626",             // Red error
        "light-web3-shadow-soft": "rgba(0, 0, 0, 0.05)",
        "light-web3-shadow-deep": "rgba(0, 0, 0, 0.1)",
        "light-web3-gradient-start": "#93C5FD",    // Light blue gradient start
        "light-web3-gradient-end": "#C7D2FE",      // Light blue gradient end
      },
      fontFamily: {
        futuristic: ["Orbitron", "sans-serif"],
        mono: ["Fira Code", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 12px rgba(123, 97, 255, 0.6)",
        cyan: "0 0 12px rgba(0,255,255,0.6)",
        green: "0 0 12px rgba(51, 204, 153, 0.6)",
        card: "0 0 30px rgba(0, 0, 0, 0.2)",
        soft: "0 2px 10px rgba(0, 0, 0, 0.1)",
        innerLight: "inset 0 1px 3px rgba(0,0,0,0.05)",
        goldGlow: "0 0 10px rgba(255, 215, 0, 0.4)",

        // Dark Mode Glows (Default)
        "web3-glow-blue": "0 0 15px rgba(33, 150, 243, 0.5)",
        "web3-glow-purple": "0 0 15px rgba(123, 97, 255, 0.5)",
        "web3-glow-blue-strong": "0 0 25px rgba(33, 150, 243, 0.8)",
        "web3-glow-purple-strong": "0 0 25px rgba(123, 97, 255, 0.8)",
        "web3-glow-green": "0 0 15px rgba(51, 204, 153, 0.5)",
        "web3-glow-green-strong": "0 0 25px rgba(51, 204, 153, 0.8)",
        "web3-glow-orange": "0 0 15px rgba(255, 152, 0, 0.5)",
        "web3-glow-orange-strong": "0 0 25px rgba(255, 152, 0, 0.8)",
        "web3-glow-red": "0 0 15px rgba(239, 83, 80, 0.5)",
        "web3-glow-red-strong": "0 0 25px rgba(239, 83, 80, 0.8)",
        "web3-glow-blue-soft": "0 0 8px rgba(33, 150, 243, 0.3)",
        "web3-glow-purple-soft": "0 0 8px rgba(123, 97, 255, 0.3)",
        "web3-glow-green-soft": "0 0 8px rgba(51, 204, 153, 0.3)",
        "web3-glow-orange-soft": "0 0 8px rgba(255, 152, 0, 0.3)",
        "web3-glow-red-soft": "0 0 8px rgba(239, 83, 80, 0.3)",

        // Light Mode Glows (match new accents, stronger for glitch)
        "light-web3-glow-blue": "0 0 20px rgba(59, 130, 246, 0.6)",
        "light-web3-glow-purple": "0 0 20px rgba(139, 92, 246, 0.6)",
        "light-web3-glow-blue-strong": "0 0 30px rgba(59, 130, 246, 0.9)",
        "light-web3-glow-purple-strong": "0 0 30px rgba(139, 92, 246, 0.9)",
        "light-web3-glow-green": "0 0 20px rgba(34, 197, 94, 0.6)",
        "light-web3-glow-green-strong": "0 0 30px rgba(34, 197, 94, 0.9)",
        "light-web3-glow-orange": "0 0 20px rgba(249, 115, 22, 0.6)",
        "light-web3-glow-orange-strong": "0 0 30px rgba(249, 115, 22, 0.9)",
        "light-web3-glow-red": "0 0 20px rgba(220, 38, 38, 0.6)",
        "light-web3-glow-red-strong": "0 0 30px rgba(220, 38, 38, 0.9)",
        "light-web3-glow-blue-soft": "0 0 10px rgba(59, 130, 246, 0.3)",
        "light-web3-glow-purple-soft": "0 0 10px rgba(139, 92, 246, 0.3)",
        "light-web3-glow-green-soft": "0 0 10px rgba(34, 197, 94, 0.3)",
        "light-web3-glow-orange-soft": "0 0 10px rgba(249, 115, 22, 0.3)",
        "light-web3-glow-red-soft": "0 0 10px rgba(220, 38, 38, 0.3)",
      },
      backgroundImage: {
        "premium-dark":
          "radial-gradient(circle at 30% 30%, rgba(33,150,243,0.05), rgba(123,97,255,0.03))",
        "grid-overlay":
          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        "web3-gradient":
          "linear-gradient(135deg, var(--tw-colors-web3-gradient-start), var(--tw-colors-web3-gradient-end))",

        // Light Mode Backgrounds (updated)
        "light-premium-dark":
          "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.05), rgba(139,92,246,0.03))",
        "light-grid-overlay":
          "linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)",
        "light-web3-gradient":
          "linear-gradient(135deg, var(--tw-colors-light-web3-gradient-start), var(--tw-colors-light-web3-gradient-end))",
      },
      keyframes: {
        "pulse-light": {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.2)" },
        },
        "glitch-1": {
          "0%, 10%, 100%": { opacity: "0" },
          "2%": { transform: "translate(2px, 2px)", opacity: "0.8" },
          "4%": { transform: "translate(-2px, -2px)", opacity: "0.8" },
          "6%": { transform: "translate(2px, -2px)", opacity: "0.8" },
          "8%": { transform: "translate(-2px, 2px)", opacity: "0.8" },
        },
        "glitch-2": {
          "0%, 10%, 100%": { opacity: "0" },
          "3%": { transform: "translate(-3px, 3px)", opacity: "0.6" },
          "5%": { transform: "translate(3px, -3px)", opacity: "0.6" },
          "7%": { transform: "translate(-3px, -3px)", opacity: "0.6" },
          "9%": { transform: "translate(3px, 3px)", opacity: "0.6" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "pulse-bg": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.35" },
        },
        "pulse-bg-2": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.35" },
        },
        "fade-in-up-delay": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        "border-pulse": {
          "0%, 100%": { borderColor: "rgba(33, 150, 243, 0.5)", boxShadow: "0 0 10px rgba(33, 150, 243, 0.6)" },
          "50%": { borderColor: "rgba(123, 97, 255, 0.7)", boxShadow: "0 0 20px rgba(123, 97, 255, 0.8)" },
        },
        "scatter-glow": {
          "0%": { transform: "scale(1) translate(0, 0)", opacity: "0.1" },
          "25%": { transform: "scale(1.02) translate(5px, -5px)", opacity: "0.2" },
          "50%": { transform: "scale(1.05) translate(0, 0)", opacity: "0.3" },
          "75%": { transform: "scale(1.02) translate(-5px, 5px)", opacity: "0.2" },
          "100%": { transform: "scale(1) translate(0, 0)", opacity: "0.1" },
        }
      },
      animation: {
        "pulse-light": "pulse-light 4s ease-in-out infinite",
        "glitch-1": "glitch-1 2.5s infinite steps(1)",
        "glitch-2": "glitch-2 2.5s infinite steps(1) 0.5s",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "scale-up": "scale-up 0.3s ease-out forwards",
        "pulse-bg": "pulse-bg 10s infinite alternate ease-in-out",
        "pulse-bg-2": "pulse-bg-2 12s infinite alternate ease-in-out reverse",
        "fade-in-up-delay": "fade-in-up-delay 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "border-pulse": "border-pulse 4s infinite alternate ease-in-out",
        "scatter-glow": "scatter-glow 15s infinite alternate ease-in-out",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
