import { cloudflare } from "@cloudflare/vite-plugin";
import { holocron } from "@holocron.so/vite";
import { defineConfig } from "vite-plus";

const IGNORED_TOOLING = [".agent/**", ".agents/**", ".claude/**", ".codex/**", ".cursor/**"];

export default defineConfig({
  clearScreen: false,
  plugins: [
    holocron({ pagesDir: "./src" }),
    cloudflare({ viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] } }),
  ],
  staged: {
    "*.{js,jsx,json,ts,tsx}": "vp check --fix",
  },
  fmt: {
    ignorePatterns: IGNORED_TOOLING,
  },
  lint: {
    ignorePatterns: IGNORED_TOOLING,
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      complexity: "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
});
