import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/API"),
    },
  },
  build: {
    sourcemap: false,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
