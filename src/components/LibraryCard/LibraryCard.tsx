import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { PhoneIcon } from '../../screens/AcademyProfileScreen/icons';
import { Batch } from '../../types/batch.d';
import { CompassIcon, FlaskIcon, GraduationIcon } from '../BatchCard/icons';
import { libraryCardStyles } from './LibraryCard.styles';

interface LibraryCardProps {
  batch: Batch;
}

const InstituteIcon = ({
  type,
  color,
}: {
  type?: string;
  color?: { bg: string; color: string };
}) => {
  const iconColor = color?.color || '#000';
  const bgColor = color?.bg || '#F3F4F6';

  let IconComponent = GraduationIcon;
  if (type === 'flask') IconComponent = FlaskIcon;
  if (type === 'compass') IconComponent = CompassIcon;

  return (
    <View
      style={[
        libraryCardStyles.instituteIconContainer,
        { backgroundColor: bgColor },
      ]}
    >
      <IconComponent size={20} color={iconColor} />
    </View>
  );
};

export const LibraryCard: React.FC<LibraryCardProps> = React.memo(
  ({ batch }) => {
    const handleCall = () => {
      const phoneNumber = batch.institute.phoneNumber;
      if (phoneNumber) {
        Linking.openURL(`tel:${phoneNumber}`);
      }
    };


    return (
      <View style={libraryCardStyles.card}>
        <View style={libraryCardStyles.headerRow}>
          <InstituteIcon
            type={batch.instituteIcon}
            color={batch.instituteIconColor}
          />
          <View style={libraryCardStyles.infoContainer}>
            <View style={libraryCardStyles.instituteNameRow}>
              <Text style={libraryCardStyles.libraryName} numberOfLines={1}>
                {batch.institute.name}
              </Text>
              {batch.institute.isVerified && (
                <Image
                  source={require('../../assets/images/png/blue-tick-r.webp')}
                  style={libraryCardStyles.verifiedBadge}
                />
              )}
            </View>
            <Text style={libraryCardStyles.address}>
              {batch.subtitle}
            </Text>
          </View>
        </View>

        <View style={libraryCardStyles.detailsRow}>
          <View style={libraryCardStyles.feesContainer}>
            <Text style={libraryCardStyles.feesLabel}>Monthly Fees</Text>
            <Text style={libraryCardStyles.feesValue}>
              {batch.fees ? `₹${batch.fees}` : 'N/A'}
            </Text>
          </View>

          <View style={libraryCardStyles.actionsContainer}>
            <TouchableOpacity
              style={libraryCardStyles.callButton}
              onPress={handleCall}
              activeOpacity={0.7}
            >
              <PhoneIcon size={16} color="#2563EB" />
              <Text style={libraryCardStyles.actionText}>Call Us</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  },
);

LibraryCard.displayName = 'LibraryCard';
