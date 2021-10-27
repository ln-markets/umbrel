module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  globals: {
    window: true,
    module: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  plugins: ['prettier'],
  rules: {
    camelcase: 0,
    'prefer-destructuring': ['error', { object: true, array: true }],
    'no-unused-vars': ['error', { args: 'none' }],
    'vue/no-v-html': 0,
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
}
