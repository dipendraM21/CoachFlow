import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const batchCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: RFont(24),
    marginBottom: 0, // Removed margin, letting gap handle spacing
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: RFont(4) },
    shadowOpacity: 0.08,
    shadowRadius: RFont(16),
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  mainContent: {
    padding: RFont(16), // Reduced from 20
    paddingBottom: RFont(12), // Reduced from 16
  },
  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: RFont(12), // Reduced from 16
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: RFont(10), // Reduced from 12
  },
  instituteIconContainer: {
    width: RFont(40), // Reduced from 48
    height: RFont(40), // Reduced from 48
    borderRadius: RFont(12), // Adjusted radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  instituteInfo: {
    flex: 1,
  },
  instituteName: {
    ...fontStyles.Maison_700_16PX_22LH,
    fontSize: RFont(15), // Reduced from 16
    color: '#0F172A',
    marginBottom: RFont(0), // Removed margin
  },
  instituteLocation: {
    ...fontStyles.Maison_400_12PX_16LH,
    color: '#64748B',
    fontSize: RFont(12), // Reduced from 13
  },
  bookmarkButton: {
    padding: RFont(4),
  },
  // Title & Badge
  titleSection: {
    marginBottom: RFont(12), // Reduced from 20
  },
  batchTitle: {
    ...fontStyles.Maison_600_20PX_28LH,
    fontSize: RFont(17), // Reduced from 18
    lineHeight: RFont(24), // Reduced from 26
    color: '#0F172A',
    marginBottom: RFont(6), // Reduced from 8
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: RFont(8),
    paddingVertical: RFont(4),
    borderRadius: RFont(6),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  badgeText: {
    ...fontStyles.Maison_500_12PX_16LH,
    color: '#64748B',
    fontSize: RFont(11), // Reduced from 12
  },
  // Grid
  gridContainer: {
    gap: RFont(12), // Reduced from 20
    marginBottom: RFont(12), // Reduced from 20
  },
  gridRow: {
    flexDirection: 'row',
    gap: RFont(16),
  },
  gridItem: {
    flex: 1,
  },
  gridLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(6),
    marginBottom: RFont(4), // Reduced from 6
  },
  gridLabel: {
    ...fontStyles.Maison_600_10PX_12LH,
    fontSize: RFont(9), // Reduced from 10
    color: '#94A3B8',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  gridValue: {
    ...fontStyles.Maison_600_14PX_18LH,
    fontSize: RFont(13), // Reduced from 14
    color: '#1E293B',
    lineHeight: RFont(18),
    fontWeight: '600',
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
    paddingHorizontal: RFont(10), // Reduced from 12
    paddingVertical: RFont(4), // Reduced from 6
    borderRadius: RFont(100),
    gap: RFont(6),
  },
  statusSuccess: {
    backgroundColor: '#ECFDF5',
  },
  statusWarning: {
    backgroundColor: '#FFFBEB',
  },
  statusDot: {
    width: RFont(6),
    height: RFont(6),
    borderRadius: RFont(3),
  },
  statusText: {
    ...fontStyles.Maison_600_12PX_16LH,
    fontSize: RFont(12),
    fontWeight: '700',
  },
  viewDetailsButton: {
    paddingVertical: RFont(8),
    paddingHorizontal: RFont(16),
    borderRadius: RFont(100),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  viewDetailsText: {
    ...fontStyles.Maison_600_14PX_18LH,
    fontSize: RFont(12),
    color: '#0F172A',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
