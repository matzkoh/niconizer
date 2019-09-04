/** @type {import('prettier').Options} */
module.exports = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 80,
        semi: true,
        singleQuote: false,
        trailingComma: 'none',
      },
    },
  ],
}
