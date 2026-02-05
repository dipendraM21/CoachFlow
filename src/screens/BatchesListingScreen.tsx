import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import { BatchCard } from '../components/BatchCard/BatchCard';
import { CitySelectionSheet } from '../components/CitySelection/CitySelection';
import { AppHeader } from '../components/Header/AppHeader';
import { useAuthData } from '../hooks/queries/useAuthData';
import { useBatchFeedData } from '../hooks/queries/useBatchDetailsData';
import { batchesListingStyles } from '../theme/styles/batchesListingStyles';
import { Batch } from '../types/batch';
import { GuestStackParamList, RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<
  GuestStackParamList & RootStackParamList
>;

const ItemSeparator = () => <View style={batchesListingStyles.separator} />;

export const BatchesListingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // 1. Auth & City State
  const { authUser } = useAuthData();

  const [currentCity, setCurrentCity] = useState<string | undefined>(
    authUser?.profile?.address?.city,
  );

  const [showCitySheet, setShowCitySheet] = useState(false);

  // 2. Fetch Data
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useBatchFeedData({ city: currentCity });

  // Flattens pages into a single list

  const handleCityPress = useCallback(() => {
    setShowCitySheet(true);
  }, []);

  const handleSelectCity = useCallback((city: string) => {
    setCurrentCity(city);
    // Ideally we also update the user's preference in backend if they are logged in?
    // For now, local state drive the feed.
    setShowCitySheet(false);
  }, []);

  const handleViewDetails = useCallback(
    (batchId: string) => {
      // Find batch in full list
      if (batchId) {
        navigation.navigate('BatchDetails', { batchId });
      }
    },
    [navigation],
  );

  const renderBatchItem: ListRenderItem<Batch> = useCallback(
    ({ item }) => <BatchCard batch={item} onViewDetails={handleViewDetails} />,
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
        <View
          style={[
            batchesListingStyles.emptyContainer,
            batchesListingStyles.loadingPadding,
          ]}
        >
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      );
    }
    return (
      <View style={batchesListingStyles.emptyContainer}>
        <Text style={batchesListingStyles.emptyText}>No batches found</Text>
        <Text style={batchesListingStyles.emptySubtext}>
          Try changing the city or check back later.
        </Text>
      </View>
    );
  }, [isLoading]);

  return (
    <View style={batchesListingStyles.container}>
      {/* Reusable App Header */}
      <AppHeader
        selectedCity={currentCity || 'Select City'}
        onCityPress={handleCityPress}
        onProfilePress={() => navigation.navigate('Profile')}
        logoSource={require('../assets/images/png/bank.png')}
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
