/**
 * Safe configuration wrapper to prevent runtime crashes if react-native-config
 * native module is not properly linked or is failing in New Architecture mode.
 */

const DEFAULT_CONFIG = {
  BASE_URL: 'https://vishal-backend-kqvl.onrender.com/api/',
  ANALYTICS_BASE_URL: '',
};

let Config = { ...DEFAULT_CONFIG };

try {
  // Use require instead of import to prevent top-level evaluation crash
  const RNConfig =
    require('react-native-config').default || require('react-native-config');

  if (RNConfig) {
    // Sanitize values (react-native-config sometimes includes quotes)
    const sanitize = (val: string) => {
      if (!val) return '';
      return val.replace(/['"]+/g, '').trim();
    };

    Config = {
      ...DEFAULT_CONFIG,
      ...RNConfig,
      BASE_URL:
        sanitize(RNConfig.BASE_URL) ||
        sanitize(Config.BASE_URL) ||
        DEFAULT_CONFIG.BASE_URL,
    };

    // Ensure trailing slash
    if (Config.BASE_URL && !Config.BASE_URL.endsWith('/')) {
      Config.BASE_URL += '/';
    }
  }
} catch (error) {
  console.warn(
    'Config: react-native-config failed to load, using default settings.',
    error,
  );
}

export default Config;
