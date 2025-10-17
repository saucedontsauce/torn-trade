// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: false,           // don’t auto-open browser
      filename: "bundle-report.html",
      gzipSize: true,
      brotliSize: true,
      emitFile: true,
    }),
  ],
  base: mode === "production" ? "/torn-trade/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) return "firebase";
            if (id.includes("react") || id.includes("react-router"))
              return "react";
            return "vendor";
          }
        },
      },
    },
  },
}));
