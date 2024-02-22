import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  server: {
    port: 5173,
    host: "0.0.0.0"
  },
  plugins: [react(), svgr()],
  build: {
    manifest: true,
    target: "esnext",
    chunkSizeWarningLimit: 1500
  },
});
