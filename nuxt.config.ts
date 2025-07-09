import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  router: {
    options: {
      hashMode: true
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?loading=async&libraries=places&key=${process.env.GOOGLE_MAPS_API_KEY}`,
          async: true,
          defer: true,
        },

        // {
        //   src: `https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=${process.env.GOOGLE_MAPS_API_KEY}`,
        //   async: true,
        //   defer: true,
        // }
      ]
    }
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
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      apiURL: process.env.API_URL,
      apiURLUnSlashed: process.env.API_URL_UNSLASHED,

      rootURL: process.env.ROOT_URL,
      rootURLUnSlashed: process.env.ROOT_URL_UNSLASHED,

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

  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/eslint"
  ],

  alias: {
    "@/stores": "~/stores",
  },

  colorMode: {
    classSuffix: "",
  },
})