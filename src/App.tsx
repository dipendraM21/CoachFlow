/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from './components/toast/ToastProvider';
import { AuthProvider } from './context/AuthContext';
import { CityProvider } from './context/CityContext';
import { RestartProvider, useRestart } from './context/RestartContext';
import { makeQueryClient } from './lib/queryClient';
import './i18n';
import AppNavigator from './navigation/AppNavigator';
import NotificationService from './services/notification.service';

const AppContent = () => {
  const { key } = useRestart();

  React.useEffect(() => {
    // Initialize Notification Service
    NotificationService.init();
  }, []);

  return (
    <SafeAreaProvider key={key}>
      <QueryClientProvider client={makeQueryClient()}>
        <AuthProvider>
          <CityProvider>
            <AppNavigator />
            <ToastProvider />
          </CityProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

function App() {
  return (
    <RestartProvider>
      <AppContent />
    </RestartProvider>
  );
}

export default App;
