import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],

      coverage: {
        provider: "v8",
        reporter: ["text", "html"],

        include: ["src/**/*.{ts,tsx}"],

        exclude: ["src/main.tsx", "src/vite-env.d.ts", "src/test/**"],

        thresholds: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  }),
);
