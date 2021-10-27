module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  globals: {
    window: true,
  },
  ignorePatterns: ['**/*.css'],
  extends: [
    'plugin:tailwindcss/recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  plugins: ['prettier', 'tailwindcss'],
  rules: {
    camelcase: 0,
    'prefer-destructuring': ['error', { object: true, array: true }],
    'no-unused-vars': ['error', { args: 'none' }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'vue/no-multiple-template-root': 'off',
  },
}
