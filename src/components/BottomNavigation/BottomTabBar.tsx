import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFont } from '../../theme/fonts';
import { BatchesIcon, HomeIcon, ProfileIcon } from './TabIcons';

export type TabType = 'Home' | 'Batches' | 'Profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const TABS: {
  id: TabType;
  label: string;
  icon: React.FC<{ color: string; size: number }>;
}[] = [
  { id: 'Home', label: 'Home', icon: HomeIcon },
  { id: 'Batches', label: 'Batches', icon: BatchesIcon },
  { id: 'Profile', label: 'Profile', icon: ProfileIcon },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingBottom: insets.bottom + RFont(8) }]}
    >
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;
        const activeColor = '#1D4ED8';
        const inactiveColor = '#94A3B8';

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <IconComponent
              color={isActive ? activeColor : inactiveColor}
              size={24}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? activeColor : inactiveColor },
                isActive && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC', // Slate-50: Tinted Background
    borderTopLeftRadius: RFont(24),
    borderTopRightRadius: RFont(24),
    paddingTop: RFont(12),
    paddingHorizontal: RFont(16),
    // Enhanced Shadow / Elevation
    shadowColor: '#1E293B', // Darker shadow color
    shadowOffset: {
      width: 0,
      height: -8, // Higher float
    },
    shadowOpacity: 0.1, // Stronger opacity
    shadowRadius: 20,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0', // Slate-200: Visible divider
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: RFont(4),
  },
  label: {
    fontSize: RFont(11),
    fontWeight: '500',
    marginTop: RFont(2),
  },
  activeLabel: {
    fontWeight: '600',
  },
});
