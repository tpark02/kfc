import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  
  return {
    base: "/",
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
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
  };
});
