import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, fontStyles, RFont } from '../../theme/fonts';

export const coachingCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: RFont(12),
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: RFont(16),
    marginBottom: RFont(1), // Minimal margin between cards if handled by list
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
    marginBottom: RFont(16),
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
  coachingName: {
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
  buttonRow: {
    flexDirection: 'row',
    gap: RFont(12),
    marginTop: RFont(8),
  },
  subscribeButton: {
    flex: 1,
    backgroundColor: '#E2E8F0', // Light gray for subscribe
    paddingVertical: RFont(12),
    borderRadius: RFont(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeText: {
    ...fontStyles.Maison_600_14PX_18LH,
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(13),
    color: '#0F172A',
  },
  viewDetailButton: {
    flex: 1,
    backgroundColor: '#0F172A', // Navy/Black for view details
    paddingVertical: RFont(12),
    borderRadius: RFont(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailText: {
    ...fontStyles.Maison_600_14PX_18LH,
    fontFamily: fontFamily.MaisonDemi,
    fontSize: RFont(13),
    color: '#FFFFFF',
  },
});
