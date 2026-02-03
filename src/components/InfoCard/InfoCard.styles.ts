import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const infoCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: RFont(20), // Larger radius
    padding: RFont(16),
    alignItems: 'flex-start',
    width: '100%',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: RFont(4) },
    shadowOpacity: 0.06,
    shadowRadius: RFont(12),
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  fullWidth: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFont(20),
    paddingHorizontal: RFont(20),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFont(8),
    gap: RFont(8),
  },
  iconContainer: {
    // marginBottom removed as it's in headerRow
  },
  label: {
    fontFamily: fontStyles.Maison_500_12PX_16LH.fontFamily, // Use MaisonMedium (500 weight)
    fontSize: RFont(12), // Increased size
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    fontFamily: fontStyles.Maison_700_16PX_22LH.fontFamily, // Use MaisonBold
    color: '#0F172A',
    fontSize: RFont(14),
    marginTop: RFont(2),
  },
});
