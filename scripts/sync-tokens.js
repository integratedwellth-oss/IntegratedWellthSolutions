import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_PATH = path.resolve(__dirname, "../tokens.json");
const OUTPUT_PATH = path.resolve(__dirname, "../tailwind-theme.json");

const generateTailwindConfig = () => {
  try {
    const rawTokens = fs.readFileSync(TOKENS_PATH, "utf8");
    const tokens = JSON.parse(rawTokens);

    const config = {
      theme: {
        extend: {
          colors: {
            brand: {
              DEFAULT: tokens.color.primary.value,
              gold: tokens.color.gold.value,
              dark: tokens.color.primary.value
            }
          },
          borderRadius: {
            card: tokens.radius.lg.value
          }
        }
      }
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(config, null, 2));
    console.log("Tokens synchronized to tailwind-theme.json.");
  } catch (error) {
    console.error("Failed to generate design token assets:", error.message);
  }
};

generateTailwindConfig();
