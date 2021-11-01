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
    'no-unused-vars': ['error', { args: 'none' }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'vue/no-multiple-template-root': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'require-await': 'error',
    'no-return-await': 'error',
    'no-return-assign': 'error',
    eqeqeq: 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
  },
}
