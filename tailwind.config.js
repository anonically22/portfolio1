/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0E0E10",
          lighter: "#1A1A1D",
          border: "#2A2A2D",
        },
        accent: {
          red: "#EF4444",
          violet: "#8B5CF6",
          cyan: "#06B6D4",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#A0A0A0",
          muted: "#6B6B6B",
        },
      },
      fontFamily: {
        serif: ["IBM Plex Serif", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["10rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["6rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["4rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        glow: "glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        tilt: "tilt 10s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(239, 68, 68, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg)" },
          "75%": { transform: "rotate(-1deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
