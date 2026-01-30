import React from 'react';
import { Text, View } from 'react-native';
import { infoCardStyles } from './InfoCard.styles';

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = React.memo(
  ({ icon, label, value, fullWidth = false }) => {
    return (
      <View
        style={[infoCardStyles.card, fullWidth && infoCardStyles.fullWidth]}
      >
        <View style={infoCardStyles.headerRow}>
          <View style={infoCardStyles.iconContainer}>{icon}</View>
          <Text style={infoCardStyles.label}>{label}</Text>
        </View>
        <Text style={infoCardStyles.value}>{value}</Text>
      </View>
    );
  },
);

InfoCard.displayName = 'InfoCard';
