import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const infoCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: RFont(16),
    padding: RFont(16),
    alignItems: 'flex-start',
    width: '100%',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: RFont(2) },
    shadowOpacity: 0.05,
    shadowRadius: RFont(8),
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  fullWidth: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFont(20),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFont(12),
    gap: RFont(8),
  },
  iconContainer: {
    // marginBottom removed as it's in headerRow
  },
  label: {
    ...fontStyles.Maison_600_10PX_12LH,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    ...fontStyles.Maison_700_16PX_22LH,
    color: '#0F172A',
    fontSize: RFont(16),
  },
});
