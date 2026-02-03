import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SetupProfileScreen } from '../screens/SetupProfileScreen';

export type OnboardingStackParamList = {
  SetupProfile: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
