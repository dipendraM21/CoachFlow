import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const batchesListingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  appBar: {
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: RFont(20),
    paddingBottom: RFont(16),
  },
  screenTitle: {
    ...fontStyles.Maison_700_16PX_22LH, // Bold
    fontSize: RFont(24),
    lineHeight: RFont(32),
    color: '#0F172A',
    marginBottom: RFont(4),
  },
  screenSubtitle: {
    ...fontStyles.Maison_400_14PX_18LH,
    fontSize: RFont(14),
    color: '#64748B',
    marginBottom: RFont(24),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(12),
  },
  searchContainer: {
    flex: 1,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', // Very light gray/blueish
    borderRadius: RFont(30),
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(12),
    gap: RFont(10),
  },
  searchInput: {
    flex: 1,
    ...fontStyles.Maison_500_16PX_19_2LH,
    color: colors.black_900,
    fontSize: RFont(15),
    padding: 0,
  },
  profileButton: {
    width: RFont(44),
    height: RFont(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: RFont(16),
    paddingTop: RFont(8),
    paddingBottom: RFont(100), // Increased to clear Floating Bottom Tab Bar
    gap: RFont(12), // Tighter gap
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
});
