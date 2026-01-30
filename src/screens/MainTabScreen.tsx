import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabBar, TabType } from '../components/BottomNavigation/BottomTabBar';
import colors from '../theme/colors';
import { BatchesListingScreen } from './BatchesListingScreen';
import { SetupProfileScreen } from './SetupProfileScreen';

export const MainTabScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Batches');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        // Currently reusing BatchesListing for Home as per plan (Dashboard not ready)
        // Or if we need a distinct "Home" feel we can pass a prop or use a different screen.
        // For now, reusing BatchesListingScreen seems safest to keep flow "real".
        return <BatchesListingScreen />;
      case 'Batches':
        return <BatchesListingScreen />;
      case 'Profile':
        return <SetupProfileScreen />;
      default:
        return <BatchesListingScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
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
