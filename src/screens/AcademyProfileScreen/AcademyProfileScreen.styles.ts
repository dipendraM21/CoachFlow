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
    paddingHorizontal: RFont(20),
    paddingTop: RFont(8), // Further reduced from 16
    paddingBottom: RFont(32),
  },
  profileSection: {
    marginBottom: RFont(16), // Further reduced from 24
  },
  // New Card Style for Profile Summary
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: RFont(20),
    padding: RFont(16), // Increased from 12 to provide bottom clearance
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: RFont(4) },
    shadowOpacity: 0.08,
    shadowRadius: RFont(16),
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    // Removed alignItems: 'center' to allow horizontal layout
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: RFont(16),
    marginBottom: RFont(16),
  },
  logoContainer: {
    // Removed marginBottom: 12
  },
  logo: {
    width: RFont(52), // Reduced from 64
    height: RFont(52),
    borderRadius: RFont(26),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoPlaceholder: {
    width: RFont(52),
    height: RFont(52),
    borderRadius: RFont(26),
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
    width: RFont(24), // Reduced from 32
    height: RFont(2),
    backgroundColor: '#3B82F6',
    borderRadius: RFont(1),
  },
  plusVertical: {
    position: 'absolute',
    width: RFont(2),
    height: RFont(24), // Reduced from 32
    backgroundColor: '#3B82F6',
    borderRadius: RFont(1),
  },
  logoText: {
    ...fontStyles.Maison_600_16PX_20LH,
    color: '#64748B',
  },
  academyName: {
    ...fontStyles.Maison_600_24PX_32LH,
    color: '#0F172A',
    flex: 1,
    fontWeight: '700',
    fontSize: RFont(18), // Slightly smaller
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: RFont(12),
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(12),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: RFont(8),
    marginBottom: RFont(16),
  },
  locationText: {
    ...fontStyles.Maison_600_14PX_18LH,
    color: '#0F172A',
    fontWeight: '600',
    flex: 1,
    lineHeight: RFont(20),
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: RFont(12), // Strict gap from Batch Card
    width: '100%',
    marginVertical: RFont(8),
  },
  callButtonWrapper: {
    flex: 1,
  },
  emailButtonWrapper: {
    flex: 1,
  },
  contactButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: RFont(100),
    height: RFont(38), // Reduced from 44
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  contactButtonText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: RFont(13), // Reduced from 15
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
  // Tabs
  tabsContainer: {
    backgroundColor: '#F1F5F9', // Slate-100 background for the track
    borderRadius: RFont(100),
    padding: RFont(4),
    marginBottom: RFont(24),
    flexDirection: 'row',
  },
  tabsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(8),
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFont(10),
    paddingHorizontal: RFont(20),
    borderRadius: RFont(100),
    gap: RFont(6),
  },
  tabButtonActive: {
    backgroundColor: '#0F172A', // Slate-900
  },
  tabText: {
    ...fontStyles.Maison_600_14PX_18LH,
    color: '#0F172A',
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.white,
  },
  checkIcon: {
    marginLeft: RFont(2),
  },
});
