// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,

      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
    storageKey: "wedding-theme",
  },
  supabase: {
    redirect: false,
  },
});
