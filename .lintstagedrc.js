module.exports = {
  'apps/api/**/*.js': [
    'prettier --write',
    'pnpm run --silent -C apps/api eslint',
  ],
  'apps/front/**/*.{js,vue,css}': [
    'prettier --write',
    'pnpm run --silent -C apps/front eslint',
  ],
}
