import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GuestNavigator from './GuestNavigator';

const navigationRef = createNavigationContainerRef();

const AppNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // Simple condition - currently always show LoginScreen
  // This can be updated later with auth logic
  const showLoginScreen = true;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#FFF"
        />
        {showLoginScreen ? <GuestNavigator /> : null}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default AppNavigator;
