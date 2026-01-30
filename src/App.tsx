/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { makeQueryClient } from './lib/queryClient';
import AppNavigator from './navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={makeQueryClient()}>
        <AppNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
