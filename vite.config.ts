// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base:
    process.env.DEPLOY_TARGET === "github-pages"
      ? "/karsdraget-strecklistan/"
      : "/",
});
