import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages 주소(https://eunji9204-max.github.io/portfolio-web/) 하위 경로
  base: "/portfolio-web/",
  plugins: [react(), tailwindcss()],
});
