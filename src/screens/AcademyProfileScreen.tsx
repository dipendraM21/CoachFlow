import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { BatchCard } from '../components/BatchCard/BatchCard';
import { ThemeButton } from '../components/Button/Button';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import {
  transformApiBatchToUIBatch,
  useInstituteBatchesData,
} from '../hooks/queries/useBatchDetailsData';
import { usePublicInstituteProfile } from '../hooks/queries/useInstituteProfileData';
import { Batch } from '../types/batch';
import { GuestStackParamList } from '../types/navigation';
import { academyProfileStyles } from './AcademyProfileScreen/AcademyProfileScreen.styles';
import {
  CheckIcon,
  EmailIcon,
  LocationIcon,
  PhoneIcon,
} from './AcademyProfileScreen/icons';

type AcademyProfileRouteParams = {
  instituteId: string;
};

type NavigationProp = NativeStackNavigationProp<GuestStackParamList>;

type TabType = 'Current' | 'Upcoming' | 'Completed';

const ItemSeparator = () => <View style={styles.separator} />;

export const AcademyProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const params = route.params as AcademyProfileRouteParams;
  const instituteId = params?.instituteId;
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<TabType>('Current');

  // 1. Fetch Institute Details
  const {
    data: academy,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    refetch: refetchDetails,
  } = usePublicInstituteProfile(instituteId);

  // 2. Fetch Paginated Batches
  const batchFilter = useMemo(() => {
    if (activeTab === 'Current') return 'ongoing';
    if (activeTab === 'Upcoming') return 'upcoming';
    return 'completed';
  }, [activeTab]);

  const {
    data: batchesData,
    isLoading: isBatchesLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch: refetchBatches,
  } = useInstituteBatchesData({
    id: instituteId,
    filter: batchFilter,
    limit: 10,
  });

  const allBatches = useMemo(() => {
    if (!batchesData) return [];
    
    // Preparation for transformation
    const instituteInfo = {
      id: academy?.id || instituteId || '',
      name: academy?.name || t('common.not_available'),
      logo: academy?.logo,
      location: academy?.location || { city: '', state: '' },
      phoneNumber: academy?.phone,
    };

    return batchesData.pages.flatMap(page =>
      page.batches.map(apiBatch =>
        transformApiBatchToUIBatch(apiBatch, instituteInfo, activeTab),
      ),
    );
  }, [batchesData, academy, activeTab, instituteId, t]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCall = useCallback(() => {
    if (academy?.phone) {
      Linking.openURL(`tel:${academy.phone}`);
    }
  }, [academy?.phone]);

  const handleEmail = useCallback(() => {
    if (academy?.email) {
      Linking.openURL(`mailto:${academy.email}`);
    }
  }, [academy?.email]);

  const handleRetry = useCallback(() => {
    refetchDetails();
    refetchBatches();
  }, [refetchDetails, refetchBatches]);

  const renderBatchItem: ListRenderItem<Batch> = useCallback(
    ({ item }) => <BatchCard batch={item} showFooter={false} />,
    [],
  );

  const keyExtractor = useCallback((item: Batch) => item.id, []);

  const renderHeader = () => {
    if (!academy) return null;

    return (
      <View>
        {/* Academy Profile Section */}
        <View style={academyProfileStyles.profileSection}>
          <View style={academyProfileStyles.profileCard}>
            <View style={academyProfileStyles.profileHeaderRow}>
              {/* Logo */}
              <View style={academyProfileStyles.logoContainer}>
                {academy.logo ? (
                  <View style={academyProfileStyles.logo}>
                    <Text style={academyProfileStyles.logoText}>
                      {academy.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                ) : (
                  <View style={academyProfileStyles.logoPlaceholder}>
                    <View style={academyProfileStyles.logoIconWrapper}>
                      <View style={academyProfileStyles.plusHorizontal} />
                      <View style={academyProfileStyles.plusVertical} />
                    </View>
                  </View>
                )}
              </View>

              {/* Academy Name */}
              <Text style={academyProfileStyles.academyName} numberOfLines={2}>
                {academy.name}
              </Text>
            </View>

            {/* Location Pill */}
            <View style={academyProfileStyles.locationPill}>
              <LocationIcon size={14} color="#64748B" />
              <Text style={academyProfileStyles.locationText}>
                {academy.location.fullAddress || `${academy.location.city}, ${academy.location.state}`}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={academyProfileStyles.actionButtonsContainer}>
              <View style={academyProfileStyles.callButtonWrapper}>
                <ThemeButton
                  title={t('batches.call_us')}
                  onPress={handleCall}
                  leftIcon={<PhoneIcon size={20} color="#2563EB" />}
                  fullWidth
                  disabled={!academy.phone}
                  style={academyProfileStyles.contactButton}
                  textStyle={academyProfileStyles.contactButtonText}
                />
              </View>
              <View style={academyProfileStyles.emailButtonWrapper}>
                <ThemeButton
                  title={t('batches.email_us')}
                  onPress={handleEmail}
                  fullWidth
                  disabled={!academy.email}
                  leftIcon={<EmailIcon size={20} color="#2563EB" />}
                  style={academyProfileStyles.contactButton}
                  textStyle={academyProfileStyles.contactButtonText}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Status Tabs */}
        <View style={academyProfileStyles.batchesSection}>
          <Text style={academyProfileStyles.sectionTitle}>
            {t('batches.recent_batches')}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={academyProfileStyles.tabsScrollContent}
            style={academyProfileStyles.tabsContainer}
          >
            {(['Current', 'Upcoming', 'Completed'] as TabType[]).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  academyProfileStyles.tabButton,
                  activeTab === tab && academyProfileStyles.tabButtonActive,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    academyProfileStyles.tabText,
                    activeTab === tab && academyProfileStyles.tabTextActive,
                  ]}
                >
                  {t(`batches.${tab.toLowerCase()}`)}
                </Text>
                {activeTab === tab && <CheckIcon size={14} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0F172A" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isBatchesLoading) {
      return (
        <View style={academyProfileStyles.loadingContainer}>
          <ActivityIndicator size="small" color="#FF6B35" />
        </View>
      );
    }
    return (
      <Text style={academyProfileStyles.noBatchesText}>
        {t('batches.no_status_batches_found', {
          status: t(`batches.${activeTab.toLowerCase()}`).toLowerCase(),
        })}
      </Text>
    );
  };

  if (isDetailsLoading && !batchesData) {
    return (
      <View style={academyProfileStyles.container}>
        <ScreenHeader
          title={t('batches.institute_details')}
          onBackPress={handleBack}
        />
        <View style={academyProfileStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      </View>
    );
  }

  const hasData = academy || (batchesData && batchesData.pages.some(p => p.batches.length > 0));

  if (isDetailsError && !hasData) {
    return (
      <View style={academyProfileStyles.container}>
        <ScreenHeader
          title={t('batches.institute_details')}
          onBackPress={handleBack}
        />
        <View style={academyProfileStyles.errorContainer}>
          <Text style={academyProfileStyles.errorText}>
            {t('batches.no_institute_data_found')}
          </Text>
          <ThemeButton
            title={t('common.retry')}
            onPress={handleRetry}
            style={styles.retryButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={academyProfileStyles.container}>
      <ScreenHeader
        title={academy?.name || t('batches.institute_details')}
        onBackPress={handleBack}
      />

      <FlatList
        data={allBatches}
        renderItem={renderBatchItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={academyProfileStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 16,
  },
});
