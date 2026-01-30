import React from 'react';
import { View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';

export const CalendarIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.calendarOuter(size, color)}>
      <View style={iconStyles.calendarHeader(size, color)} />
      <View style={iconStyles.calendarDot(size, color)} />
    </View>
  </View>
);

export const ClockIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.clockOuter(size, color)}>
      <View style={iconStyles.clockHandVertical(size, color)} />
      <View style={iconStyles.clockHandHorizontal(size, color)} />
    </View>
  </View>
);

export const HourglassIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.hourglassContainer(size)}>
      <View style={iconStyles.hourglassTop(size, color)} />
      <View style={iconStyles.hourglassBottom(size, color)} />
    </View>
  </View>
);

export const PlusIcon: React.FC<{
  size?: number;
  color?: string;
  bgColor?: string;
}> = ({ size = 40, color = colors.info, bgColor = '#E1EEFF' }) => (
  <View style={iconStyles.plusContainer(size, bgColor)}>
    <View style={iconStyles.plusVertical(size, color)} />
    <View style={iconStyles.plusHorizontal(size, color)} />
  </View>
);

export const BookmarkIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.bookmarkPath(size, color)} />
  </View>
);

export const GlobeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.globeCircle(size, color)} />
    <View style={iconStyles.globeMeridian(size, color)} />
    <View style={iconStyles.globeEquator(size, color)} />
  </View>
);

export const GraduationIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.gradCapTop(size, color)} />
    <View style={iconStyles.gradCapBottom(size, color)} />
  </View>
);

export const FlaskIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.flaskBody(size, color)} />
    <View style={iconStyles.flaskNeck(size, color)} />
  </View>
);

export const CompassIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colors.info,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.compassCircle(size, color)} />
    <View style={iconStyles.compassNeedle(size, color)} />
  </View>
);

const iconStyles = {
  container: (size: number) => ({
    width: RFont(size),
    height: RFont(size),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  }),
  calendarOuter: (size: number, color: string) => ({
    width: RFont(size * 0.75),
    height: RFont(size * 0.75),
    borderRadius: RFont(size * 0.15),
    borderWidth: 1.5,
    borderColor: color,
    justifyContent: 'flex-start' as const,
    alignItems: 'center' as const,
    paddingTop: RFont(size * 0.1),
  }),
  calendarHeader: (size: number, color: string) => ({
    width: RFont(size * 0.4),
    height: RFont(size * 0.15),
    borderBottomWidth: 1.5,
    borderBottomColor: color,
  }),
  calendarDot: (size: number, color: string) => ({
    width: RFont(size * 0.15),
    height: RFont(size * 0.15),
    borderRadius: RFont(size * 0.075),
    backgroundColor: color,
    marginTop: RFont(size * 0.05),
  }),
  clockOuter: (size: number, color: string) => ({
    width: RFont(size),
    height: RFont(size),
    borderRadius: RFont(size / 2),
    borderWidth: 1.5,
    borderColor: color,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    position: 'relative' as const,
  }),
  clockHandVertical: (size: number, color: string) => ({
    position: 'absolute' as const,
    width: RFont(1.5),
    height: RFont(size * 0.35),
    backgroundColor: color,
    top: RFont(size * 0.15),
  }),
  clockHandHorizontal: (size: number, color: string) => ({
    position: 'absolute' as const,
    width: RFont(size * 0.25),
    height: RFont(1.5),
    backgroundColor: color,
    top: RFont(size * 0.25),
    left: RFont(size * 0.25),
  }),
  hourglassContainer: (size: number) => ({
    width: RFont(size * 0.5),
    height: RFont(size * 0.9),
    justifyContent: 'space-between' as const,
  }),
  hourglassTop: (size: number, color: string) => ({
    width: RFont(size * 0.5),
    height: RFont(size * 0.35),
    borderTopWidth: 1.5,
    borderTopColor: color,
    borderLeftWidth: 1.5,
    borderLeftColor: color,
    borderRightWidth: 1.5,
    borderRightColor: color,
    borderTopLeftRadius: RFont(size * 0.1),
    borderTopRightRadius: RFont(size * 0.1),
  }),
  hourglassBottom: (size: number, color: string) => ({
    width: RFont(size * 0.5),
    height: RFont(size * 0.35),
    borderBottomWidth: 1.5,
    borderBottomColor: color,
    borderLeftWidth: 1.5,
    borderLeftColor: color,
    borderRightWidth: 1.5,
    borderRightColor: color,
    borderBottomLeftRadius: RFont(size * 0.1),
    borderBottomRightRadius: RFont(size * 0.1),
  }),
  plusContainer: (size: number, bgColor: string) => ({
    width: RFont(size),
    height: RFont(size),
    borderRadius: RFont(size / 2),
    backgroundColor: bgColor,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    position: 'relative' as const,
  }),
  plusVertical: (size: number, color: string) => ({
    position: 'absolute' as const,
    width: RFont(1.5), // Thinner lines
    height: RFont(size * 0.35),
    backgroundColor: color,
    borderRadius: RFont(1),
  }),
  plusHorizontal: (size: number, color: string) => ({
    position: 'absolute' as const,
    width: RFont(size * 0.35),
    height: RFont(1.5),
    backgroundColor: color,
    borderRadius: RFont(1),
  }),
  bookmarkPath: (size: number, color: string) => ({
    width: RFont(size * 0.6),
    height: RFont(size * 0.8),
    borderWidth: 1.5,
    borderColor: color,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  }),
  globeCircle: (size: number, color: string) => ({
    width: RFont(size * 0.9),
    height: RFont(size * 0.9),
    borderRadius: RFont(size * 0.45),
    borderWidth: 1.5,
    borderColor: color,
    position: 'absolute' as const,
  }),
  globeMeridian: (size: number, color: string) => ({
    width: RFont(size * 0.9),
    height: RFont(1.5),
    backgroundColor: color,
    position: 'absolute' as const,
    transform: [{ rotate: '90deg' }],
  }),
  globeEquator: (size: number, color: string) => ({
    width: RFont(1.5),
    height: RFont(size * 0.9),
    backgroundColor: color,
    position: 'absolute' as const,
  }),
  gradCapTop: (size: number, color: string) => ({
    width: RFont(size * 0.8),
    height: RFont(size * 0.4),
    borderWidth: 2,
    borderColor: color,
    transform: [{ rotate: '-10deg' }],
  }),
  gradCapBottom: (size: number, color: string) => ({
    width: RFont(size * 0.6),
    height: 2,
    backgroundColor: color,
    marginTop: 2,
  }),
  flaskBody: (size: number, color: string) => ({
    width: RFont(size * 0.6),
    height: RFont(size * 0.6),
    borderRadius: RFont(size * 0.3),
    borderWidth: 2,
    borderColor: color,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  }),
  flaskNeck: (size: number, color: string) => ({
    width: RFont(size * 0.2),
    height: RFont(size * 0.4),
    backgroundColor: color,
    marginTop: -RFont(size * 0.1),
  }),
  compassCircle: (size: number, color: string) => ({
    width: RFont(size * 0.8),
    height: RFont(size * 0.8),
    borderRadius: RFont(size * 0.4),
    borderWidth: 2,
    borderColor: color,
  }),
  compassNeedle: (size: number, color: string) => ({
    position: 'absolute' as const,
    width: 2,
    height: RFont(size * 0.5),
    backgroundColor: color,
    transform: [{ rotate: '45deg' }],
  }),
};
