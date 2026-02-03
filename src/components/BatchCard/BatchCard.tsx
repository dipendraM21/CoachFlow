import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Batch } from '../../types/batch';
import { batchCardStyles } from './BatchCard.styles';
import { CompassIcon, FlaskIcon, GraduationIcon } from './icons';
import { formatDate } from './utils';

interface BatchCardProps {
  batch: Batch;
  onViewDetails: (batchId: string) => void;
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
        batchCardStyles.instituteIconContainer,
        { backgroundColor: bgColor },
      ]}
    >
      <IconComponent size={20} color={iconColor} />
    </View>
  );
};

export const BatchCard: React.FC<BatchCardProps> = React.memo(
  ({ batch, onViewDetails }) => {
    const handleViewDetails = React.useCallback(() => {
      onViewDetails(batch.id);
    }, [batch.id, onViewDetails]);

    const seatStatus = useMemo(() => {
      if (batch.seatsLeft === 0)
        return { text: 'Fully Booked', color: '#EF4444', bg: '#FEE2E2' };
      return {
        text: `${batch.seatsLeft} Seats Left`,
        color: '#047857',
        bg: '#ECFDF5',
      };
    }, [batch.seatsLeft]);

    return (
      <View style={batchCardStyles.card}>
        <View style={batchCardStyles.mainContent}>
          <View style={batchCardStyles.headerRow}>
            <View style={batchCardStyles.headerLeft}>
              <InstituteIcon
                type={batch.instituteIcon}
                color={batch.instituteIconColor}
              />
              <View style={batchCardStyles.instituteInfo}>
                <View style={batchCardStyles.instituteNameRow}>
                  <Text style={batchCardStyles.instituteName} numberOfLines={1}>
                    {batch.institute.name}
                  </Text>
                  {batch.institute.isVerified && (
                    <Image
                      source={require('../../assets/images/png/blue-tick.jpeg')}
                      style={batchCardStyles.verifiedBadge}
                    />
                  )}
                </View>
                <Text style={batchCardStyles.instituteLocation}>
                  {batch.institute.location.city}
                </Text>
              </View>
            </View>
          </View>

          <View style={batchCardStyles.titleSection}>
            <Text style={batchCardStyles.batchTitle}>{batch.name}</Text>

            <View style={batchCardStyles.chipsRow}>
              {batch.subtitle.split('•').map((chip, index) => (
                <View key={index} style={batchCardStyles.chipContainer}>
                  <Text style={batchCardStyles.chipText}>{chip.trim()}</Text>
                </View>
              ))}
            </View>

            {batch.shortDescription ? (
              <Text style={batchCardStyles.shortDescription} numberOfLines={2}>
                {batch.shortDescription}
              </Text>
            ) : null}
          </View>

          <View style={batchCardStyles.gridContainer}>
            <View style={batchCardStyles.gridRow}>
              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <Text style={batchCardStyles.gridLabel}>STARTS</Text>
                </View>
                <Text style={batchCardStyles.gridValue}>
                  {formatDate(batch.startDate)}
                </Text>
              </View>

              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <Text style={batchCardStyles.gridLabel}>MODE</Text>
                </View>
                <Text style={batchCardStyles.gridValue} numberOfLines={1}>
                  {batch.mode || 'Offline'}
                </Text>
              </View>
            </View>

            <View
              style={[batchCardStyles.gridRow, batchCardStyles.gridRowSpaced]}
            >
              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <Text style={batchCardStyles.gridLabel}>DURATION</Text>
                </View>
                <Text style={batchCardStyles.gridValue}>
                  {batch.totalMonths ? `${batch.totalMonths} Months` : 'N/A'}
                </Text>
              </View>

              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <Text style={batchCardStyles.gridLabel}>FEES</Text>
                </View>
                <Text style={batchCardStyles.gridValue}>
                  {batch.fees
                    ? `₹${
                        typeof batch.fees === 'number'
                          ? batch.fees.toLocaleString('en-IN')
                          : batch.fees
                      }`
                    : 'N/A'}
                </Text>
              </View>
            </View>
          </View>

          <View style={batchCardStyles.footer}>
            <View
              style={[
                batchCardStyles.statusChip,
                { backgroundColor: seatStatus.bg },
              ]}
            >
              <View
                style={[
                  batchCardStyles.statusDot,
                  { backgroundColor: seatStatus.color },
                ]}
              />
              <Text
                style={[
                  batchCardStyles.statusText,
                  { color: seatStatus.color },
                ]}
              >
                {seatStatus.text}
              </Text>
            </View>

            <TouchableOpacity
              style={batchCardStyles.viewDetailsButton}
              onPress={handleViewDetails}
              activeOpacity={0.7}
            >
              <Text style={batchCardStyles.viewDetailsText}>VIEW DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.batch.id === nextProps.batch.id &&
      prevProps.batch.seatsLeft === nextProps.batch.seatsLeft &&
      prevProps.onViewDetails === nextProps.onViewDetails
    );
  },
);

BatchCard.displayName = 'BatchCard';
