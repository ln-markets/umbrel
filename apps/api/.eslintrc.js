module.exports = {
  extends: [
    'standard',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],
  plugins: ['import', 'prettier', 'promise'],
  env: {
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'space-before-function-paren': 'off',
    'new-cap': 'off',
    camelcase: 'off',
    'import/no-unresolved': ['error', { commonjs: true }],
    'import/no-extraneous-dependencies': 'error',
    'node/shebang': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-require': 'off',
    'no-global-assign': ['error', { exceptions: ['require'] }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.json'],
      },
    },
  },
}
