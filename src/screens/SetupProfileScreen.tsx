import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeButton } from '../components/Button/Button';
import { CityPicker } from '../components/CityPicker/CityPicker';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { SelectionTab } from '../components/SelectionTab/SelectionTab';
import { Input } from '../components/TextInputField/Input';
import { AUTH_USER_QUERY_KEY } from '../constant/constant';
import { useAuth } from '../context/AuthContext';
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from '../hooks/mutations/useProfileMutation';
import { useUploadProfilePhotoMutation } from '../hooks/mutations/useUploadProfilePhotoMutation';
import { useAuthData } from '../hooks/queries/useAuthData';
import colors from '../theme/colors';
import { GetAuthUserResponse } from '../types/auth/sendOtp.types';
import { RootStackParamList } from '../types/navigation';
import { UpdateProfilePayload } from '../types/profile';
import { showError, showSuccess } from '../utils/toast';
import { requestCameraPermission, requestGalleryPermission } from '../utils/permissions';

// 1. Define Form Types
type SetupProfileFormValues = {
  fullName: string;
  dob: Date | null;
  city: string;
  gender: 'Male' | 'Female' | null;
};

const CameraIcon = () => (
  <View style={styles.cameraIcon}>
    <View style={styles.cameraIconInner} />
  </View>
);
const PlusIcon = () => <Text style={styles.plusIcon}>+</Text>;

// ... other imports

type SetupProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'SetupProfile'
>;

