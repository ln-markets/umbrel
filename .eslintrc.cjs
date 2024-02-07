module.exports = {
  env: {
    es2022: true,
    node: true,
    browser: true,
  },
  overrides: [
    {
      files: ['apps/front/src/**/*.{js,vue}'],
      parser: 'vue-eslint-parser',
      extends: [
        'plugin:tailwindcss/recommended',
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'prettier',
      ],
      plugins: ['tailwindcss'],
      rules: {
        'tailwindcss/no-custom-classname': 'off',
        'import/named': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['**/node_modules', '**/dist/**'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
}
