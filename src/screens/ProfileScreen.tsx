import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { version } from '../../package.json';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { ProfileAvatar } from '../components/Profile/ProfileAvatar';
import {
  HelpIcon,
  LanguageIcon,
  PersonalInfoIcon,
} from '../components/Profile/ProfileIcons';
import { ProfileInfo } from '../components/Profile/ProfileInfo';
import { ProfileMenuItem } from '../components/Profile/ProfileMenuItem';
import { SectionContainer } from '../components/Profile/SectionContainer';
import { useAuthData } from '../hooks/queries/useAuthData';
import i18n from '../i18n';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';
import { LanguageSelector } from '../components/Profile/LanguageSelector';
import { useUploadProfilePhotoMutation } from '../hooks/mutations/useUploadProfilePhotoMutation';
import { showError, showSuccess } from '../utils/toast';
import { requestCameraPermission, requestGalleryPermission } from '../utils/permissions';

export const ProfileScreen: React.FC<{ embeddedInTab?: boolean }> = ({
  embeddedInTab = false,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { authUser } = useAuthData(); // Use Auth Data Hook
  const { t } = useTranslation();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = React.useState(false);

  const userData = {
    name: authUser?.profile?.fullName || authUser?.name || 'Student',
    email: authUser?.email || '', // Email might not be in profile based on screenshot, but let's keep fallback
    imageUri:
      authUser?.profile?.avatar ||
      authUser?.profileImage ||
      'https://avatar.iran.liara.run/public/32',
  };

  const { mutate: uploadPhoto, isPending: isUploading } = useUploadProfilePhotoMutation();

  const handleEditProfile = useCallback(() => {
    // @ts-ignore
    navigation.navigate('SetupProfile', { mode: 'edit' });
  }, [navigation]);

  const processImage = useCallback(async (response: any) => {
    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      if (response.errorCode === 'camera_unavailable') {
        showError('Camera not available on this device');
      } else if (response.errorCode === 'permission') {
        showError('Permission denied');
      } else {
        showError(response.errorMessage || 'Gallery not available or error occurred');
      }
      return;
    }

    const asset = response.assets?.[0];
    if (asset && asset.uri) {
      // 1. Validate File Size (Max 5 MB)
      const MAX_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
      if (asset.fileSize && asset.fileSize > MAX_SIZE) {
        showError('Image size must be under 5 MB');
        return;
      }

      // 2. Validate File Type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (asset.type && !allowedTypes.includes(asset.type)) {
        showError('Only JPEG, PNG, and WebP images are allowed');
        return;
      }

      const formData = new FormData();
      formData.append('profilePhoto', {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || 'profile.jpg',
      } as any);

      uploadPhoto(formData, {
        onSuccess: (data) => {
          if (data.success) {
            showSuccess('Profile photo updated successfully');
          } else {
            showError(data.message || 'Failed to upload photo');
          }
        },
        onError: (error: any) => {
          showError(error?.message || 'Failed to upload photo. Please check your network.');
        },
      });
    }
  }, [uploadPhoto]);

  const handleEditPhoto = useCallback(() => {
    Alert.alert(
      t('profile.change_photo_title' as any, 'Change Profile Photo'),
      t('profile.change_photo_message' as any, 'Select an option to update your photo'),
      [
        {
          text: t('profile.camera' as any, 'Take Photo'),
          onPress: async () => {
            const hasPermission = await requestCameraPermission();
            if (hasPermission) {
              launchCamera(
                {
                  mediaType: 'photo',
                  quality: 0.7,
                  maxWidth: 800,
                  maxHeight: 800,
                },
                processImage,
              );
            } else {
              showError('Camera permission denied');
            }
          },
        },
        {
          text: t('profile.gallery' as any, 'Choose from Gallery'),
          onPress: async () => {
            const hasPermission = await requestGalleryPermission();
            if (hasPermission) {
              launchImageLibrary(
                {
                  mediaType: 'photo',
                  quality: 0.7,
                  maxWidth: 800,
                  maxHeight: 800,
                },
                processImage,
              );
            } else {
              showError('Gallery permission denied');
            }
          },
        },
        {
          text: t('profile.cancel' as any, 'Cancel'),
          style: 'cancel',
        },
      ],
    );
  }, [t, processImage]);


  const handleLanguageChange = useCallback(() => {
    setIsLanguageModalVisible(true);
  }, []);

  const onSelectLanguage = useCallback(
    async (lang: 'en' | 'gu') => {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem('user-language', lang);
      setIsLanguageModalVisible(false);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('profile.title')}
        showBackButton={!embeddedInTab}
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
            isLoading={isUploading}
          />
          <ProfileInfo name={userData.name} email={userData.email} />
        </View>

        <SectionContainer title={t('profile.account')}>
          <ProfileMenuItem
            icon={<PersonalInfoIcon color={colors.info} />}
            label={t('profile.personal_info')}
            onPress={handleEditProfile}
            isLast={true}
          />
        </SectionContainer>

        <SectionContainer title={t('profile.general')}>
          <ProfileMenuItem
            icon={<LanguageIcon color={colors.info} />}
            label={t('profile.language')}
            onPress={handleLanguageChange}
          />
          <ProfileMenuItem
            icon={<HelpIcon color={colors.success} />}
            label={t('profile.help_support')}
            onPress={() => navigation.navigate('HelpSupport' as never)}
            isLast={true}
          />
        </SectionContainer>


        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            {t('profile.version')} {version}
          </Text>
        </View>
      </ScrollView>

      <LanguageSelector
        isVisible={isLanguageModalVisible}
        onClose={() => setIsLanguageModalVisible(false)}
        onSelect={onSelectLanguage}
        currentLanguage={i18n.language}
      />
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
