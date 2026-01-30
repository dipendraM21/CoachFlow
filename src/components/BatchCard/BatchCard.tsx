import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Batch } from '../../types/batch';
import { batchCardStyles } from './BatchCard.styles';
import {
  BookmarkIcon,
  CalendarIcon,
  ClockIcon,
  CompassIcon,
  FlaskIcon,
  GlobeIcon,
  GraduationIcon,
  HourglassIcon,
} from './icons';
import { formatDate, formatTime } from './utils';

interface BatchCardProps {
  batch: Batch;
  onViewDetails: (batchId: string) => void;
}

// Helper to render institute icon
const InstituteIcon = ({ type, color }: { type?: string; color?: { bg: string; color: string } }) => {
  const size = 32;
  const iconColor = color?.color || '#000';
  const bgColor = color?.bg || '#F3F4F6';

  let IconComponent = GraduationIcon;
  if (type === 'flask') IconComponent = FlaskIcon;
  if (type === 'compass') IconComponent = CompassIcon;

  return (
    <View style={[batchCardStyles.instituteIconContainer, { backgroundColor: bgColor }]}>
      <IconComponent size={20} color={iconColor} />
    </View>
  );
};

export const BatchCard: React.FC<BatchCardProps> = React.memo(
  ({ batch, onViewDetails }) => {
    const handleViewDetails = React.useCallback(() => {
      onViewDetails(batch.id);
    }, [batch.id, onViewDetails]);

    return (
      <View style={batchCardStyles.card}>
        <View style={batchCardStyles.mainContent}>
          {/* Header: Icon, Name, Bookmark */}
          <View style={batchCardStyles.headerRow}>
            <View style={batchCardStyles.headerLeft}>
              <InstituteIcon
                type={batch.instituteIcon}
                color={batch.instituteIconColor}
              />
              <View style={batchCardStyles.instituteInfo}>
                <Text style={batchCardStyles.instituteName}>{batch.institute.name}</Text>
                <Text style={batchCardStyles.instituteLocation}>
                  {batch.institute.location.city}, {batch.institute.location.state}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={batchCardStyles.bookmarkButton}>
              <BookmarkIcon size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Title & Badge */}
          <View style={batchCardStyles.titleSection}>
            <Text style={batchCardStyles.batchTitle}>{batch.name}</Text>
            {batch.subtitle && (
              <View style={batchCardStyles.badgeContainer}>
                <Text style={batchCardStyles.badgeText}>{batch.subtitle}</Text>
              </View>
            )}
          </View>

          {/* Info Grid */}
          <View style={batchCardStyles.gridContainer}>
            {/* Row 1 */}
            <View style={batchCardStyles.gridRow}>
              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <CalendarIcon size={14} color="#94A3B8" />
                  <Text style={batchCardStyles.gridLabel}>STARTS</Text>
                </View>
                <Text style={batchCardStyles.gridValue}>
                   {formatDate(batch.startDate)}
                </Text>
              </View>

              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <ClockIcon size={14} color="#94A3B8" />
                  <Text style={batchCardStyles.gridLabel}>TIMING</Text>
                </View>
                <Text style={batchCardStyles.gridValue}>
                  {formatTime(batch.timing.start)} - {formatTime(batch.timing.end)}
                </Text>
              </View>
            </View>

            {/* Row 2 */}
            <View style={batchCardStyles.gridRow}>
              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <HourglassIcon size={14} color="#94A3B8" />
                  <Text style={batchCardStyles.gridLabel}>DURATION</Text>
                </View>
                <Text style={batchCardStyles.gridValue}>{batch.duration}</Text>
              </View>

              <View style={batchCardStyles.gridItem}>
                <View style={batchCardStyles.gridLabelRow}>
                  <GlobeIcon size={14} color="#94A3B8" />
                  <Text style={batchCardStyles.gridLabel}>MEDIUM</Text>
                </View>
                <Text style={batchCardStyles.gridValue}>
                  {batch.medium || 'English'}
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={batchCardStyles.footer}>
            {batch.promoStatus ? (
              <View style={[batchCardStyles.statusChip, batchCardStyles.statusWarning]}>
                 <View style={[batchCardStyles.statusDot, { backgroundColor: '#F59E0B' }]} />
                 <Text style={[batchCardStyles.statusText, { color: '#B45309' }]}>
                    {batch.promoStatus}
                 </Text>
              </View>
            ) : (
               <View style={[batchCardStyles.statusChip, batchCardStyles.statusSuccess]}>
                 <View style={[batchCardStyles.statusDot, { backgroundColor: '#10B981' }]} />
                 <Text style={[batchCardStyles.statusText, { color: '#047857' }]}>
                    {batch.seatsLeft} Seats Left
                 </Text>
              </View>
            )}

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
    // Custom comparison for React.memo
    return (
      prevProps.batch.id === nextProps.batch.id &&
      prevProps.batch.seatsLeft === nextProps.batch.seatsLeft &&
      prevProps.onViewDetails === nextProps.onViewDetails
    );
  },
);

BatchCard.displayName = 'BatchCard';
