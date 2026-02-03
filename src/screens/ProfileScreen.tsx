import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { version } from '../../package.json';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { ProfileAvatar } from '../components/Profile/ProfileAvatar';
import {
  HelpIcon,
  LogoutIcon,
  PersonalInfoIcon,
} from '../components/Profile/ProfileIcons';
import { ProfileInfo } from '../components/Profile/ProfileInfo';
import { ProfileMenuItem } from '../components/Profile/ProfileMenuItem';
import { SectionContainer } from '../components/Profile/SectionContainer';
import { useLogoutMutation } from '../hooks/mutations/useLogout';
import { useAuthData } from '../hooks/queries/useAuthData';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { authUser } = useAuthData(); // Use Auth Data Hook

  const userData = {
    name: authUser?.profile?.fullName || authUser?.name || 'Student',
    email: authUser?.email || '', // Email might not be in profile based on screenshot, but let's keep fallback
    imageUri:
      authUser?.profile?.avatar ||
      authUser?.profileImage ||
      'https://avatar.iran.liara.run/public/32',
  };

  const handleEditProfile = useCallback(() => {
    // @ts-ignore
    navigation.navigate('SetupProfile', { mode: 'edit' });
  }, [navigation]);

  const handleEditPhoto = useCallback(() => {
    Alert.alert('Change Photo', 'Open Image Picker');
  }, []);

  const { mutate: logoutUser } = useLogoutMutation();

  const handleLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="My Profile"
        showBackButton={true}
        backgroundColor="#F8FAFC"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryContainer}>
          <ProfileAvatar
            imageUri={userData.imageUri}
            onEditPress={handleEditPhoto}
          />
          <ProfileInfo name={userData.name} email={userData.email} />
        </View>

        <SectionContainer title="Account">
          <ProfileMenuItem
            icon={<PersonalInfoIcon color={colors.info} />}
            label="Personal Information"
            onPress={handleEditProfile}
            isLast={true}
          />
        </SectionContainer>

        <SectionContainer title="GENERAL">
          <ProfileMenuItem
            icon={<HelpIcon color={colors.success} />}
            label="Help & Support"
            onPress={() => Alert.alert('Help', 'Navigate to Help')}
          />
        </SectionContainer>

        <View style={styles.logoutContainer}>
          <ProfileMenuItem
            icon={<LogoutIcon color={colors.danger} />}
            label="Log Out"
            onPress={handleLogout}
            textColor={colors.danger}
            showChevron={false}
            isLast={true}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version {version}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    borderColor: '#FEE2E2',
    backgroundColor: colors.white,
  },
  versionContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  versionText: {
    color: colors.gray,
    fontSize: RFont(12),
    fontFamily: 'Inter-Regular',
  },
});
