import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { CitySelectionSheet } from '../components/CitySelection/CitySelection';
import { CoachingCard } from '../components/CoachingCard/CoachingCard';
import { CoachingCardSkeleton } from '../components/CoachingCard/CoachingSkeleton';
import { AppHeader } from '../components/Header/AppHeader';
import { useCity } from '../context/CityContext';
import { useAuthData } from '../hooks/queries/useAuthData';
import { useBatchFeedData } from '../hooks/queries/useBatchDetailsData';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';
import { batchesListingStyles } from '../theme/styles/batchesListingStyles';
import { Batch } from '../types/batch';
import { GuestStackParamList, RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<
  GuestStackParamList & RootStackParamList
>;

const ItemSeparator = () => <View style={batchesListingStyles.separator} />;

interface BatchesListingScreenProps {
  /** When embedded under MainTab, pass so the last cards clear the floating tab bar */
  listBottomPadding?: number;
}

export const BatchesListingScreen: React.FC<BatchesListingScreenProps> = ({
  listBottomPadding,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  // 1. Auth & City State
  const { authUser } = useAuthData();
  const { currentCity, setCity } = useCity();

  const [showCitySheet, setShowCitySheet] = useState(false);

  // 2. Fetch Data
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useBatchFeedData({ city: currentCity });

  // Refetch when screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Flattens pages into a single list

  const handleCityPress = useCallback(() => {
    setShowCitySheet(true);
  }, []);

  const handleSelectCity = useCallback(
    (city: string) => {
      setCity(city);
      // Ideally we also update the user's preference in backend if they are logged in?
      // For now, local state drive the feed.
      setShowCitySheet(false);
    },
    [setCity],
  );

  const handleViewDetails = useCallback(
    (instituteId: string) => {
      if (instituteId) {
        navigation.navigate('AcademyProfile', { instituteId });
      }
    },
    [navigation],
  );

  const renderBatchItem: ListRenderItem<Batch> = useCallback(
    ({ item }) => (
      <CoachingCard
        batch={item}
        onViewDetails={handleViewDetails}
        onSubscribe={() => refetch()}
      />
    ),
    [handleViewDetails],
  );

  const keyExtractor = useCallback((item: Batch) => item.id, []);

  // Footer Loader for Pagination
  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={batchesListingStyles.footerLoader}>
        <ActivityIndicator size="small" color="#0F172A" />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmptyComponent = useMemo(() => {
    if (isLoading) {
      return (
        <View style={batchesListingStyles.listContent}>
          {[1, 2, 3, 4].map(idx => (
            <React.Fragment key={idx}>
              <CoachingCardSkeleton />
              {idx < 4 && <ItemSeparator />}
            </React.Fragment>
          ))}
        </View>
      );
    }
    return (
      <View style={batchesListingStyles.emptyContainer}>
        <Text style={batchesListingStyles.emptyText}>
          {t('batches.no_batches_found')}
        </Text>
        <Text style={batchesListingStyles.emptySubtext}>
          {t('batches.try_changing_city')}
        </Text>
      </View>
    );
  }, [isLoading, t]);

  return (
    <View style={batchesListingStyles.container}>
      {/* Reusable App Header */}
      <AppHeader
        selectedCity={currentCity || t('common.select_city')}
        onCityPress={handleCityPress}
        onProfilePress={() => navigation.navigate('Profile')}
        logoSource={require('../assets/images/png/bank-r.webp')}
        showSearchBar={false}
      />

      {/* Screen Content */}
      <View style={batchesListingStyles.contentContainer}>
        {/* Header Text Removed as per request */}

        {/* Batch List */}
        <FlatList
          data={data?.pages || []}
          renderItem={renderBatchItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={[
            batchesListingStyles.listContent,
            { paddingBottom: listBottomPadding || RFont(100) },
            !data?.pages?.length && batchesListingStyles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          initialNumToRender={5}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>

      {/* City Selection Sheet */}
      <CitySelectionSheet
        visible={showCitySheet}
        onClose={() => setShowCitySheet(false)}
        onSelectCity={handleSelectCity}
        selectedCity={currentCity}
      />
    </View>
  );
};
