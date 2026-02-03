import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const batchesListingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    flex: 1,
  },
  headerTextContainer: {
    paddingHorizontal: RFont(20),
    paddingTop: RFont(20),
    paddingBottom: RFont(10),
  },
  screenTitle: {
    ...fontStyles.Maison_700_16PX_22LH,
    fontSize: RFont(24),
    lineHeight: RFont(30),
    color: '#0F172A',
    marginBottom: RFont(4),
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    ...fontStyles.Maison_400_14PX_18LH,
    fontSize: RFont(14),
    color: '#64748B',
    marginBottom: RFont(4),
  },
  listContent: {
    paddingHorizontal: RFont(20),
    paddingTop: RFont(4), // Reduced from 10
    paddingBottom: RFont(100),
    gap: RFont(12), // Reduced from 20
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFont(60),
  },
  emptyText: {
    ...fontStyles.Maison_600_18PX_24LH,
    color: colors.black_900,
    marginBottom: RFont(8),
    fontSize: RFont(20),
  },
  emptySubtext: {
    ...fontStyles.Maison_400_14PX_18LH,
    color: colors.grey_600,
    fontSize: RFont(16),
  },
});
