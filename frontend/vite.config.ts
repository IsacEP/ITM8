import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/ITM8/",
  build: {
    outDir: "docs",
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8000", // Replace with your Django API URL if different
    },
  },
});
