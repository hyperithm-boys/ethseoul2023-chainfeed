import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ethseoul2023-chainfeed/",
  plugins: [svgr(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "testSetup.ts",
  },
});
