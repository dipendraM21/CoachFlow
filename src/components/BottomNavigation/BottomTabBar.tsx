import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFont } from '../../theme/fonts';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BatchesIcon, LibraryIcon, NotificationsIcon } from './TabIcons';

/** Capsule Style: Dark bar + high-contrast white/light pill for active tab */
const NAV_BAR = '#0B1220';
const ACTIVE_PILL_BG = '#FFFFFF'; // Bright white pill as per image
const ACTIVE_FG = '#0F172A'; // Dark text on white pill
const INACTIVE_FG = '#94A3B8'; // Muted gray

const ICON_SIZE_INACTIVE = 20;
const ICON_SIZE_ACTIVE = 18;

/** Use for scroll content so lists clear the bars. */
export const mainTabBarScrollPadding = (safeBottom: number) =>
  safeBottom + RFont(100);

export type TabType = 'Classes' | 'Library' | 'Notification';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const TABS: {
  id: TabType;
  label: string;
  icon: React.FC<{ color: string; size: number }>;
}[] = [
  { id: 'Classes', label: 'Classes', icon: BatchesIcon },
  { id: 'Library', label: 'Library', icon: LibraryIcon },
  { id: 'Notification', label: 'Notification', icon: NotificationsIcon },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const activeIndex = TABS.findIndex(t => t.id === activeTab);
  const slideAnim = useRef(new Animated.Value(activeIndex)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: activeIndex,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
  }, [activeIndex, slideAnim]);

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const tabCount = TABS.length;
  const tabWidth = containerWidth / tabCount;
  
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, tabWidth, tabWidth * 2],
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, RFont(12)),
        },
      ]}
    >
      <View style={styles.navContent} onLayout={onLayout}>
        {/* Animated Background Indicator (Capsule Pill) */}
        {containerWidth > 0 && (
          <Animated.View
            style={[
              styles.indicator,
              {
                width: tabWidth - RFont(12),
                transform: [{ translateX }],
              },
            ]}
          />
        )}

        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;
          const fg = isActive ? ACTIVE_FG : INACTIVE_FG;

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabHit}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.85}
            >
              <View style={[
                styles.tabContent,
                isActive ? styles.tabContentActive : styles.tabContentInactive
              ]}>
                <IconComponent 
                  color={fg} 
                  size={isActive ? ICON_SIZE_ACTIVE : ICON_SIZE_INACTIVE} 
                />
                <Text
                  style={[
                    styles.label,
                    { color: fg },
                    isActive ? styles.labelActive : styles.labelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {t(`tabs.${tab.id.toLowerCase()}`)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: NAV_BAR,
    borderTopLeftRadius: RFont(40),
    borderTopRightRadius: RFont(40),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: RFont(16),
    paddingTop: RFont(8),
    // Glow/Shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: RFont(64),
  },
  tabHit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    height: '100%',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: RFont(4),
  },
  tabContentInactive: {
    flexDirection: 'column',
  },
  tabContentActive: {
    flexDirection: 'row',
    paddingHorizontal: RFont(12),
    height: RFont(44),
  },
  indicator: {
    position: 'absolute',
    left: RFont(6),
    height: RFont(44),
    backgroundColor: ACTIVE_PILL_BG,
    borderRadius: RFont(22),
    zIndex: 1,
    top: '50%',
    marginTop: -RFont(22),
    // Pill Glow
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  label: {
    fontSize: RFont(12),
    fontFamily: 'Inter-Medium',
  },
  labelInactive: {
    fontWeight: '400',
    fontSize: RFont(10),
  },
  labelActive: {
    fontWeight: '700',
    fontSize: RFont(12),
    marginLeft: RFont(6),
  },
});
