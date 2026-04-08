import { StyleSheet } from 'react-native';
import { fontFamily, fontStyles, RFont } from '../../theme/fonts';

export const batchCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RFont(12),
    // Removed marginBottom to let list handle gap or reduce it manually
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Subtle shadow for lift
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  mainContent: {
    padding: RFont(12), // Reduced from 14 for compact look
    paddingBottom: RFont(12),
  },
  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: RFont(10), // Reduced from 16
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: RFont(10),
  },
  instituteIconContainer: {
    width: RFont(36), // Reduced from 48
    height: RFont(36), // Reduced from 48
    borderRadius: RFont(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  instituteInfo: {
    flex: 1,
  },
  instituteName: {
    ...fontStyles.Maison_700_16PX_22LH,
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(18),
    color: '#0F172A', // Darker
    marginBottom: RFont(0),
    flexShrink: 1,
  },
  verifiedBadge: {
    width: RFont(18),
    height: RFont(18),
    marginTop: RFont(4),
    resizeMode: 'contain',
  },
  instituteLocation: {
    ...fontStyles.Maison_400_12PX_16LH,
    fontFamily: fontFamily.MaisonRegular,
    color: '#64748B',
    fontSize: RFont(12),
    marginTop: RFont(0),
  },
  shortDescription: {
    ...fontStyles.Maison_400_12PX_16LH,
    fontFamily: fontFamily.MaisonRegular,
    color: '#64748B',
    fontSize: RFont(12),
    marginTop: RFont(6),
  },
  instituteNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(4),
  },
  bookmarkButton: {
    padding: RFont(4),
  },
  // Title & Badge
  titleSection: {
    marginBottom: RFont(10), // Reduced from 16
  },
  batchTitle: {
    ...fontStyles.Maison_600_20PX_28LH,
    fontSize: RFont(15), // Reduced from 16
    fontFamily: fontFamily.MaisonDemi,
    color: '#0F172A',
    marginBottom: RFont(6),
    lineHeight: RFont(20),
  },
  // Replaced badgeContainer with chipsContainer logic if needed,
  // but keeping basic structure for chips.
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFont(8),
    marginBottom: RFont(4),
  },
  chipContainer: {
    backgroundColor: '#F1F5F9', // Slightly darker than #EEF2F7 for better contrast white card
    paddingHorizontal: RFont(8), // Compact
    paddingVertical: RFont(2),
    borderRadius: RFont(4), // Square-ish rounded
  },
  chipText: {
    ...fontStyles.Maison_500_12PX_14_4LH,
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(11), // Tiny chips
    color: '#475569',
  },
  // Deprecated badge classes if unused, but keeping just in case
  badgeContainer: {
    backgroundColor: '#EEF2F7',
    paddingHorizontal: RFont(12),
    paddingVertical: RFont(4),
    borderRadius: RFont(20),
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...fontStyles.Maison_500_12PX_14_4LH,
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(12),
    color: '#475569',
  },
  // Grid
  gridContainer: {
    marginTop: RFont(2),
    marginBottom: RFont(10),
    backgroundColor: '#F8FAFC', // Overall background for grid block
    borderRadius: RFont(8),
    padding: RFont(12),
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  gridRowSpaced: {
    marginTop: RFont(16),
  },
  gridItem: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: RFont(2),
  },
  gridBorderLeft: {
    // No longer used in 2x2
  },
  gridLastItem: {
    // No longer used
  },
  gridLabelRow: {},
  gridLabel: {
    ...fontStyles.Maison_500_10PX_13LH,
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(10),
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gridValue: {
    ...fontStyles.Maison_600_16PX_20LH,
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(13),
    color: '#0F172A',
    marginTop: RFont(0),
  },
  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: RFont(4),
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFont(10),
    paddingVertical: RFont(6),
    borderRadius: RFont(6),
    gap: RFont(6),
  },
  statusSuccess: {
    backgroundColor: '#F0FDF4',
  },
  statusText: {
    ...fontStyles.Maison_600_12PX_16LH,
    fontFamily: fontFamily.MaisonDemi, // SemiBold
    fontSize: RFont(12),
    color: '#22C55E',
  },
  statusDot: {
    // Optional dot
    width: RFont(6),
    height: RFont(6),
    borderRadius: RFont(3),
    backgroundColor: '#22C55E',
  },
  viewDetailsButton: {
    paddingVertical: RFont(10),
    paddingHorizontal: RFont(20), // Wider for pill look
    borderRadius: RFont(24), // Pill shape
    backgroundColor: '#0F172A',
    // No shadow
    elevation: 0,
  },
  viewDetailsText: {
    ...fontStyles.Maison_600_14PX_18LH,
    fontFamily: fontFamily.MaisonDemi, // SemiBold
    fontSize: RFont(12), // Smaller
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Status Badge
  statusBadge: {
    paddingHorizontal: RFont(10),
    paddingVertical: RFont(4),
    borderRadius: RFont(6),
    alignSelf: 'flex-start',
  },
  statusBadgeUpcoming: {
    backgroundColor: '#EFF6FF', // Blue-50
  },
  statusBadgeCurrent: {
    backgroundColor: '#F0FDF4', // Green-50
  },
  statusBadgeCompleted: {
    backgroundColor: '#F8FAFC', // Slate-50
  },
  statusBadgeText: {
    ...fontStyles.Maison_600_12PX_16LH,
    fontSize: RFont(11),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusBadgeTextUpcoming: {
    color: '#3B82F6', // Blue-500
  },
  statusBadgeTextCurrent: {
    color: '#22C55E', // Green-500
  },
  statusBadgeTextCompleted: {
    color: '#64748B', // Slate-500
  },
});
