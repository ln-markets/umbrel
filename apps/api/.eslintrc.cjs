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
  plugins: ['no-autofix', 'prefer-arrow'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    'space-before-function-paren': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    camelcase: 'off',
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
  
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-identical-functions': 'off',
  
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@ln-markets/**',
            group: 'internal',
          },
          {
            pattern: '#src/**',
            group: 'internal',
          },
        ],
      },
    ],
  
    'no-autofix/jsdoc/require-jsdoc': 'off',

    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
  settings: {
    'import/core-modules': [
      'node:process',
      'node:async_hooks',
      'node:console',
      'node:os',
      'node:net',
      'node:crypto',
      'node:buffer',
      'node:timers',
      'node:querystring',
      'node:url',
      'node:http',
      'node:path',
      'node:fs',
      'node:fs/promises',
      'node:https',
      'node:v8',
      'node:worker_threads',
      'zx/globals',
    ],
    'import/resolver': {
      alias: {
        map: [
          ['#src', './src'],
        ],
        extensions: ['.js', '.json'],
      },
    },
  },
}
