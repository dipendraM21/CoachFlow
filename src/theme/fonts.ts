import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

/**
 * Font family names for Maison fonts
 * These should match the font filenames (without .otf extension)
 * as configured in react-native.config.js
 *
 * Note: After linking fonts, you must rebuild the app:
 * - iOS: Clean build folder in Xcode, then rebuild
 * - Android: Clean build (./gradlew clean) then rebuild
 */
export const fontFamily = {
  MaisonBold: 'Inter-Bold',
  MaisonDemi: 'Inter-SemiBold',
  MaisonMedium: 'Inter-Medium',
  MaisonRegular: 'Inter-Regular',
};
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 400; // Reference width for design

export const RFont = (fontSize: number) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const scaledSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};
// export const RFont = (n: number, standardScreenHeight = 1000) => {
//   const scaleFactor = 1.3;
//   const adjustedSize = RFValue(n, standardScreenHeight);
//   return (adjustedSize * scaleFactor) / PixelRatio.getFontScale(); // Normalize font scaling
// };

export const fontStyles = StyleSheet.create({
  Maison_400_12PX_14LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    lineHeight: RFont(14),
    verticalAlign: 'auto',
  },
  Maison_400_12PX_16LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    lineHeight: RFont(16),
    verticalAlign: 'auto',
  },
  Maison_400_12PX_17LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    lineHeight: RFont(17),
    verticalAlign: 'auto',
  },

  Maison_400_13PX_15_6LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(13),
    letterSpacing: RFont(0.01 * 13),
    lineHeight: RFont(15.6),
    verticalAlign: 'auto',
  },
  Maison_400_14PX_16LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    lineHeight: RFont(16),
    verticalAlign: 'auto',
  },
  Maison_400_14PX_16_8LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    lineHeight: RFont(16.8),
    verticalAlign: 'auto',
  },
  Maison_400_14PX_18LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    lineHeight: RFont(18),
    verticalAlign: 'auto',
  },

  Maison_400_14PX_18_2LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    lineHeight: RFont(18.2),
    verticalAlign: 'auto',
  },
  Maison_400_16PX_19_2LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(16),
    lineHeight: RFont(19.2),
    verticalAlign: 'auto',
  },
  Maison_400_16PX_20LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(16),
    lineHeight: RFont(20),
    verticalAlign: 'auto',
  },
  Maison_400_16PX_22LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(16),
    letterSpacing: RFont(0.01 * 16),
    lineHeight: RFont(22),
    verticalAlign: 'auto',
  },
  Maison_400_18PX_22LH: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(18),
    lineHeight: RFont(22),
    verticalAlign: 'auto',
  },
  Maison_500_10PX_13LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(10),
    lineHeight: RFont(13),
    verticalAlign: 'auto',
  },
  Maison_500_12PX_14_4LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(12),
    lineHeight: RFont(14.4),
    verticalAlign: 'auto',
  },
  Maison_500_12PX_15_6LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(12),
    lineHeight: RFont(15.6),
    verticalAlign: 'auto',
  },
  Maison_500_12PX_16LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(12),
    lineHeight: RFont(16),
    verticalAlign: 'auto',
  },
  Maison_500_13PX_15_2LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(13),
    letterSpacing: -RFont(0.01 * 13),
    lineHeight: RFont(15.2),
    verticalAlign: 'auto',
  },
  Maison_500_13PX_15_6LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(13),
    lineHeight: RFont(15.6),
    verticalAlign: 'auto',
  },
  Maison_500_13PX_16LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(13),
    lineHeight: RFont(16),
    verticalAlign: 'auto',
  },
  Maison_500_14PX_16_8LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(14),
    lineHeight: RFont(16.8),
    verticalAlign: 'auto',
  },
  Maison_500_14PX_18LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(14),
    lineHeight: RFont(18),
    verticalAlign: 'auto',
  },
  Maison_500_16PX: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    verticalAlign: 'auto',
  },
  Maison_500_16PX_18LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    lineHeight: RFont(18),
    verticalAlign: 'auto',
  },
  Maison_500_16PX_19_2LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    lineHeight: RFont(19.2),
    verticalAlign: 'auto',
  },
  Maison_500_16PX_20LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    letterSpacing: -RFont(0.01 * 16),
    lineHeight: RFont(20),
    verticalAlign: 'auto',
  },
  Maison_500_16PX_20_8: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    lineHeight: RFont(20.8),
    verticalAlign: 'auto',
  },
  Maison_500_16PX_20_8LH_m4LS: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    letterSpacing: -RFont(0.04 * 16),
    lineHeight: RFont(20),
    verticalAlign: 'auto',
  },
  Maison_500_16PX_22LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    letterSpacing: -RFont(0.01 * 16),
    lineHeight: RFont(22),
    verticalAlign: 'auto',
  },
  Maison_500_18PX_21_6LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(18),
    lineHeight: RFont(21.6),
    verticalAlign: 'auto',
  },
  Maison_500_18PX_22LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(18),
    lineHeight: RFont(22),
    verticalAlign: 'auto',
  },
  Maison_500_18PX_24LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(18),
    lineHeight: RFont(24),
    verticalAlign: 'auto',
  },
  Maison_500_20PX_28LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(20),
    lineHeight: RFont(28),
    verticalAlign: 'auto',
  },
  Maison_500_20PX_28LH_NO_ALIGN: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(20),
    lineHeight: RFont(28),
  },
  Maison_500_64PX_60_8LH: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(64),
    lineHeight: RFont(70),
    verticalAlign: 'auto',
  },
  Maison_600_10PX_12LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(10),
    lineHeight: RFont(12),
    verticalAlign: 'auto',
  },
  Maison_600_12PX_14_4LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(12),
    lineHeight: RFont(14.4),
    verticalAlign: 'auto',
  },
  Maison_600_12PX_16LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(12),
    lineHeight: RFont(16),
    verticalAlign: 'auto',
  },
  Maison_600_13PX_15_6LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(13),
    lineHeight: RFont(15.6),
    verticalAlign: 'auto',
  },
  Maison_600_14PX_16_8LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(14),
    lineHeight: RFont(16.8),
    verticalAlign: 'auto',
  },
  Maison_600_14PX_18LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(14),
    lineHeight: RFont(18),
    verticalAlign: 'auto',
  },
  Maison_600_14PX_18_2LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(14),
    lineHeight: RFont(18.2),
    verticalAlign: 'auto',
  },
  Maison_600_14PX_24LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(14),
    lineHeight: RFont(24),
    verticalAlign: 'auto',
  },
  Maison_600_15PX_18LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(15),
    lineHeight: RFont(18),
    verticalAlign: 'auto',
  },
  Maison_600_16PX_19_2LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(16),
    lineHeight: RFont(19.2),
    verticalAlign: 'auto',
  },
  Maison_600_16PX_20LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(16),
    lineHeight: RFont(20),
    verticalAlign: 'auto',
  },
  Maison_600_16PX_20_8LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(16),
    letterSpacing: -RFont(0.02 * 16),
    lineHeight: RFont(20.8),
    verticalAlign: 'auto',
  },
  Maison_600_16PX_22LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(16),
    lineHeight: RFont(22),
    verticalAlign: 'auto',
  },
  Maison_600_18PX_21_6LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(18),
    lineHeight: RFont(21.6),
    verticalAlign: 'auto',
  },
  Maison_600_18PX_22LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(18),
    letterSpacing: -RFont(0.01 * 18),
    lineHeight: RFont(22),
    verticalAlign: 'auto',
  },
  Maison_600_18PX_23_4LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(18),
    lineHeight: RFont(23.4),
    verticalAlign: 'auto',
  },
  Maison_600_18PX_24LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(18),
    lineHeight: RFont(24),
    verticalAlign: 'auto',
  },
  Maison_600_18PX_26LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(18),
    letterSpacing: -RFont(0.32),
    lineHeight: RFont(26),
    verticalAlign: 'auto',
  },
  Maison_600_20PX_26LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(20),
    lineHeight: RFont(26),
    verticalAlign: 'auto',
  },
  Maison_600_20PX_28LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(20),
    lineHeight: RFont(28),
    verticalAlign: 'auto',
  },
  Maison_600_22PX_26_4LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(22),
    lineHeight: RFont(26.4),
    verticalAlign: 'auto',
  },
  Maison_600_24PX_28_8LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(24),
    lineHeight: RFont(28.8),
    verticalAlign: 'auto',
  },
  Maison_600_24PX_30LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(24),
    lineHeight: RFont(30),
    verticalAlign: 'auto',
  },
  Maison_600_24PX_32LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(24),
    lineHeight: RFont(32),
    verticalAlign: 'auto',
  },
  Maison_600_32PX_40LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(32),
    lineHeight: RFont(40),
    verticalAlign: 'auto',
  },
  Maison_600_48PX_53LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(48),
    lineHeight: RFont(53),
    verticalAlign: 'auto',
  },
  Maison_600_48PX_56LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(48),
    lineHeight: RFont(56),
    verticalAlign: 'auto',
  },
  Maison_700_16PX_22LH: {
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(16),
    lineHeight: RFont(22),
    verticalAlign: 'auto',
  },
  Marison_600_12PX_14LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(12),
    lineHeight: RFont(14),
    verticalAlign: 'auto',
  },
  Marison_600_12PX_16LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(12),
    lineHeight: RFont(16),
    verticalAlign: 'auto',
  },
  Marison_600_12PX_16_8LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(12),
    lineHeight: RFont(16.8),
    verticalAlign: 'auto',
  },
  Marison_600_22PX_28LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(22),
    lineHeight: RFont(28),
    verticalAlign: 'auto',
  },
  Marison_600_40PX_44LH: {
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(40),
    lineHeight: RFont(54),
    verticalAlign: 'auto',
  },
});

