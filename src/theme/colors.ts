/**
 * Theme Colors
 * Centralized color definitions for the application
 * Each color is defined once and reused to avoid duplication
 */

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  backgroundLight: '#F5FAFA',
  textSecondary: '#94A4B8',
  gray: '#666666',
  grayLight: '#999999',
  grayLighter: '#CCCCCC',
  grayLightest: '#F5F5F5',
  border: '#E0E0E0',
  orange: '#FF6B35',
  orangeLight: '#FF8C66',
  orangeLighter: '#FFB399',
  danger: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#007AFF',
  grey_100: '#E5E5E6',
  red_500: '#FF0000',
  grey_900: '#19191A',
  grey_7A7A7A: '#7A7A7A',
  grey_600: '#62656A',
  secondary_warm_grey: '#DCD5D7',
  black_900: '#1B1B1B',
} as const;

// Type for colors
export type Colors = typeof colors;

// Export default colors object
export default colors;
