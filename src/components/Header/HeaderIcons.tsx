import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RFont } from '../../theme/fonts';

// New Graduation Cap Icon (Logo)
export const GraduationCapIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = '#2563EB', // Primary Blue
}) => (
  <View style={iconStyles.logoContainer(size, color)}>
    <View style={iconStyles.capTop(size)} />
    <View style={iconStyles.capBottom(size)} />
    <View style={iconStyles.tassel(size)} />
  </View>
);

// ... (MagnifyingGlassIcon and others remain unchanged) ...

export const MagnifyingGlassIcon: React.FC<{
  size?: number;
  color?: string;
}> = ({ size = 20, color = '#94A3B8' }) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.lens(size, color)} />
    <View style={iconStyles.handle(size, color)} />
  </View>
);

export const LocationPinIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 14,
  color = '#2563EB',
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.pinHead(size, color)} />
    <View style={iconStyles.pinPoint(size, color)} />
    <View style={iconStyles.pinHole(size)} />
  </View>
);

export const ChevronDownIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 10,
  color = '#0F172A',
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.chevron(size, color)} />
  </View>
);

export const ProfileUserIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = '#FF9F78', // Orange/Peach from reference
}) => (
  <View style={iconStyles.avatarContainer(size, color)}>
    <View style={iconStyles.userHead(size, '#FFFFFF')} />
    <View style={iconStyles.userBody(size, '#FFFFFF')} />
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
  // Logo Styles
  logoContainer: (size: number, color: string) =>
    StyleSheet.create({
      container: {
        width: RFont(size),
        height: RFont(size),
        borderRadius: RFont(size / 2),
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }).container,
  capTop: (size: number) =>
    StyleSheet.create({
      part: {
        width: RFont(size * 0.6),
        height: RFont(size * 0.6),
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '45deg' }, { scaleY: 0.5 }],
        marginBottom: RFont(size * 0.1),
      },
    }).part,
  capBottom: (size: number) =>
    StyleSheet.create({
      part: {
        width: RFont(size * 0.4),
        height: RFont(size * 0.15),
        borderBottomWidth: 1.5,
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: '#FFFFFF',
        borderBottomLeftRadius: RFont(size * 0.2),
        borderBottomRightRadius: RFont(size * 0.2),
        position: 'absolute',
        top: RFont(size * 0.45),
      },
    }).part,
  tassel: (size: number) =>
    StyleSheet.create({
      part: {
        width: RFont(size * 0.05),
        height: RFont(size * 0.25),
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        right: RFont(size * 0.25),
        top: RFont(size * 0.4),
        transform: [{ rotate: '20deg' }],
      },
    }).part,
  // Magnifying Glass
  lens: (size: number, color: string) =>
    StyleSheet.create({
      lens: {
        width: RFont(size * 0.65),
        height: RFont(size * 0.65),
        borderRadius: RFont(size * 0.325),
        borderWidth: 1.8,
        borderColor: color,
      },
    }).lens,
  handle: (size: number, color: string) =>
    StyleSheet.create({
      handle: {
        width: RFont(size * 0.35),
        height: 1.8,
        backgroundColor: color,
        position: 'absolute',
        bottom: RFont(size * 0.15),
        right: RFont(size * 0.15),
        transform: [{ rotate: '45deg' }],
      },
    }).handle,
  // Location Pin
  pinHead: (size: number, color: string) =>
    StyleSheet.create({
      head: {
        width: RFont(size * 0.8),
        height: RFont(size * 0.8),
        borderRadius: RFont(size * 0.4),
        backgroundColor: color,
        position: 'absolute',
        top: 0,
        zIndex: 1,
      },
    }).head,
  pinPoint: (size: number, color: string) =>
    StyleSheet.create({
      point: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: RFont(size * 0.35),
        borderRightWidth: RFont(size * 0.35),
        borderTopWidth: RFont(size * 0.5),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        position: 'absolute',
        top: RFont(size * 0.55),
      },
    }).point,
  pinHole: (size: number) =>
    StyleSheet.create({
      hole: {
        width: RFont(size * 0.3),
        height: RFont(size * 0.3),
        borderRadius: RFont(size * 0.15),
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        zIndex: 2,
        top: RFont(size * 0.25),
      },
    }).hole,
  chevron: (size: number, color: string) =>
    StyleSheet.create({
      chevron: {
        width: RFont(size * 0.6),
        height: RFont(size * 0.6),
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: -RFont(size * 0.2), // Adjust vertical centering
      },
    }).chevron,
  // Profile
  avatarContainer: (size: number, color: string) =>
    StyleSheet.create({
      container: {
        width: RFont(size),
        height: RFont(size),
        borderRadius: RFont(size / 2),
        backgroundColor: color, // Orange bg
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
    }).container,
  userHead: (size: number, color: string) =>
    StyleSheet.create({
      head: {
        width: RFont(size * 0.4),
        height: RFont(size * 0.4),
        borderRadius: RFont(size * 0.2),
        backgroundColor: color,
        position: 'absolute',
        top: RFont(size * 0.2),
      },
    }).head,
  userBody: (size: number, color: string) =>
    StyleSheet.create({
      body: {
        width: RFont(size * 0.7),
        height: RFont(size * 0.4),
        borderTopLeftRadius: RFont(size * 0.35),
        borderTopRightRadius: RFont(size * 0.35),
        backgroundColor: color,
        position: 'absolute',
        bottom: -RFont(size * 0.05),
      },
    }).body,
};
