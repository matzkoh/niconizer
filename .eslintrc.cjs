/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:unicorn/all', 'plugin:import/recommended', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    curly: 'error',
    eqeqeq: 'error',
    'import/consistent-type-specifier-style': 'error',
    'import/default': 'off',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', orderImportKind: 'asc', caseInsensitive: true },
        warnOnUnassignedImports: true,
      },
    ],
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: '*' },
      { blankLine: 'any', prev: 'expression', next: 'expression' },
      { blankLine: 'always', prev: 'multiline-expression', next: 'expression' },
      { blankLine: 'any', prev: '*', next: 'expression' },
      { blankLine: 'any', prev: 'singleline-const', next: 'const' },
      { blankLine: 'any', prev: 'singleline-let', next: 'let' },
      { blankLine: 'any', prev: 'singleline-var', next: 'var' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'any', prev: 'export', next: 'export' },
      { blankLine: 'any', prev: 'cjs-import', next: 'cjs-import' },
      { blankLine: 'any', prev: 'cjs-export', next: 'cjs-export' },
      { blankLine: 'any', prev: 'case', next: ['case', 'default'] },
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'unicorn/explicit-length-check': 'off',
    'unicorn/no-keyword-prefix': ['error', { checkProperties: false }],
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],
      parserOptions: {
        project: 'tsconfig.json',
        loggerFn: s => s.includes('TYPESCRIPT VERSION') || console.log(s),
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: 'tsconfig.base.json',
          },
        },
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': false }],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
          process.env.CI ? 'error' : 'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/require-await': 'off',
        'import/no-commonjs': 'error',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'unicorn/filename-case': 'error',
      },
    },
    {
      files: ['*.{config,d,test}.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}
