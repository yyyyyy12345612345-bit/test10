import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#080808",
        smoke: "#0f0f0f",
        ash: "#1a1a1a",
        mist: "#242424",
        fog: "#3a3a3a",
        silver: "#8a8a8a",
        pearl: "#d4d4d4",
        snow: "#f0f0f0",
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c97c",
          dark: "#a07830",
        },
        danger: "#e53e3e",
        success: "#38a169",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 10vw, 10rem)", { lineHeight: "0.9" }],
        "display-lg": ["clamp(3rem, 7vw, 7rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(2rem, 5vw, 5rem)", { lineHeight: "1.0" }],
        "display-sm": ["clamp(1.5rem, 3vw, 3rem)", { lineHeight: "1.1" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
        "144": "36rem",
      },
      animation: {
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee 25s linear infinite reverse",
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "cursor-blink": "cursor-blink 1.2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-noir": "linear-gradient(135deg, #080808 0%, #1a1a1a 50%, #080808 100%)",
        "gradient-gold": "linear-gradient(135deg, #c9a84c 0%, #e8c97c 50%, #c9a84c 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 50%, transparent 100%)",
        "noise": "url('/noise.png')",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
        "gold-glow": "0 0 30px rgba(201,168,76,0.3), 0 0 60px rgba(201,168,76,0.1)",
        "card": "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
        "inset-gold": "inset 0 0 0 1px rgba(201,168,76,0.3)",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "circ-out": "cubic-bezier(0, 0.55, 0.45, 1)",
        "back-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
