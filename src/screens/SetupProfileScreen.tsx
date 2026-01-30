import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { ProfileAvatar } from '../components/Profile/ProfileAvatar';
import {
    EditIcon,
    HelpIcon,
    LogoutIcon,
    PersonalInfoIcon,
    SettingsIcon
} from '../components/Profile/ProfileIcons';
import { ProfileInfo } from '../components/Profile/ProfileInfo';
import { ProfileMenuItem } from '../components/Profile/ProfileMenuItem';
import { SectionContainer } from '../components/Profile/SectionContainer';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';

// Renaming component to ProfileScreen to match new purpose
export const SetupProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Mock data to match the visual reference (as per instructions to match UI)
  // In a real app, this would come from a Redux store or Auth Context
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@student.com',
    imageUri: 'https://avatar.iran.liara.run/public/32', // Reliable avatar placeholdler
  };

  const handleEditProfile = useCallback(() => {
    // Navigate to edit profile or show modal
    Alert.alert('Edit Profile', 'Navigate to Edit Profile screen');
  }, []);

  const handleEditPhoto = useCallback(() => {
    Alert.alert('Change Photo', 'Open Image Picker');
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => console.log('Logging out...') },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Header */}
      <ScreenHeader
        title="My Profile"
        showBackButton={false}
        rightAction={
          <TouchableOpacity onPress={handleEditProfile} style={{ padding: 4 }}>
            <EditIcon color={colors.info} size={20} />
          </TouchableOpacity>
        }
        backgroundColor="#F8FAFC"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 }, // Extra padding for bottom tab bar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Summary Section */}
        <View style={styles.summaryContainer}>
          <ProfileAvatar imageUri={userData.imageUri} onEditPress={handleEditPhoto} />
          <ProfileInfo name={userData.name} email={userData.email} />
        </View>

        {/* Account Section */}
        <SectionContainer title="ACCOUNT">
          <ProfileMenuItem
            icon={<PersonalInfoIcon color={colors.info} />}
            label="Personal Information"
            onPress={handleEditProfile}
            isLast={true} // Single item in this section
          />
        </SectionContainer>

        {/* Settings Section */}
        <SectionContainer title="GENERAL">
          <ProfileMenuItem
            icon={<HelpIcon color={colors.success} />}
            label="Help & Support"
            onPress={() => Alert.alert('Help', 'Navigate to Help')}
          />
          <ProfileMenuItem
            icon={<SettingsIcon color={colors.grey_600} />}
            label="App Settings"
            onPress={() => Alert.alert('Settings', 'Navigate to Settings')}
            isLast={true}
          />
        </SectionContainer>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <ProfileMenuItem
            icon={<LogoutIcon color={colors.danger} />}
            label="Log Out"
            onPress={handleLogout}
            textColor={colors.danger}
            showChevron={false} // Logout usually acts like a button
            isLast={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate-50 for premium background
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  summaryContainer: {
    alignItems: 'center',
    paddingVertical: RFont(24),
    paddingHorizontal: 20,
  },

  logoutContainer: {
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FEE2E2', // Light red border for logout
    backgroundColor: colors.white,
  },
});
