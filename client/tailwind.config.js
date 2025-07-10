/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // Enables dark mode globally via class strategy
  theme: {
    extend: {
      // Best color combination for Web3
      colors: {
        // Core Palette
        "web3-dark-bg": "#0D1117", // Deep charcoal for main backgrounds (GitHub dark mode inspired)
        "web3-card": "#161B22", // Slightly lighter charcoal for cards and sections
        "web3-border": "#30363D", // Subtle grey for borders and dividers
        "web3-text-primary": "#C9D1D9", // Light grey for main text
        "web3-text-secondary": "#8B949E", // Muted grey for secondary text, labels

        // Accent Colors (often used for branding, CTAs, highlights)
        "web3-accent-blue": "#2196F3", // Vibrant blue for primary actions, links
        "web3-accent-purple": "#7B61FF", // Modern purple for unique elements, active states
        "web3-accent-green": "#33CC99", // Fresh green for success states, positive indicators
        "web3-accent-orange": "#FF9800", // Warm orange for warnings, secondary CTAs

        // Specific UI Element Colors
        "web3-input-bg": "#010409", // Very dark for input fields to provide contrast
        "web3-placeholder": "#545D68", // Muted grey for placeholder text
        "web3-success": "#33CC99", // Confirmed green for success messages
        "web3-warning": "#FFB300", // Amber for warning messages
        "web3-error": "#EF5350", // Red for error messages

        // Shadow Colors (Subtle and modern)
        "web3-shadow-soft": "rgba(0, 0, 0, 0.2)", // Gentle shadow for cards
        "web3-shadow-deep": "rgba(0, 0, 0, 0.4)", // Deeper shadow for elevated elements

        // Gradient Colors (for backgrounds or special elements)
        "web3-gradient-start": "#2A0055", // Deep purple for gradients
        "web3-gradient-end": "#001D3D", // Dark blue for gradients
      },

      fontFamily: {
        futuristic: ["Orbitron", "sans-serif"], // Good for titles, headings
        mono: ["Fira Code", "monospace"], // Excellent for code snippets, hashes
        sans: ["Inter", "sans-serif"], // Modern, highly readable for body text (add Inter to your project)
      },
      boxShadow: {
        neon: "0 0 12px rgba(123, 97, 255, 0.6)", // Purple neon glow
        cyan: "0 0 12px rgba(0,255,255,0.6)",
        green: "0 0 12px rgba(51, 204, 153, 0.6)", // Green neon glow
        card: "0 0 30px rgba(0, 0, 0, 0.2)", // Subtle, dark card shadow
        soft: "0 2px 10px rgba(0, 0, 0, 0.1)",
        innerLight: "inset 0 1px 3px rgba(0,0,0,0.05)",
        goldGlow: "0 0 10px rgba(255, 215, 0, 0.4)", // A more traditional gold glow
        "web3-glow-blue": "0 0 15px rgba(33, 150, 243, 0.5)", // Accent blue glow
        "web3-glow-purple": "0 0 15px rgba(123, 97, 255, 0.5)", // Accent purple glow
      },
      backgroundImage: {
        "premium-dark":
          "radial-gradient(circle at 30% 30%, rgba(33,150,243,0.05), rgba(123,97,255,0.03))", // Subtle blend of accent colors
        "grid-overlay":
          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        "web3-gradient":
          "linear-gradient(135deg, var(--tw-colors-web3-gradient-start), var(--tw-colors-web3-gradient-end))", // Modern web3 gradient
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
      },
      animation: {
        "pulse-light": "pulse-light 4s ease-in-out infinite",
        "glitch-1": "glitch-1 2.5s infinite steps(1)",
        "glitch-2": "glitch-2 2.5s infinite steps(1) 0.5s",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "scale-up": "scale-up 0.3s ease-out forwards",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};