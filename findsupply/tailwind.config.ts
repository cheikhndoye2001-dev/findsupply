import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#0A0E1A",
        ink: "#E8ECFA",
        stamp: "#7C5CFF",
        teal: "#22E6B8",
        alert: "#FF4D6D",
        line: "#232B42",
        cardbg: "#121729",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