export const letterSpacingStyles = StyleSheet.create({
  LS_0: { letterSpacing: RFont(0) },
  LS_10_neg: { letterSpacing: -RFont(0.01 * 10) },
  LS_12_Neg: { letterSpacing: -RFont(0.01 * 12) },
  LS_13_Neg: { letterSpacing: -RFont(0.01 * 13) },
  LS_13_Neg_4: { letterSpacing: -RFont(0.04 * 13) },
  LS_13_Pos: { letterSpacing: RFont(0.01 * 13) },
  LS_14_Neg: { letterSpacing: -RFont(0.01 * 14) },
  LS_14_Neg_011: { letterSpacing: -RFont(0.011 * 14) },
  LS_14_Neg_4LS: { letterSpacing: -RFont(0.04 * 14) },
  LS_16_Neg: { letterSpacing: -RFont(0.01 * 16) },
  LS_16_Neg_2LS: { letterSpacing: -RFont(0.02 * 16) },
  LS_16_Neg_3LS: { letterSpacing: -RFont(0.03 * 16) },
  LS_16_Neg_4LS: { letterSpacing: -RFont(0.04 * 16) },
  LS_18_Neg: { letterSpacing: -RFont(0.01 * 18) },
  LS_18_Neg_4: { letterSpacing: -RFont(0.04 * 18) },
  LS_20_Neg: { letterSpacing: -RFont(0.01 * 20) },
  LS_24_Neg: { letterSpacing: -RFont(0.01 * 24) },

  LS_32_Neg_1LS: { letterSpacing: -RFont(0.01 * 32) },
  LS_32_Neg_2: { letterSpacing: -RFont(0.02 * 32) },
  LS_48_Neg_2: { letterSpacing: -RFont(0.02 * 48) },
  LS_64_Neg_1LS: { letterSpacing: -RFont(0.01 * 64) },
});
