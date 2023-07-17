/** @type {import('prettier').Options} */
module.exports = {
  arrowParens: 'avoid',
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.{md,yaml,yml}',
      options: {
        semi: true,
        singleQuote: false,
        trailingComma: 'none',
      },
    },
  ],
}
