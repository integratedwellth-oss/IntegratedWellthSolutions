import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let themeTokens = { theme: { extend: {} } };
try {
  const tokenFile = path.resolve(__dirname, "./tailwind-theme.json");
  if (fs.existsSync(tokenFile)) {
    themeTokens = JSON.parse(fs.readFileSync(tokenFile, "utf8"));
  }
} catch (e) {
  console.warn("Theme tokens file not found or unparseable. Falling back to default layout styling.");
}

export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...themeTokens.theme?.extend?.colors,
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#14b8a6",
          600: "#0d9488",
          900: "#134e4a",
          brown: "#3E2723",
          gold: "#d4af37",
          slate: "#64748b"
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "reveal": "reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1)",
        "scan": "scan 3s linear infinite",
        "fadeIn": "fadeIn 0.5s ease-out forwards"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
        reveal: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" }
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    },
  },
  plugins: [],
}
