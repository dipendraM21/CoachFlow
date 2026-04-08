import React from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';
import { CameraIcon } from './ProfileIcons';

interface ProfileAvatarProps {
  imageUri?: string | null;
  onEditPress: () => void;
  isLoading?: boolean;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = React.memo(
  ({ imageUri, onEditPress, isLoading }) => {
    return (
      <TouchableOpacity
        onPress={onEditPress}
        activeOpacity={0.8}
        style={styles.avatarContainer}
        disabled={isLoading}
      >
        <View style={styles.imageWrapper}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image
              source={{ uri: 'https://avatar.iran.liara.run/public' }}
              style={styles.image}
            />
          )}

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color={colors.white} />
            </View>
          )}
        </View>

        <View style={styles.cameraButton}>
          <CameraIcon size={14} color={colors.white} />
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  avatarContainer: {
    width: RFont(100),
    height: RFont(100),
    marginBottom: RFont(16),
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: RFont(50),
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: colors.grey_100,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: RFont(50),
    overflow: 'hidden',
    position: 'relative',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: RFont(32),
    height: RFont(32),
    borderRadius: RFont(16),
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
