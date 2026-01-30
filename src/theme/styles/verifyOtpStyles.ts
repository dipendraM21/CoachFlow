import { StyleSheet } from 'react-native';
import colors from '../colors';
import { fontFamily, RFont } from '../fonts';
import { globalStyles } from '../globalStyles';

export const verifyOtpStyles = StyleSheet.create({
  container: {
    ...globalStyles.flex1,
    backgroundColor: colors.backgroundLight,
  },
  keyboardAvoidingView: {
    ...globalStyles.flex1,
  },
  content: {
    ...globalStyles.flex1,
    paddingHorizontal: RFont(24),
  },
  scrollView: {
    ...globalStyles.flex1,
  },
  scrollContent: {
    flexGrow: 1,
    ...globalStyles.justifyContentCenter,
    ...globalStyles.alignItemsCenter,
    paddingVertical: RFont(60),
    paddingBottom: RFont(140),
  },
  titleSection: {
    width: '100%',
    ...globalStyles.alignItemsCenter,
    marginBottom: RFont(56),
    paddingHorizontal: RFont(20),
  },
  titleContainer: {
    ...globalStyles.alignItemsCenter,
    marginBottom: RFont(16),
  },
  title: {
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(32),
    color: colors.black,
    ...globalStyles.textAlignCenter,
    letterSpacing: RFont(-0.8),
    lineHeight: RFont(40),
  },
  titleAccent: {
    width: RFont(40),
    height: RFont(4),
    backgroundColor: colors.black,
    borderRadius: RFont(2),
    marginTop: RFont(8),
  },
  subtitle: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(16),
    color: colors.gray,
    ...globalStyles.textAlignCenter,
    lineHeight: RFont(24),
    letterSpacing: RFont(0.3),
  },
  phoneNumberHighlight: {
    fontFamily: fontFamily.MaisonMedium,
    color: colors.black,
  },
  otpSection: {
    width: '100%',
    ...globalStyles.alignItemsCenter,
    paddingHorizontal: RFont(20),
    marginBottom: RFont(24),
  },
  timerSection: {
    width: '100%',
    ...globalStyles.alignItemsCenter,
    marginBottom: RFont(16),
    paddingHorizontal: RFont(20),
  },
  timerText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    color: colors.gray,
    ...globalStyles.textAlignCenter,
    lineHeight: RFont(20),
  },
  timerValue: {
    fontFamily: fontFamily.MaisonMedium,
    color: colors.black,
  },
  resendButton: {
    paddingVertical: RFont(8),
    paddingHorizontal: RFont(16),
    ...globalStyles.alignItemsCenter,
    ...globalStyles.justifyContentCenter,
  },
  resendText: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    color: colors.black,
    ...globalStyles.textAlignCenter,
    textDecorationLine: 'underline',
    letterSpacing: RFont(0.3),
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 0,
    paddingTop: RFont(12),
  },
  changeNumberContainer: {
    marginTop: RFont(24),
    ...globalStyles.alignItemsCenter,
    ...globalStyles.justifyContentCenter,
  },
  changeNumberButton: {
    paddingVertical: RFont(16),
    paddingHorizontal: RFont(24),
    ...globalStyles.alignItemsCenter,
    ...globalStyles.justifyContentCenter,
    minHeight: RFont(44),
  },
  changeNumberText: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(16),
    color: colors.black,
    ...globalStyles.textAlignCenter,
    letterSpacing: RFont(0.3),
  },
});
