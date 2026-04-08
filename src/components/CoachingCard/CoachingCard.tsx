import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSubscribeInstitute } from '../../hooks/mutations/useSubscribeInstitute';
import { Batch } from '../../types/batch';
import { CompassIcon, FlaskIcon, GraduationIcon } from '../BatchCard/icons';
import { SubscribeButton } from '../Button/SubscribeButton';
import { coachingCardStyles } from './CoachingCard.styles';

interface CoachingCardProps {
  batch: Batch;
  onViewDetails: (batchId: string) => void;
  onSubscribe?: (batchId: string) => void;
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
        coachingCardStyles.instituteIconContainer,
        { backgroundColor: bgColor },
      ]}
    >
      <IconComponent size={20} color={iconColor} />
    </View>
  );
};

export const CoachingCard: React.FC<CoachingCardProps> = React.memo(
  ({ batch, onViewDetails, onSubscribe }) => {
    const { mutate: subscribe, isPending } = useSubscribeInstitute();

    const handleSubscribe = useCallback(() => {
      const id = batch.institute.id || batch.id;
      subscribe(
        { instituteId: id, unsubscribe: batch.isSubscribed },
        {
          onSuccess: () => {
            onSubscribe?.(id);
          },
        },
      );
    }, [batch.institute.id, batch.id, batch.isSubscribed, subscribe, onSubscribe]);

    return (
      <View style={coachingCardStyles.card}>
        <View style={coachingCardStyles.headerRow}>
          <InstituteIcon
            type={batch.instituteIcon}
            color={batch.instituteIconColor}
          />
          <View style={coachingCardStyles.infoContainer}>
            <View style={coachingCardStyles.instituteNameRow}>
              <Text style={coachingCardStyles.coachingName} numberOfLines={1}>
                {batch.institute.name}
              </Text>
              {batch.institute.isVerified && (
                <Image
                  source={require('../../assets/images/png/blue-tick-r.webp')}
                  style={coachingCardStyles.verifiedBadge}
                />
              )}
            </View>
            <Text style={coachingCardStyles.address}>
              {batch.subtitle}
            </Text>
          </View>
        </View>

        <View style={coachingCardStyles.buttonRow}>
          <SubscribeButton
            onPress={handleSubscribe}
            isLoading={isPending}
            isSubscribed={batch.isSubscribed}
          />

          <TouchableOpacity
            style={coachingCardStyles.viewDetailButton}
            onPress={() => onViewDetails(batch.institute.id || batch.id)}
            activeOpacity={0.7}
          >
            <Text style={coachingCardStyles.viewDetailText}>View Batches</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

CoachingCard.displayName = 'CoachingCard';
