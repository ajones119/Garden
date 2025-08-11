import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    solidJs({
      include: ['**/Solid/**'],
    }),
    react({
      include: ['**/React/**'],
    }),
    
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});