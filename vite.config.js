import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), tailwindcss(), compression(), visualizer({ open: false })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom"))
              return "react-vendor"; // ან უბრალოდ 'react'
            if (id.includes("gsap")) return "gsap";
            if (id.includes("three")) return "three";
            if (id.includes("swiper")) return "swiper";
            return "vendor";
          }
        },
      },
    },
  },
});
