module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    camelcase: 0,
    'no-unused-expressions': 0,
  },
}
