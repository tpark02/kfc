// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); 

  return {
    base: "/",
    plugins: [react()],
    define: {
      global: "globalThis",
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
      dedupe: ["@emotion/react", "@emotion/styled"],
    },
    build: {
      // 쓰레드 수 제한으로 동시 열기 줄이기
      chunkSizeWarningLimit: 2000, // 선택 사항
      rollupOptions: {
        // 기타 설정 유지
      },
    },
  };
});
