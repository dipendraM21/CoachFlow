import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { ThemeButton } from '../../components/Button/Button';
import { ScreenHeader } from '../../components/Header/ScreenHeader';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import { useBatchDetails } from '../../hooks/queries/useBatchDetailsData';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';
import { GuestStackParamList } from '../../types/navigation';
import { batchDetailsStyles } from './BatchDetailsScreen.styles';
import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  DurationIcon,
  MoneyIcon,
  PhoneIcon,
  SeatsIcon,
} from './icons';
import { formatDate, formatTime } from './utils';

type NavigationProp = NativeStackNavigationProp<GuestStackParamList>;

type BatchDetailsRouteParams = {
  batchId: string;
};

export const BatchDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const batchId = useMemo(() => {
    // @ts-ignore - Route params definition might misalign with strict check
    const params = route.params as BatchDetailsRouteParams;
    return params?.batchId;
  }, [route.params]);

  const {
    data: batch,
    isLoading,
    isError,
  } = useBatchDetails(batchId || '', !!batchId);

  // const batch = apiBatch || navBatch; // Logic removed as per new requirement for fresh fetch only.

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCallNow = useCallback(() => {
    const phoneNumber = batch?.institute.phoneNumber;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.warn('No phone number available');
    }
  }, [batch?.institute.phoneNumber]);

  const handleInstitutePress = useCallback(() => {
    if (batch?.institute?.id) {
      navigation.navigate('AcademyProfile', {
        instituteId: batch.institute.id,
      });
    } else {
      console.warn('Institute ID is missing');
    }
  }, [batch, navigation]);

  if (isLoading) {
    return (
      <View
        style={[
          batchDetailsStyles.container,
          batchDetailsStyles.loadingContainer,
        ]}
      >
        {/* Placeholder for loading spinner or skeleton */}
        <Text style={{ color: colors.black }}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (isError || !batch) {
    return (
      <View style={batchDetailsStyles.container}>
        <Text style={batchDetailsStyles.errorText}>
          {t('batches.batch_not_found')}
        </Text>
      </View>
    );
  }

  const availabilityText = batch.totalSeats
    ? t('batches.seats_info', {
        left: batch.seatsLeft ?? 0,
        total: batch.totalSeats,
      })
    : t('batches.seats_left', { count: batch.seatsLeft ?? 0 });

  return (
    <View style={batchDetailsStyles.container}>
      <ScreenHeader title={t('batches.batch_details')} onBackPress={handleBack} />
      <ScrollView
        style={batchDetailsStyles.scrollView}
        contentContainerStyle={batchDetailsStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={batchDetailsStyles.summaryCard}>
          <View style={batchDetailsStyles.summaryHeader}>
            <TouchableOpacity
              style={batchDetailsStyles.instituteProfileRow}
              onPress={handleInstitutePress}
              activeOpacity={0.7}
            >
              <View style={batchDetailsStyles.institutionLogoContainer}>
                <Text style={batchDetailsStyles.institutionLogoText}>
                  {batch.institute.name.charAt(0)}
                </Text>
              </View>
              <View style={batchDetailsStyles.institutionInfo}>
                <Text style={batchDetailsStyles.academyName}>
                  {batch.institute.name}
                </Text>
                <Text style={batchDetailsStyles.academyLocation}>
                  {batch.institute.location.city},{' '}
                  {batch.institute.location.state}
                </Text>
              </View>
              <View style={batchDetailsStyles.chevronContainer}>
                <ChevronRightIcon size={24} color="#94A3B8" />
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
          <Text style={batchDetailsStyles.sectionTitle}>
            {t('batches.key_information')}
          </Text>
          <View style={batchDetailsStyles.infoGrid}>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<CalendarIcon size={20} color="#3B82F6" />}
                label={t('batches.start_date')}
                value={formatDate(batch.startDate)}
              />
            </View>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<ClockIcon size={20} color="#3B82F6" />}
                label={t('batches.timing')}
                value={
                  batch.timing
                    ? `${formatTime(batch.timing.start)} - ${formatTime(
                        batch.timing.end,
                      )}`
                    : t('common.not_available')
                }
              />
            </View>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<DurationIcon size={20} color="#3B82F6" />}
                label={t('batches.duration')}
                value={batch.duration || t('common.not_available')}
              />
            </View>
            <View style={batchDetailsStyles.infoCardWrapper}>
              <InfoCard
                icon={<SeatsIcon size={20} color="#3B82F6" />}
                label={t('batches.seats')}
                value={availabilityText}
              />
            </View>
            <View style={batchDetailsStyles.infoCardFullWidth}>
              <InfoCard
                icon={<MoneyIcon size={20} color="#3B82F6" />}
                label={t('batches.total_fees')}
                value={
                  typeof batch.fees === 'number'
                    ? `₹${batch.fees.toLocaleString()}`
                    : batch.fees || t('common.not_available')
                }
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
          title={t('batches.call_now')}
          onPress={handleCallNow}
          leftIcon={<PhoneIcon size={20} color={colors.white} />}
          fullWidth
          style={{ borderRadius: RFont(100) }} // Pill shape
        />
      </View>
    </View>
  );
};
