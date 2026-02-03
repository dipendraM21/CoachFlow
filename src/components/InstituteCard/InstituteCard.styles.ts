import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const instituteCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: RFont(12),
    padding: RFont(16),
    borderWidth: 1,
    borderColor: colors.grey_100,
    gap: RFont(12),
  },
  logoContainer: {
    width: RFont(40),
    height: RFont(40),
    borderRadius: RFont(20),
    overflow: 'hidden',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey_100,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoCross: {
    width: RFont(20),
    height: RFont(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  crossHorizontal: {
    position: 'absolute',
    width: RFont(20),
    height: RFont(2),
    backgroundColor: colors.info,
    borderRadius: RFont(1),
  },
  crossVertical: {
    position: 'absolute',
    width: RFont(2),
    height: RFont(20),
    backgroundColor: colors.info,
    borderRadius: RFont(1),
  },
  info: {
    flex: 1,
  },
  name: {
    ...fontStyles.Maison_600_14PX_18LH,
    color: colors.black_900,
    marginBottom: RFont(2),
  },
  location: {
    ...fontStyles.Maison_400_12PX_16LH,
    color: colors.grey_600,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
