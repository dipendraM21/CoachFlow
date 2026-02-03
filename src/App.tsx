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
import { RestartProvider, useRestart } from './context/RestartContext';
import { makeQueryClient } from './lib/queryClient';
import AppNavigator from './navigation/AppNavigator';

const AppContent = () => {
  const { key } = useRestart();

  return (
    <SafeAreaProvider key={key}>
      <QueryClientProvider client={makeQueryClient()}>
        <AuthProvider>
          <AppNavigator />
          <ToastProvider />
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
