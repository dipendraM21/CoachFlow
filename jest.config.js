module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-toast-message|@react-native-async-storage|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-svg|react-native-element-dropdown|react-native-date-picker|react-native-image-picker|react-native-config)/)',
  ],
};
