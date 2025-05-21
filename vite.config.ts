import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/styled"],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          global: true,
        }),
      ],
      define: {
        global: "globalThis", // 핵심 설정!
      },
    },
  },
  resolve: {
    dedupe: ["@emotion/react", "@emotion/styled"],
  },
  define: {
    global: "globalThis", // 이 줄도 필수
  },
});
