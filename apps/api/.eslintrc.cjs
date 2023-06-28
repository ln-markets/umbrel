module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  globals: {
    require: true,
    module: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/**'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
}
