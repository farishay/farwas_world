import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [tailwindcss(), tanstackStart({
    server: {
      entry: "server",
    },
  }), cloudflare({
    viteEnvironment: {
      name: "ssr"
    }
  })],
});