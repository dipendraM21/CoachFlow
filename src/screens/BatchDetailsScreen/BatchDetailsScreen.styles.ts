import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const batchDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Lighter, cooler grey
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC', // Match bg
    paddingHorizontal: RFont(20),
    paddingBottom: RFont(16),
    // Removed shadow for cleaner look
  },
  backButton: {
    width: RFont(40),
    height: RFont(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: RFont(20),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    ...fontStyles.Maison_600_16PX_20LH,
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    fontSize: RFont(16),
  },
  headerSpacer: {
    width: RFont(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: RFont(20),
    paddingTop: RFont(4),
    paddingBottom: RFont(100),
  },
  // Summary Card
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: RFont(24),
    padding: RFont(20),
    marginBottom: RFont(24),
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: RFont(4) },
    shadowOpacity: 0.08,
    shadowRadius: RFont(16),
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  summaryHeader: {
    marginBottom: RFont(16),
  },
  instituteProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RFont(8),
  },
  institutionLogoContainer: {
    width: RFont(48),
    height: RFont(48),
    borderRadius: RFont(12),
    backgroundColor: '#0F172A', // Dark brand color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFont(12),
  },
  institutionLogoText: {
    ...fontStyles.Maison_600_16PX_20LH,
    color: colors.white,
    fontSize: RFont(20),
  },
  institutionInfo: {
    flex: 1,
  },
  academyName: {
    ...fontStyles.Maison_600_16PX_20LH,
    color: '#0F172A',
    fontSize: RFont(18),
    marginBottom: RFont(2),
  },
  academyLocation: {
    ...fontStyles.Maison_400_12PX_16LH,
    color: '#64748B',
    fontSize: RFont(12),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5', // Light green
    paddingHorizontal: RFont(10),
    paddingVertical: RFont(6),
    borderRadius: RFont(100),
    gap: RFont(6),
  },
  statusDot: {
    width: RFont(6),
    height: RFont(6),
    borderRadius: RFont(3),
    backgroundColor: '#10B981',
  },
  statusText: {
    ...fontStyles.Maison_600_12PX_16LH,
    color: '#047857',
    fontSize: RFont(10),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: -RFont(20), // Bleed out
    marginBottom: RFont(16),
  },
  batchName: {
    ...fontStyles.Maison_600_20PX_28LH, // Corrected from 700 to 600
    color: '#0F172A',
    fontSize: RFont(22),
    lineHeight: RFont(30),
    marginBottom: RFont(4),
  },
  batchSubtitle: {
    ...fontStyles.Maison_500_14PX_18LH,
    color: '#64748B',
    backgroundColor: '#F8FAFC',
    alignSelf: 'flex-start',
    paddingHorizontal: RFont(10),
    paddingVertical: RFont(4),
    borderRadius: RFont(6),
    marginTop: RFont(4),
    fontSize: RFont(12),
  },
  instituteCardContainer: {
    marginTop: 0,
  },
  // Key Info
  keyInfoSection: {
    marginBottom: RFont(24),
  },
  sectionTitle: {
    ...fontStyles.Maison_600_16PX_20LH,
    color: '#334155',
    fontSize: RFont(12),
    marginBottom: RFont(12),
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFont(16),
  },
  infoCardWrapper: {
    width: '47%', // Slightly less than 50% to account for gap
  },
  infoCardFullWidth: {
    width: '100%',
    marginTop: RFont(0),
  },
  // About
  aboutSection: {
    marginBottom: RFont(24),
    display: 'none', // Hiding safely if not removed from TSX
  },
  aboutCard: {
    backgroundColor: colors.white,
    borderRadius: RFont(16),
    padding: RFont(20),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: RFont(2) },
    shadowOpacity: 0.05,
    shadowRadius: RFont(8),
    elevation: 2,
  },
  description: {
    ...fontStyles.Maison_400_16PX_20LH, // Use valid token
    color: '#475569',
    lineHeight: RFont(24),
    fontSize: RFont(14),
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white, // Restored white bg
    paddingHorizontal: RFont(20),
    paddingTop: RFont(16),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  errorText: {
    ...fontStyles.Maison_600_18PX_24LH,
    color: colors.black_900,
    textAlign: 'center',
    marginTop: RFont(40),
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
