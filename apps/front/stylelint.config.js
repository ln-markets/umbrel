module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['custom-namespace'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
}
