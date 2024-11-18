import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy-image": {
        target: "https://drive.google.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy-image/, ""), // Hapus "/proxy-image"
      },
    },
  },
});
