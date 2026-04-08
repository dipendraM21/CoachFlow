import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, fontStyles, RFont } from '../../theme/fonts';

export const libraryCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: RFont(16),
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: RFont(16),
    marginBottom: RFont(12),
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(12),
    marginBottom: RFont(12),
  },
  instituteIconContainer: {
    width: RFont(40),
    height: RFont(40),
    borderRadius: RFont(8),
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  instituteNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(6),
    marginBottom: RFont(2),
  },
  libraryName: {
    ...fontStyles.Maison_700_16PX_22LH,
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(18),
    color: '#0F172A',
    flexShrink: 1,
  },
  verifiedBadge: {
    width: RFont(18),
    height: RFont(18),
    resizeMode: 'contain',
  },
  address: {
    ...fontStyles.Maison_400_12PX_16LH,
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(13),
    color: '#64748B',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFont(4),
    paddingTop: RFont(12),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  feesContainer: {
    flex: 1,
  },
  feesLabel: {
    ...fontStyles.Maison_400_12PX_16LH,
    fontSize: RFont(11),
    color: '#64748B',
    textTransform: 'uppercase',
  },
  feesValue: {
    ...fontStyles.Maison_700_16PX_22LH,
    fontSize: RFont(16),
    color: '#0F172A',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: RFont(8),
  },
  callButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(8),
    borderRadius: RFont(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(6),
  },
  mailButton: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(8),
    borderRadius: RFont(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(6),
  },
  actionText: {
    ...fontStyles.Maison_600_14PX_18LH,
    color: '#2563EB',
    fontWeight: '600',
    fontSize: RFont(13),
  },
  mailText: {
    ...fontStyles.Maison_600_14PX_18LH,
    color: colors.info,
    fontWeight: '600',
    fontSize: RFont(13),
  },
});
