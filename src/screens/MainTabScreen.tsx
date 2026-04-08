import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomTabBar,
  mainTabBarScrollPadding,
  TabType,
} from '../components/BottomNavigation/BottomTabBar';

import colors from '../theme/colors';
import { BatchesListingScreen } from './BatchesListingScreen';
import { LibraryScreen } from './LibraryScreen';
import { NotificationsScreen } from './NotificationsScreen';

export const MainTabScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Classes');
  const insets = useSafeAreaInsets();


  const renderContent = () => {
    switch (activeTab) {
      case 'Classes':
        return (
          <BatchesListingScreen
            listBottomPadding={mainTabBarScrollPadding(insets.bottom)}
          />
        );
      case 'Library':
        return (
          <LibraryScreen
            listBottomPadding={mainTabBarScrollPadding(insets.bottom)}
          />
        );
      case 'Notification':
        return (
          <NotificationsScreen />
        );
      default:
        return <BatchesListingScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    flex: 1,
  },
});
