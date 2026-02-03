import { StyleSheet } from 'react-native';
import { fontStyles, RFont } from '../../theme/fonts';

export const appHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9', // Subtle bottom border
  },
  contentContainer: {
    paddingHorizontal: RFont(20), // Increased horizontal padding
    paddingTop: RFont(16),
    paddingBottom: RFont(16),
    gap: RFont(20),
  },

  // --- Row 1: Logo | City | Profile ---
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  // 1. Left Container
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(10),
  },

  // Left: Logo

  // Left: Logo
  logoContainer: {
    width: RFont(40), // Increased slightly to 40 for better touch target/visual
    height: RFont(40),
    borderRadius: RFont(12),
    backgroundColor: '#0F172A', // Dark Navy/Black
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: RFont(24), // Small icon size inside container
    height: RFont(24),
    tintColor: '#FFFFFF', // White icon
  },
  // logoPlaceholder removed as it is now shared logic
  logoText: {
    ...fontStyles.Maison_600_20PX_28LH,
    fontSize: RFont(21),
    color: '#0F172A',
    letterSpacing: -0.5, // Tighter tracking often looks more "logo-like"
  },

  // 2. Right Container
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(12),
  },

  // Center: City Pill

  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFont(6),
    paddingVertical: RFont(6),
    paddingHorizontal: RFont(12),
    backgroundColor: '#F1F5F9', // Restored Pill BG
    borderRadius: RFont(8),
    height: RFont(36),
  },
  cityText: {
    ...fontStyles.Maison_500_14PX_16_8LH,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    fontSize: RFont(13),
  },
  profileButton: {
    width: RFont(36),
    height: RFont(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFont(18),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },

  // --- Row 2: Search Bar ---
  searchContainer: {
    width: '100%',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    borderRadius: RFont(12),
    paddingHorizontal: RFont(12),
    height: RFont(48), // Compact height
    borderWidth: 1,
    borderColor: '#E2E8F0', // Border color
    // Removed shadows
  },
  searchInput: {
    flex: 1,
    marginLeft: RFont(10),
    ...fontStyles.Maison_400_14PX_18LH, // Regular font
    fontFamily: 'Inter-Regular',
    color: '#1E293B', // Dark text input
    fontSize: RFont(15),
    height: '100%',
    paddingVertical: 0,
  },
});
