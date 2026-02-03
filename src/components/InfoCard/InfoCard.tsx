import React from 'react';
import { Text, View } from 'react-native';
import { infoCardStyles } from './InfoCard.styles';

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
  valueStyle?: object;
}

export const InfoCard: React.FC<InfoCardProps> = React.memo(
  ({ icon, label, value, fullWidth = false, valueStyle }) => {
    return (
      <View
        style={[infoCardStyles.card, fullWidth && infoCardStyles.fullWidth]}
      >
        <View style={infoCardStyles.headerRow}>
          <View style={infoCardStyles.iconContainer}>{icon}</View>
          <Text style={infoCardStyles.label}>{label}</Text>
        </View>
        <Text
          style={[infoCardStyles.value, valueStyle]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {value}
        </Text>
      </View>
    );
  },
);

InfoCard.displayName = 'InfoCard';
