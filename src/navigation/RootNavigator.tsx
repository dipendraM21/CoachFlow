import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AcademyProfileScreen } from '../screens/AcademyProfileScreen';
import { BatchDetailsScreen } from '../screens/BatchDetailsScreen';
import { BatchesListingScreen } from '../screens/BatchesListingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SetupProfileScreen } from '../screens/SetupProfileScreen';

import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="BatchesListing" component={BatchesListingScreen} />
      <Stack.Screen name="BatchDetails" component={BatchDetailsScreen} />
      <Stack.Screen name="AcademyProfile" component={AcademyProfileScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
