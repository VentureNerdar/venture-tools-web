import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import { defineConfig } from "eslint/config"
import nuxt from "eslint-plugin-nuxt"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
      globals: {
        reactive: "readonly",
        ref: "readonly",
        computed: "readonly",
        watch: "readonly",
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
    },
  },
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: { nuxt },
    extends: ["plugin:nuxt/recommended"],
  },
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      "vue/max-attributes-per-line": [
        "warn",
        {
          singleline: 1,
          multiline: 1,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
    },
  },
])
