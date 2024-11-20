import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy-image": {
        target: "https://drive.google.com",
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/proxy-image/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            console.log("Proxy Request Sent:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log("Proxy Response Status:", proxyRes.statusCode);
          });
        },
      },
    },
  },
});
