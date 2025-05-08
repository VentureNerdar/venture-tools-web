import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/global.scss" as *;',
        },
      },
    },
  },
  plugins: ["~/plugins/pinia.ts"],
  runtimeConfig: {
    public: {
      apiURL: "http://localhost:8000/api/",
      apiURLUnSlashed: "http://localhost:8000/api",

      rootURL: "http://localhost:8000/",
      rootURLUnSlashed: "http://localhost:8000",

      // apiURL: "http://api.venture-tools.klonotech.com/api/",
      // apiURLUnSlashed: "http://api.venture-tools.klonotech.com/api",
      //
      // rootURL: "http://api.venture-tools.klonotech.com/",
      // rootURLUnSlashed: "http://api.venture-tools.klonotech.com",

      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        vapidKey: process.env.FIREBASE_VAPID_KEY
      }
    },
  },

  compatibilityDate: "2025-01-04",

  modules: ["@nuxtjs/color-mode"],

  alias: {
    "@/stores": "~/stores",
  },

  colorMode: {
    classSuffix: "",
  },
})
