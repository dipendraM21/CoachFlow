import React from 'react';
import { View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';

export const ArrowRightIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colors.grey_600,
}) => (
  <View style={iconStyles.container(size)}>
    <View style={iconStyles.arrow(size, color)} />
  </View>
);

const iconStyles = {
  container: (size: number) => ({
    width: RFont(size),
    height: RFont(size),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  }),
  arrow: (size: number, color: string) => ({
    width: RFont(size * 0.6),
    height: RFont(size * 0.6),
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: color,
    transform: [{ rotate: '45deg' }],
    marginLeft: RFont(-size * 0.1),
  }),
};
