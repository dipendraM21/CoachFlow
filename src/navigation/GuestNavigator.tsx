import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AcademyProfileScreen } from '../screens/AcademyProfileScreen';
import { BatchDetailsScreen } from '../screens/BatchDetailsScreen';
import { BatchesListingScreen } from '../screens/BatchesListingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { MainTabScreen } from '../screens/MainTabScreen';
import { SetupProfileScreen } from '../screens/SetupProfileScreen';
import { VerifyOtpScreen } from '../screens/VerifyOtpScreen';

import { GuestStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
      <Stack.Screen name="MainTab" component={MainTabScreen} />
      <Stack.Screen name="BatchesListing" component={BatchesListingScreen} />
      <Stack.Screen name="BatchDetails" component={BatchDetailsScreen} />
      <Stack.Screen name="AcademyProfile" component={AcademyProfileScreen} />
    </Stack.Navigator>
  );
};

export default GuestNavigator;
