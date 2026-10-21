module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  rules: {
    'no-console': 'off'
  }
};