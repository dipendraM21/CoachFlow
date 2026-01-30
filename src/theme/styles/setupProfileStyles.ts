import { StyleSheet } from 'react-native';
import colors from '../colors';
import { fontFamily, RFont } from '../fonts';
import { globalStyles } from '../globalStyles';

export const setupProfileStyles = StyleSheet.create({
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
    paddingVertical: RFont(20),
    paddingBottom: RFont(100),
    ...globalStyles.alignItemsCenter,
  },
  cardContainer: {
    width: '100%',
    ...globalStyles.alignItemsCenter,
  },
  title: {
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(24),
    fontWeight: '700',
    color: colors.black,
    marginBottom: RFont(32),
    ...globalStyles.textLeft, // Align left as per design image
    width: '100%', // Ensure it takes full width to align left
  },
  profilePictureContainer: {
    ...globalStyles.alignItemsCenter,
    marginBottom: RFont(32),
  },
  formContainer: {
    width: '100%',
    ...globalStyles.alignItemsCenter,
  },
  buttonContainer: {
    width: '100%',
    paddingTop: RFont(24),
    paddingBottom: RFont(90), // Increased to clear Bottom Tab Bar
  },
});
