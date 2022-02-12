// 0 = off, 1 = warning, 2 = error

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    semi: [2, 'always'],
    eqeqeq: [2, 'always'],
    'eol-last': [2, 'always'],
    'no-unreachable': 2,
    'no-multi-spaces': 2,
    'space-before-blocks': 2,
    'newline-before-return': 2,
    'no-unexpected-multiline': 2,
    '@typescript-eslint/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
