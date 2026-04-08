import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AcademyProfileScreen } from '../screens/AcademyProfileScreen';
import { BatchDetailsScreen } from '../screens/BatchDetailsScreen';
import { BatchesListingScreen } from '../screens/BatchesListingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SetupProfileScreen } from '../screens/SetupProfileScreen';
import { HelpSupportScreen } from '../screens/HelpSupportScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';

import { RootStackParamList } from '../types/navigation';

import { MainTabScreen } from '../screens/MainTabScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="MainTab" component={MainTabScreen} />
      <Stack.Screen name="BatchesListing" component={BatchesListingScreen} />
      <Stack.Screen name="BatchDetails" component={BatchDetailsScreen} />
      <Stack.Screen name="AcademyProfile" component={AcademyProfileScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
