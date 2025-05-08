import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ src 전체 커버 (app 포함됨)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
