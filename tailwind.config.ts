import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
      },
      // Core "Heritage Dark" Theme
      colors: {
        background: "#0A0A0B", // Midnight Gallery Base
        surface: {
          // Elevation colors
          50: "#F7F3F0",
          100: "#F5F3F0",
          200: "#E8E4E0",
          300: "#D4CECA",
          400: "#B5AFA5",
          500: "#8B8580",
          600: "#5D5651",
          700: "#3F3935",
          800: "#232220",
          900: "#161618", // Card Elevation
          950: "#0A0A0B",
        },
        heritage: {
          // Accent Palette
          gold: "#D4AF37", // Heritage Gold
          champagne: "#F7E7CE", // Champagne
          bronze: "#CD7F32",
          silver: "#C0C0C0",
        },
        accent: {
          // UI Accents
          success: "#10B981",
          error: "#EF4444",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
      },
      fontFamily: {
        // High-end font pairing
        display: ["Playfair Display", ...defaultTheme.fontFamily.serif], // For "Guestbook" titles
        serif: ["Instrument Serif", ...defaultTheme.fontFamily.serif],
        sans: ["Geist", ...defaultTheme.fontFamily.sans], // For functional UI
        mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
      },

      // Glassmorphism Effects
      backgroundColor: {
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-dark": "rgba(0, 0, 0, 0.3)",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
      },
      boxShadow: {
        glass: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        "glass-lg": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },

      // Custom Animations & Effects
      animation: {
        shimmer: "shimmer 2s infinite",
        glow: "glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      // Utility
      fontSize: {
        "2xs": "0.625rem",
      },
      spacing: {
        safe: "max(env(safe-area-inset-bottom), 1.5rem)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
