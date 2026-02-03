import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const academyProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate-50, more premium than F5FAFA
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: RFont(20),
    paddingBottom: RFont(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9', // Slate-100
  },
  backButton: {
    width: RFont(40),
    height: RFont(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -RFont(8), // Align visually with left edge
  },
  headerTitle: {
    ...fontStyles.Maison_700_16PX_22LH, // Bolder, slightly smaller for clean look
    fontSize: RFont(18),
    color: '#0F172A', // Slate-900
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: RFont(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: RFont(20),
    paddingBottom: RFont(32),
  },
  profileSection: {
    marginBottom: RFont(32),
  },
  // New Card Style for Profile Summary
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: RFont(24),
    padding: RFont(24),
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: RFont(4) },
    shadowOpacity: 0.08,
    shadowRadius: RFont(16),
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: RFont(16),
  },
  logo: {
    width: RFont(80),
    height: RFont(80),
    borderRadius: RFont(40),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0', // Slate-200
  },
  logoPlaceholder: {
    width: RFont(80),
    height: RFont(80),
    borderRadius: RFont(40),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoIconWrapper: {
    width: RFont(40),
    height: RFont(40),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plusHorizontal: {
    position: 'absolute',
    width: RFont(40),
    height: RFont(3),
    backgroundColor: '#3B82F6', // Blue-500
    borderRadius: RFont(1.5),
  },
  plusVertical: {
    position: 'absolute',
    width: RFont(3),
    height: RFont(40),
    backgroundColor: '#3B82F6',
    borderRadius: RFont(1.5),
  },
  logoText: {
    ...fontStyles.Maison_600_16PX_20LH,
    color: '#64748B',
  },
  academyName: {
    ...fontStyles.Maison_600_24PX_32LH,
    color: '#0F172A',
    marginBottom: RFont(12),
    textAlign: 'center',
    fontWeight: '700',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: RFont(100),
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(8),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: RFont(6),
    marginBottom: RFont(24),
  },
  locationText: {
    ...fontStyles.Maison_600_14PX_18LH, // Keeping 14px as per image reference
    color: '#0F172A',
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: RFont(12), // Strict gap from Batch Card
    width: '100%',
    marginTop: RFont(8),
  },
  callButtonWrapper: {
    flex: 1,
  },
  emailButtonWrapper: {
    flex: 1,
  },
  contactButton: {
    backgroundColor: '#DBEAFE', // Blue-100 (Light Blue aka "Light Periwinkle" approx)
    borderRadius: RFont(100), // Fully rounded pill shape
    height: RFont(48),
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  contactButtonText: {
    color: '#1D4ED8', // Blue-700 (Dark Blue)
    fontWeight: '700',
    fontSize: RFont(16),
  },
  batchesSection: {
    marginTop: RFont(0),
  },
  sectionTitle: {
    ...fontStyles.Maison_700_16PX_22LH,
    color: '#0F172A',
    marginBottom: RFont(16),
    textTransform: 'uppercase',
    letterSpacing: RFont(0.5),
    fontSize: RFont(14), // Smaller, uppercase label style
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFont(40),
  },
  errorContainer: {
    padding: RFont(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFont(40),
  },
  errorText: {
    ...fontStyles.Maison_600_18PX_24LH,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: RFont(16),
  },
  noBatchesText: {
    ...fontStyles.Maison_600_16PX_20LH,
    color: '#64748B',
    textAlign: 'center',
    marginTop: RFont(20),
  },
});
