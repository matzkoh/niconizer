module.exports = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: 'package.json',
      options: {
        parser: 'package-json',
      },
    },
  ],
}