export const SetupProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<SetupProfileScreenRouteProp>();
  const { t } = useTranslation();
  const { authUser } = useAuthData();
  const { updateUserStatus } = useAuth();
  const queryClient = useQueryClient();
  console.log('check67', authUser);

  // Default to 'create' if param is missing (e.g. from OnboardingNavigator)
  const mode = route.params?.mode || 'create';
  const isEditMode = mode === 'edit';

  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateProfileMutation();
  const { mutate: createProfile, isPending: isCreating } =
    useCreateProfileMutation();
  const isLoading = isUpdating || isCreating;

  const { mutate: uploadPhoto, isPending: isUploadingImage } =
    useUploadProfilePhotoMutation();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SetupProfileFormValues>({
    defaultValues: {
      fullName: isEditMode
        ? authUser?.profile?.fullName || authUser?.name || ''
        : '',
      dob:
        isEditMode && authUser?.profile?.dateOfBirth
          ? new Date(authUser.profile.dateOfBirth)
          : null,
      city: isEditMode ? authUser?.profile?.address?.city || '' : '',
      gender:
        isEditMode && authUser?.profile?.gender
          ? ((authUser.profile.gender.charAt(0).toUpperCase() +
              authUser.profile.gender.slice(1)) as 'Male' | 'Female')
          : null,
    },
    mode: 'onSubmit',
  });

  // Reset form when authUser loads (handles async data fetching)
  useEffect(() => {
    if (isEditMode && authUser) {
      setImageUri(authUser.profile?.avatar || null);

      reset({
        fullName: authUser.profile?.fullName || authUser.name || '',
        dob: authUser.profile?.dateOfBirth
          ? new Date(authUser.profile.dateOfBirth)
          : null,
        city: authUser.profile?.address?.city || '',
        gender: authUser.profile?.gender
          ? ((authUser.profile.gender.charAt(0).toUpperCase() +
              authUser.profile.gender.slice(1)) as 'Male' | 'Female')
          : null,
      });
    }
  }, [authUser, isEditMode, reset]);

  const processImage = useCallback(
    async (response: any) => {
      if (response.didCancel) return;
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
          onSuccess: data => {
            if (data.success && data.data?.url) {
              setImageUri(data.data.url);
              showSuccess('Profile photo uploaded successfully');
            } else {
              showError(data.message || 'Failed to upload photo');
            }
          },
          onError: (error: any) => {
            showError(
              error?.message || 'Failed to upload photo. Please check your network connection.',
            );
          },
        });
      }
    },
    [uploadPhoto],
  );

  const handleImagePick = useCallback(() => {
    Alert.alert(
      t('profile.change_photo_title' as any, 'Change Profile Photo'),
      t(
        'profile.change_photo_message' as any,
        'Select an option to update your photo',
      ),
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

  const onSubmit = (data: SetupProfileFormValues) => {
    if (!data.dob || !data.gender) return;

    // 1. Name Split Logic
    const nameParts = data.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // 2. Date Format (YYYY-MM-DD)
    const year = data.dob.getFullYear();
    const month = String(data.dob.getMonth() + 1).padStart(2, '0');
    const day = String(data.dob.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // 3. Payload Construction
    const payload: UpdateProfilePayload = {
      firstName,
      lastName,
      dateOfBirth: formattedDate,
      gender: data.gender.toLowerCase(),
      avatar: imageUri || '',
      address: {
        city: data.city,
      },
    };

    // 4. Mutation
    const isNewUser = !authUser?.profile?.fullName;
    const mutateProfile = isNewUser ? createProfile : updateProfile;

    mutateProfile(payload, {
      onSuccess: () => {
        showSuccess(
          !isNewUser ? 'Profile updated' : 'Profile created successfully',
        );

        // Update Cache
        if (authUser) {
          // Optimistically update user data
          queryClient.setQueryData(
            AUTH_USER_QUERY_KEY,
            (oldData: GetAuthUserResponse | undefined) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  user: {
                    ...oldData.data.user,
                    hasProfile: true,
                    profile: {
                      ...oldData.data.user.profile,
                      fullName: data.fullName,
                      firstName,
                      lastName,
                      dateOfBirth: formattedDate,
                      gender: data.gender,
                      avatar: imageUri || '',
                      address: { city: data.city },
                    },
                  },
                },
              };
            },
          );

          if (!isNewUser) {
            navigation.goBack();
          } else {
            updateUserStatus(false);
          }
        }
      },
      onError: (err: unknown) => {
        const error = err as { response?: { data?: { message?: string } } };
        const msg =
          error?.response?.data?.message || 'Failed to update profile';
        showError(msg);
      },
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScreenHeader
        title={
          isEditMode ? t('profile.edit_profile') : t('profile.setup_profile')
        }
        showBackButton={isEditMode}
        onBackPress={() => navigation.goBack()}
        backgroundColor={colors.backgroundLight}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={handleImagePick}
              disabled={isUploadingImage || isLoading}
            >
              {isUploadingImage ? (
                <ActivityIndicator size="large" color={colors.info} />
              ) : imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <CameraIcon />
              )}

              <View style={styles.addButton}>
                <PlusIcon />
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: 'Full Name is required',
                minLength: {
                  value: 3,
                  message: 'Full Name must be at least 3 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('profile.full_name')}
                  placeholder={t('profile.full_name_placeholder')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.fullName?.message}
                />
              )}
            />

            {/* Phone Number - Disabled */}
            <Input
              label={t('common.phone_number')}
              value={authUser?.phone || ''}
              disabled={true}
              placeholder={t('common.phone_number_placeholder')}
            />

            {/* Date of Birth */}
            <Controller
              control={control}
              name="dob"
              rules={{
                required: 'Date of Birth is required',
                validate: value => {
                  if (!value) return 'Date of Birth is required';
                  const maxDate = new Date();
                  maxDate.setFullYear(maxDate.getFullYear() - 6);
                  if (value > maxDate) return 'Minimum age should be 6 years';
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => {
                const maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() - 6);
                return (
                  <DatePicker
                    label={t('profile.date_of_birth')}
                    value={value}
                    onChange={onChange}
                    error={errors.dob?.message}
                    placeholder={t('profile.select_date')}
                    maximumDate={maxDate} // Prevent future dates and enforce min age in picker
                  />
                );
              }}
            />

            {/* City */}
            <Controller
              control={control}
              name="city"
              rules={{ required: 'City is required' }}
              render={({ field: { onChange, value } }) => (
                <CityPicker
                  value={value}
                  onChange={onChange} // CityPicker onChange passes value string directly
                  placeholder={t('common.select_city')}
                  error={errors.city?.message}
                />
              )}
            />

            {/* Gender */}
            <Controller
              control={control}
              name="gender"
              rules={{ required: 'Gender is required' }}
              render={({ field: { onChange, value } }) => (
                <SelectionTab
                  label={t('profile.gender')}
                  options={[
                    { label: t('profile.male'), value: 'Male' },
                    { label: t('profile.female'), value: 'Female' },
                  ]}
                  selectedValue={value}
                  onSelect={onChange}
                  error={errors.gender?.message}
                />
              )}
            />
          </View>
        </ScrollView>

        {/* Save Button - Sticky Footer */}
        <View style={styles.footer}>
          <ThemeButton
            title={
              isEditMode
                ? t('profile.save_profile')
                : t('profile.create_profile')
            }
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={isLoading}
            fullWidth
            style={styles.saveButton}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for scroll content to clear the footer
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F1F5F9', // Slate-100
    borderWidth: 1,
    borderColor: '#CBD5E1', // Slate-300
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF', // Blue
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  formContainer: {
    marginTop: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  saveButton: {
    backgroundColor: '#000', // Black button as per design
    borderRadius: 12,
  },
  cameraIcon: {
    width: 40,
    height: 32,
    backgroundColor: '#334155',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#475569',
    borderWidth: 2,
    borderColor: '#94A3B8',
  },
  plusIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
