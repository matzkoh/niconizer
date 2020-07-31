/** @type {import('prettier').Options} */
module.exports = {
  arrowParens: 'avoid',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.{md,yaml,yml}',
      options: {
        printWidth: 80,
        semi: true,
        singleQuote: false,
        trailingComma: 'none',
      },
    },
  ],
}
