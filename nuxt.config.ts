// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from "nuxt/config";

const runtimeConfig: NuxtConfig["runtimeConfig"] = {
  public: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GEMINI_API_KEY: process.env.GOOGLE_GEMINI_KEY,
  },
};

export default defineNuxtConfig({
  runtimeConfig,
  srcDir: "./src",
  devtools: { enabled: true },
  css: ["~/assets/app-view-styles.css"],
  imports: {
    dirs: ["./store/**", "./composables/**"],
  },
  modules: ["@pinia/nuxt"],
  vite: {},
});
