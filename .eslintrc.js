module.exports = {
  extends: [
    // 'plugin:vue/vue3-recommended',
    // 'prettier', // disables rules conflicting with Prettier
  ],
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
}
