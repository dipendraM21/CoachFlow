module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', 'android/', 'ios/', '.bundle/'],
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
