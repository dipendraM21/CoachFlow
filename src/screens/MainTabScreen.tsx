import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomTabBar,
  TabType,
} from '../components/BottomNavigation/BottomTabBar';
import colors from '../theme/colors';
import { BatchesListingScreen } from './BatchesListingScreen';
import { ProfileScreen } from './ProfileScreen';

export const MainTabScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Batches');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        // Reuse BatchesListing for Home for now
        return <BatchesListingScreen />;
      case 'Batches':
        return <BatchesListingScreen />;
      case 'Profile':
        return <ProfileScreen />;
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
