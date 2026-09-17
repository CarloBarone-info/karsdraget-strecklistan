import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],

      include: ["src/test/**/*.{test,spec}.{ts,tsx}"],

      coverage: {
        provider: "v8",
        reporter: ["text", "html"],

        include: ["src/**/*.{ts,tsx}"],

        exclude: ["src/main.tsx", "src/vite-env.d.ts", "src/test/**"],

        thresholds: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
    },
  }),
);
