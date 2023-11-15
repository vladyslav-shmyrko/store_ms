module.exports = {
  extends: ['eslint-config-commonjs', 'plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'script',
  },
  env: {
    node: true,
  },
};
