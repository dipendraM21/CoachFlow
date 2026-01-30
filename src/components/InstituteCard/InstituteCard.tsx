import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { ArrowRightIcon } from './icons';
import { instituteCardStyles } from './InstituteCard.styles';

interface InstituteCardProps {
  logo?: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  onPress?: () => void;
}

export const InstituteCard: React.FC<InstituteCardProps> = React.memo(
  ({ logo, name, location, onPress }) => {
    const content = (
      <View style={instituteCardStyles.card}>
        <View style={instituteCardStyles.logoContainer}>
          {logo ? (
            <Image
              source={{ uri: logo }}
              style={instituteCardStyles.logo}
              resizeMode="cover"
            />
          ) : (
            <View style={instituteCardStyles.logoPlaceholder}>
              <View style={instituteCardStyles.logoCross}>
                <View style={instituteCardStyles.crossHorizontal} />
                <View style={instituteCardStyles.crossVertical} />
              </View>
            </View>
          )}
        </View>
        <View style={instituteCardStyles.info}>
          <Text style={instituteCardStyles.name}>{name}</Text>
          <Text style={instituteCardStyles.location}>
            {location.city}, {location.state}
          </Text>
        </View>
        {onPress && (
          <View style={instituteCardStyles.arrowContainer}>
            <ArrowRightIcon size={20} color={colors.grey_600} />
          </View>
        )}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  },
);

InstituteCard.displayName = 'InstituteCard';
