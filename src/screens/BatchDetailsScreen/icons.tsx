import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

export const CalendarIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.calendarOuter(size, color)}>
      <View style={iconStyles.calendarHeader(size, color)} />
      <View style={iconStyles.calendarDot(size, color)} />
    </View>
  </View>
);

export const ClockIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.clockOuter(size, color)}>
      <View style={iconStyles.clockHandVertical(size, color)} />
      <View style={iconStyles.clockHandHorizontal(size, color)} />
    </View>
  </View>
);

export const HourglassIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.warning,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.hourglassContainer(size)}>
      <View style={iconStyles.hourglassTop(size, color)} />
      <View style={iconStyles.hourglassBottom(size, color)} />
    </View>
  </View>
);

export const PeopleIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.success,
}) => (
  <View style={iconStyles.peopleContainer(size)}>
    {[0, 1].map(i => (
      <View key={i} style={iconStyles.peopleCircle(size, color)} />
    ))}
  </View>
);

export const RupeeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.rupeeOuter(size, color)}>
      <Text style={iconStyles.rupeeText(color)}>₹</Text>
    </View>
  </View>
);

export const BackArrowIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.black_900,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.backArrow(size, color)} />
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

export const ChevronRightIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.chevronRight(size, color)} />
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
  calendarOuter: (size: number, color: string) =>
    StyleSheet.create({
      outer: {
        width: RFont(size * 0.75),
        height: RFont(size * 0.75),
        borderRadius: RFont(size * 0.15),
        borderWidth: 2,
        borderColor: color,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: RFont(size * 0.1),
      },
    }).outer,
  calendarHeader: (size: number, color: string) =>
    StyleSheet.create({
      header: {
        width: RFont(size * 0.4),
        height: RFont(size * 0.15),
        borderBottomWidth: 2,
        borderBottomColor: color,
      },
    }).header,
  calendarDot: (size: number, color: string) =>
    StyleSheet.create({
      dot: {
        width: RFont(size * 0.15),
        height: RFont(size * 0.15),
        borderRadius: RFont(size * 0.075),
        backgroundColor: color,
        marginTop: RFont(size * 0.05),
      },
    }).dot,
  clockOuter: (size: number, color: string) =>
    StyleSheet.create({
      outer: {
        width: RFont(size * 0.8),
        height: RFont(size * 0.8),
        borderRadius: RFont(size * 0.4),
        borderWidth: 2,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
    }).outer,
  clockHandVertical: (size: number, color: string) =>
    StyleSheet.create({
      hand: {
        position: 'absolute',
        width: RFont(2),
        height: RFont(size * 0.35),
        backgroundColor: color,
        top: RFont(size * 0.15),
      },
    }).hand,
  clockHandHorizontal: (size: number, color: string) =>
    StyleSheet.create({
      hand: {
        position: 'absolute',
        width: RFont(size * 0.25),
        height: RFont(2),
        backgroundColor: color,
        top: RFont(size * 0.25),
        left: RFont(size * 0.25),
      },
    }).hand,
  hourglassContainer: (size: number) =>
    StyleSheet.create({
      container: {
        width: RFont(size * 0.5),
        height: RFont(size * 0.9),
        justifyContent: 'space-between',
      },
    }).container,
  hourglassTop: (size: number, color: string) =>
    StyleSheet.create({
      top: {
        width: RFont(size * 0.5),
        height: RFont(size * 0.35),
        borderTopWidth: 2,
        borderTopColor: color,
        borderLeftWidth: 2,
        borderLeftColor: color,
        borderRightWidth: 2,
        borderRightColor: color,
        borderTopLeftRadius: RFont(size * 0.1),
        borderTopRightRadius: RFont(size * 0.1),
      },
    }).top,
  hourglassBottom: (size: number, color: string) =>
    StyleSheet.create({
      bottom: {
        width: RFont(size * 0.5),
        height: RFont(size * 0.35),
        borderBottomWidth: 2,
        borderBottomColor: color,
        borderLeftWidth: 2,
        borderLeftColor: color,
        borderRightWidth: 2,
        borderRightColor: color,
        borderBottomLeftRadius: RFont(size * 0.1),
        borderBottomRightRadius: RFont(size * 0.1),
      },
    }).bottom,
  peopleContainer: (size: number) =>
    StyleSheet.create({
      container: {
        width: RFont(size),
        height: RFont(size),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: RFont(2),
      },
    }).container,
  peopleCircle: (size: number, color: string) =>
    StyleSheet.create({
      circle: {
        width: RFont(size * 0.4),
        height: RFont(size * 0.4),
        borderRadius: RFont(size * 0.2),
        borderWidth: 2,
        borderColor: color,
        backgroundColor: color,
        opacity: 0.3,
      },
    }).circle,
  rupeeOuter: (size: number, color: string) =>
    StyleSheet.create({
      outer: {
        width: RFont(size * 0.7),
        height: RFont(size * 0.7),
        borderRadius: RFont(size * 0.1),
        borderWidth: 2,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }).outer,
  rupeeText: (color: string) =>
    StyleSheet.create({
      text: {
        ...fontStyles.Maison_600_16PX_20LH,
        color: color,
      },
    }).text,
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
  chevronRight: (size: number, color: string) =>
    StyleSheet.create({
      chevron: {
        width: RFont(size * 0.4),
        height: RFont(size * 0.4),
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      },
    }).chevron,
};
