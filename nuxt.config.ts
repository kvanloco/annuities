// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@pinia/nuxt", "nuxt-gtag"],
  compatibilityDate: "2024-08-27",
  gtag: {
    id: "G-LYKQ3GTX77",
  },
});
