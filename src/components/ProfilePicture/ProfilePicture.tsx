import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';
import { ThemeButton } from '../Button/Button';

interface ProfilePictureProps {
  imageUri?: string | null;
  onPress: () => void;
  size?: number;
}

export const ProfilePicture = React.memo<ProfilePictureProps>(
  ({ imageUri, onPress, size = 120 }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.imageContainer, { width: size, height: size }]}
          activeOpacity={0.8}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
          )}
        </TouchableOpacity>
        <ThemeButton
          onPress={onPress}
          variant="primary"
          size="sm"
          leftIcon={
            <View style={styles.plusIcon}>
              <View style={styles.plusHorizontal} />
              <View style={styles.plusVertical} />
            </View>
          }
          style={styles.addButtonWithPosition}
          backgroundColor={colors.info}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
  },
  imageContainer: {
    borderRadius: RFont(60),
    borderWidth: 1.5,
    borderColor: colors.grayLighter,
    borderStyle: 'dashed',
    overflow: 'hidden',
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: RFont(32),
    color: colors.grayLight,
  },
  addButton: {
    position: 'absolute',
    width: RFont(32),
    height: RFont(32),
    borderRadius: RFont(16),
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    // Positioning
    bottom: 0,
    right: 5,
    zIndex: 10,
  },
  plusIcon: {
    width: RFont(14),
    height: RFont(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    width: RFont(12),
    height: RFont(2),
    backgroundColor: colors.white,
    borderRadius: RFont(1),
  },
  plusVertical: {
    position: 'absolute',
    width: RFont(2),
    height: RFont(12),
    backgroundColor: colors.white,
    borderRadius: RFont(1),
  },
  addButtonWithPosition: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    width: RFont(32),
    height: RFont(32),
    borderRadius: RFont(16),
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    zIndex: 10,
  },
});
