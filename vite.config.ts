import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  base: "/kfc/",
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/styled"],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
      define: {
        global: "globalThis",
      },
    },
  },
  resolve: {
    dedupe: ["@emotion/react", "@emotion/styled"],
  },
  define: {
    global: "globalThis",
  },
});
