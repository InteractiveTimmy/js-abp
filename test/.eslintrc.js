module.exports = {
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['jest'],
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'indent': 'off',
    'max-len': ['error', { 'code': 120 }],
    'no-unused-vars': 'off',
  },
};
