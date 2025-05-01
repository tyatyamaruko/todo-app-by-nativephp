import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "resources/js/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;