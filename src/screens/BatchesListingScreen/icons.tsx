import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const SearchIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.searchCircle(size, color)} />
    <View style={iconStyles.searchHandle(size, color)} />
  </View>
);

export const ProfileAvatar: React.FC<{ size?: number; text?: string }> = ({
  size = 40,
  text = 'U',
}) => (
  <View style={iconStyles.avatarContainer(size)}>
    <Text style={iconStyles.avatarText}>{text}</Text>
  </View>
);

const iconStyles = {
  container: (size: number) =>
    StyleSheet.create({
      container: {
        width: RFont(size),
        height: RFont(size),
        justifyContent: 'center',
        alignItems: 'center',
      },
    }).container,
  searchCircle: (size: number, color: string) =>
    StyleSheet.create({
      circle: {
        width: RFont(size * 0.6),
        height: RFont(size * 0.6),
        borderRadius: RFont(size * 0.3),
        borderWidth: 1.5,
        borderColor: color,
      },
    }).circle,
  searchHandle: (size: number, color: string) =>
    StyleSheet.create({
      handle: {
        position: 'absolute',
        width: RFont(size * 0.3),
        height: RFont(1.5),
        backgroundColor: color,
        transform: [{ rotate: '45deg' }],
        bottom: RFont(-size * 0.1),
        right: RFont(-size * 0.1),
      },
    }).handle,
  avatarContainer: (size: number) =>
    StyleSheet.create({
      container: {
        width: RFont(size),
        height: RFont(size),
        borderRadius: RFont(size / 2),
        backgroundColor: colors.info,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    }).container,
  avatarText: StyleSheet.create({
    text: {
      ...fontStyles.Maison_600_16PX_20LH,
      color: colors.white,
    },
  }).text,
  menuContainer: (size: number) =>
    StyleSheet.create({
      container: {
        width: RFont(size),
        height: RFont(size),
        justifyContent: 'center',
        gap: RFont(size * 0.25), // Spacing between lines
      },
      line: {
        width: '100%',
        height: RFont(2), // Line thickness
        backgroundColor: colors.black_900,
        borderRadius: RFont(1),
      },
    }),
};

export const MenuIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = '#0F172A',
}) => {
  const styles = iconStyles.menuContainer(size);
  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: color }]} />
      <View style={[styles.line, { backgroundColor: color }]} />
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  );
};
