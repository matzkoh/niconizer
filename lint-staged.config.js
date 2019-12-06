const add = 'git add'
const eslint = 'eslint --fix'
const prettier = 'prettier --write'
const stylelint = 'stylelint --fix'

module.exports = {
  '*.{css,scss}': [prettier, stylelint, add],
  '*.{html,json,md,yml}': [prettier, add],
  '*.{js,ts}': [eslint, add],
}
