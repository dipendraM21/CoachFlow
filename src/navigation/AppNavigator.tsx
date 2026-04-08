import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthData } from '../hooks/queries/useAuthData';
import GuestNavigator from './GuestNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import RootNavigator from './RootNavigator';

export const navigationRef = createNavigationContainerRef<any>();

const AppNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { isAuthenticated, isAuthLoading, isNewUser } = useAuthData();

  if (isAuthLoading) {
    // Temporary Splash / Loading State
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#FFF"
        />
        {!isAuthenticated ? (
          <GuestNavigator />
        ) : isNewUser ? (
          <OnboardingNavigator />
        ) : (
          <RootNavigator />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
