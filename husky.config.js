const autoInstall = 'git diff "HEAD@{1}" --name-only | grep -Eq "^package(-lock)?\\.json$" && npm install'

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'post-merge': autoInstall,
    'post-rebase': autoInstall,
  },
}
