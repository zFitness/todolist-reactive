import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const lifecycle = process.env.npm_lifecycle_event;

// https://vitejs.dev/config/
export default defineConfig({
  base: "todolist-reactive",
  plugins: [
    react(),
    lifecycle === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "./dist/report/index.html" })
      : null,
  ],
});
