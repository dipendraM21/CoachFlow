import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeButton } from '../components/Button/Button';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { InfoCard } from '../components/InfoCard/InfoCard';
import { GuestStackParamList } from '../navigation/GuestNavigator';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';
import { Academy } from '../types/academy';
import { Batch } from '../types/batch';
import { batchDetailsStyles } from './BatchDetailsScreen/BatchDetailsScreen.styles';
import {
    CalendarIcon,
    ChevronRightIcon,
    ClockIcon,
    HourglassIcon,
    PeopleIcon,
    PhoneIcon,
    RupeeIcon,
} from './BatchDetailsScreen/icons';
import { formatDate, formatTime } from './BatchDetailsScreen/utils';

type NavigationProp = NativeStackNavigationProp<GuestStackParamList>;

type BatchDetailsRouteParams = {
  batch: Batch;
};

export const BatchDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const batch = useMemo(() => {
    const params = route.params as BatchDetailsRouteParams;
    return params?.batch;
  }, [route.params]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCallNow = useCallback(() => {
    // TODO: Implement call functionality
    console.log('Call Now pressed');
  }, []);

  const handleInstitutePress = useCallback(() => {
    if (batch?.institute) {
      const academy: Academy = {
        id: batch.institute.id,
        name: batch.institute.name,
        logo: batch.institute.logo,
        location: batch.institute.location,
        batches: [batch], // Include current batch in recent batches
      };
      navigation.navigate('AcademyProfile', { academy });
    }
  }, [batch, navigation]);

  if (!batch) {
    return (
      <View style={batchDetailsStyles.container}>
        <Text style={batchDetailsStyles.errorText}>Batch not found</Text>
      </View>
    );
  }

  const availabilityText = batch.totalSeats
    ? `${batch.seatsLeft} / ${batch.totalSeats} Seats`
    : `${batch.seatsLeft} Seats Left`;

  return (
    <View style={batchDetailsStyles.container}>
      {/* Header */}
      {/* Header */}
      <ScreenHeader
        title="Batch Details"
        onBackPress={handleBack}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={batchDetailsStyles.scrollView}
        contentContainerStyle={batchDetailsStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Batch Summary Card */}
        <View style={batchDetailsStyles.summaryCard}>
          <View style={batchDetailsStyles.summaryHeader}>
            <TouchableOpacity
              style={batchDetailsStyles.instituteProfileRow}
              onPress={handleInstitutePress}
              activeOpacity={0.7}
            >
              <View style={batchDetailsStyles.institutionLogoContainer}>
                 <Text style={batchDetailsStyles.institutionLogoText}>{batch.institute.name.charAt(0)}</Text>
              </View>
              <View style={batchDetailsStyles.institutionInfo}>
                 <Text style={batchDetailsStyles.academyName}>{batch.institute.name}</Text>
                 <Text style={batchDetailsStyles.academyLocation}>{batch.institute.location.city}, {batch.institute.location.state}</Text>
              </View>
              <View style={batchDetailsStyles.chevronContainer}>
                <ChevronRightIcon size={16} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={batchDetailsStyles.divider} />

          <Text style={batchDetailsStyles.batchName}>{batch.name}</Text>
          {batch.subtitle && (
            <Text style={batchDetailsStyles.batchSubtitle}>
              {batch.subtitle}
            </Text>
          )}
        </View>

        {/* Key Information Section */}
        <View style={batchDetailsStyles.keyInfoSection}>
          <Text style={batchDetailsStyles.sectionTitle}>KEY INFORMATION</Text>
          <View style={batchDetailsStyles.infoGrid}>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<CalendarIcon size={20} color="#3B82F6" />}
                label="Start Date"
                value={formatDate(batch.startDate)}
              />
            </View>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<ClockIcon size={20} color="#3B82F6" />}
                label="Timing"
                value={`${formatTime(batch.timing.start)} - ${formatTime(
                  batch.timing.end,
                )}`}
              />
            </View>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<HourglassIcon size={20} color="#3B82F6" />}
                label="Duration"
                value={batch.duration}
              />
            </View>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<PeopleIcon size={20} color="#3B82F6" />}
                label="Seats"
                value={availabilityText}
              />
            </View>
            <View style={batchDetailsStyles.infoCardFullWidth}>
              <InfoCard
                icon={<RupeeIcon size={20} color="#3B82F6" />}
                label="Total Fees"
                value={batch.fees || 'Not Available'}
                fullWidth
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View
        style={[
          batchDetailsStyles.bottomButtonContainer,
          {
            paddingBottom: insets.bottom + RFont(16),
          },
        ]}
      >
        <ThemeButton
          title="Call Now"
          onPress={handleCallNow}
          leftIcon={<PhoneIcon size={20} color={colors.white} />}
          fullWidth
          style={{ borderRadius: RFont(100) }} // Pill shape
        />
      </View>
    </View>
  );
};
