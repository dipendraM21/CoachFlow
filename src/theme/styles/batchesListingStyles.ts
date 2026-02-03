import { StyleSheet } from 'react-native';
import colors from '../colors';
import { fontStyles, RFont } from '../fonts';

export const batchesListingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: RFont(16),
    paddingBottom: RFont(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: RFont(12),
  },
  menuButton: {
    width: RFont(40),
    height: RFont(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLightest,
    borderRadius: RFont(20),
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(10),
    gap: RFont(8),
    borderWidth: 1,
    borderColor: colors.grey_100,
  },
  searchInput: {
    flex: 1,
    ...fontStyles.Maison_500_16PX_19_2LH,
    color: colors.black_900,
    padding: 0,
  },
  profileButton: {
    width: RFont(40),
    height: RFont(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: RFont(16),
    paddingBottom: RFont(32),
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
  },
  emptySubtext: {
    ...fontStyles.Maison_400_14PX_18LH,
    color: colors.grey_600,
  },
  footerLoader: {
    paddingVertical: RFont(20),
  },
  loadingPadding: {
    paddingTop: RFont(50),
  },
  separator: {
    height: RFont(16),
  },
});
