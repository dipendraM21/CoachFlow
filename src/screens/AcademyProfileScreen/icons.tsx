import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';

export const BackArrowIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.black_900,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.backArrow(size, color)} />
  </View>
);

export const LocationIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.locationPin(size, color)} />
    <View style={iconStyles.locationDot(size, color)} />
  </View>
);

export const GlobeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.globeOuter(size, color)} />
    <View style={iconStyles.globeInner(size, color)} />
  </View>
);

export const PhoneIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colors.white,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.phoneOuter(size, color)}>
      <View style={iconStyles.phoneHandle(size, color)} />
    </View>
  </View>
);

export const EmailIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.emailOuter(size, color)}>
      <View style={iconStyles.emailInner(size, color)} />
    </View>
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
  backArrow: (size: number, color: string) =>
    StyleSheet.create({
      arrow: {
        width: RFont(size * 0.6),
        height: RFont(size * 0.6),
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: color,
        transform: [{ rotate: '-45deg' }],
      },
    }).arrow,
  locationPin: (size: number, color: string) =>
    StyleSheet.create({
      pin: {
        width: RFont(size * 0.5),
        height: RFont(size * 0.7),
        borderRadius: RFont(size * 0.25),
        borderWidth: 1.5,
        borderColor: color,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    }).pin,
  locationDot: (size: number, color: string) =>
    StyleSheet.create({
      dot: {
        position: 'absolute',
        bottom: RFont(-size * 0.1),
        width: RFont(size * 0.3),
        height: RFont(size * 0.3),
        borderRadius: RFont(size * 0.15),
        backgroundColor: color,
      },
    }).dot,
  globeOuter: (size: number, color: string) =>
    StyleSheet.create({
      outer: {
        width: RFont(size * 0.8),
        height: RFont(size * 0.8),
        borderRadius: RFont(size * 0.4),
        borderWidth: 1.5,
        borderColor: color,
      },
    }).outer,
  globeInner: (size: number, color: string) =>
    StyleSheet.create({
      inner: {
        position: 'absolute',
        width: RFont(size * 0.5),
        height: RFont(size * 0.5),
        borderRadius: RFont(size * 0.25),
        borderWidth: 1.5,
        borderColor: color,
        top: RFont(size * 0.15),
        left: RFont(size * 0.15),
      },
    }).inner,
  phoneOuter: (size: number, color: string) =>
    StyleSheet.create({
      outer: {
        width: RFont(size * 0.7),
        height: RFont(size * 1.2),
        borderRadius: RFont(size * 0.15),
        borderWidth: 2,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
    }).outer,
  phoneHandle: (size: number, color: string) =>
    StyleSheet.create({
      handle: {
        position: 'absolute',
        bottom: RFont(-size * 0.1),
        width: RFont(size * 0.3),
        height: RFont(size * 0.15),
        borderBottomLeftRadius: RFont(size * 0.1),
        borderBottomRightRadius: RFont(size * 0.1),
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
      },
    }).handle,
  emailOuter: (size: number, color: string) =>
    StyleSheet.create({
      outer: {
        width: RFont(size * 0.9),
        height: RFont(size * 0.7),
        borderRadius: RFont(size * 0.1),
        borderWidth: 2,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }).outer,
  emailInner: (size: number, color: string) =>
    StyleSheet.create({
      inner: {
        width: RFont(size * 0.5),
        height: RFont(size * 0.3),
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: color,
        borderBottomLeftRadius: RFont(size * 0.05),
        borderBottomRightRadius: RFont(size * 0.05),
        marginTop: RFont(-size * 0.1),
      },
    }).inner,
};
