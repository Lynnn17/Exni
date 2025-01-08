import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser", // Menggunakan terser untuk minifikasi
    terserOptions: {
      format: {
        comments: false, // Menghapus semua komentar
      },
      compress: {
        drop_console: true, // Menghapus console.log
        drop_debugger: true, // Menghapus debugger
      },
    },
  },
});
