import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';

export const CalendarIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.calendarOuter(size, color)}>
      <View style={iconStyles.calendarHeader(size, color)} />
      <View style={iconStyles.calendarBody(size, color)} />
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

export const DurationIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.durationContainer(size)}>
      <View style={iconStyles.durationBracketTopLeft(size, color)} />
      <View style={iconStyles.durationBracketBottomRight(size, color)} />
      <View style={iconStyles.durationCenter(size, color)} />
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

// Replaced by MoneyIcon for consistency with design
export const MoneyIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.moneyStack(size, color)}>
      <View style={iconStyles.moneyBill(size, color)} />
      <View style={iconStyles.moneyBillTop(size, color)} />
      <View style={iconStyles.moneyCircle(size, color)} />
    </View>
  </View>
);

export const SeatsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.seatsContainer(size)}>
      <View style={iconStyles.seatDot(size, color)} />
      <View style={iconStyles.seatDot(size, color)} />
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
        width: RFont(size * 0.8),
        height: RFont(size * 0.8),
        borderRadius: RFont(size * 0.2),
        borderWidth: 1.5,
        borderColor: color,
        alignItems: 'center',
        overflow: 'hidden',
      },
    }).outer,
  calendarHeader: (size: number, color: string) =>
    StyleSheet.create({
      header: {
        width: '100%',
        height: RFont(size * 0.25),
        backgroundColor: color,
        opacity: 0.1,
        borderBottomWidth: 1,
        borderBottomColor: color,
      },
    }).header,
  calendarBody: (size: number, color: string) =>
    StyleSheet.create({
      body: {
        width: RFont(size * 0.4),
        height: RFont(size * 0.05),
        backgroundColor: color,
        marginTop: RFont(size * 0.15),
        borderRadius: RFont(1),
        opacity: 0.5,
      },
    }).body,
  clockOuter: (size: number, color: string) =>
    StyleSheet.create({
      outer: {
        width: RFont(size * 0.85),
        height: RFont(size * 0.85),
        borderRadius: RFont(size * 0.5),
        borderWidth: 1.5,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }).outer,
  clockHandVertical: (size: number, color: string) =>
    StyleSheet.create({
      hand: {
        position: 'absolute',
        width: 1.5,
        height: RFont(size * 0.3),
        backgroundColor: color,
        bottom: '50%',
        borderRadius: 1,
      },
    }).hand,
  clockHandHorizontal: (size: number, color: string) =>
    StyleSheet.create({
      hand: {
        position: 'absolute',
        width: RFont(size * 0.25),
        height: 1.5,
        backgroundColor: color,
        left: '50%',
        borderRadius: 1,
      },
    }).hand,
  durationContainer: (size: number) =>
    StyleSheet.create({
      container: {
        width: RFont(size * 0.8),
        height: RFont(size * 0.8),
        justifyContent: 'center',
        alignItems: 'center',
      },
    }).container,
  durationBracketTopLeft: (size: number, color: string) =>
    StyleSheet.create({
      bracket: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: RFont(size * 0.25),
        height: RFont(size * 0.25),
        borderTopWidth: 1.5,
        borderLeftWidth: 1.5,
        borderColor: color,
        borderTopLeftRadius: RFont(4),
      },
    }).bracket,
  durationBracketBottomRight: (size: number, color: string) =>
    StyleSheet.create({
      bracket: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: RFont(size * 0.25),
        height: RFont(size * 0.25),
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: color,
        borderBottomRightRadius: RFont(4),
      },
    }).bracket,
  durationCenter: (size: number, color: string) =>
    StyleSheet.create({
      center: {
        width: RFont(size * 0.4),
        height: 1.5,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
      },
    }).center,
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
  moneyStack: (size: number, _color: string) =>
    StyleSheet.create({
      stack: {
        width: RFont(size),
        height: RFont(size),
        justifyContent: 'center',
        alignItems: 'center',
      },
    }).stack,
  moneyBill: (size: number, color: string) =>
    StyleSheet.create({
      bill: {
        position: 'absolute',
        width: RFont(size * 0.8),
        height: RFont(size * 0.5),
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: RFont(4),
        top: RFont(size * 0.1),
        left: RFont(size * 0.05),
        opacity: 0.5,
      },
    }).bill,
  moneyBillTop: (size: number, color: string) =>
    StyleSheet.create({
      bill: {
        position: 'absolute',
        width: RFont(size * 0.8),
        height: RFont(size * 0.5),
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: RFont(4),
        backgroundColor: 'transparent',
        zIndex: 2,
        top: RFont(size * 0.25),
        left: RFont(size * 0.15),
      },
    }).bill,
  moneyCircle: (size: number, color: string) =>
    StyleSheet.create({
      circle: {
        position: 'absolute',
        width: RFont(size * 0.25),
        height: RFont(size * 0.25),
        borderRadius: RFont(size * 0.125),
        borderWidth: 1.5,
        borderColor: color,
        zIndex: 3,
        top: RFont(size * 0.38), // Centered vertically in top bill
        left: RFont(size * 0.42),
      },
    }).circle,
  seatsContainer: (_size: number) =>
    StyleSheet.create({
      container: {
        flexDirection: 'row',
        gap: RFont(4),
        alignItems: 'center',
        justifyContent: 'center',
      },
    }).container,
  seatDot: (size: number, color: string) =>
    StyleSheet.create({
      dot: {
        width: RFont(size * 0.3),
        height: RFont(size * 0.3),
        borderRadius: RFont(size * 0.15),
        backgroundColor: color,
        opacity: 0.8, // Slightly softer
      },
    }).dot,
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
