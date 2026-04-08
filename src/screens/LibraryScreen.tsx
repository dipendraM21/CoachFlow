import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { CitySelectionSheet } from '../components/CitySelection/CitySelection';
import { AppHeader } from '../components/Header/AppHeader';
import { LibraryCard } from '../components/LibraryCard/LibraryCard';
import { LibraryCardSkeleton } from '../components/LibraryCard/LibrarySkeleton';
import { useCity } from '../context/CityContext';
import { useAuthData } from '../hooks/queries/useAuthData';
import { useLibraryListData } from '../hooks/queries/useLibraryListData';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';
import { batchesListingStyles } from '../theme/styles/batchesListingStyles';
import { Batch } from '../types/batch';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ItemSeparator = () => <View style={batchesListingStyles.separator} />;

interface LibraryScreenProps {
  listBottomPadding?: number;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  listBottomPadding,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { authUser } = useAuthData();
  const { currentCity, setCity } = useCity();
  const [showCitySheet, setShowCitySheet] = useState(false);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useLibraryListData({
    city: currentCity,
    district: currentCity, // Using city as district as requested in example
  });

  // Refetch when screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleCityPress = useCallback(() => {
    setShowCitySheet(true);
  }, []);

  const handleSelectCity = useCallback(
    (city: string) => {
      setCity(city);
      setShowCitySheet(false);
    },
    [setCity],
  );

  const renderBatchItem: ListRenderItem<Batch> = useCallback(
    ({ item }) => <LibraryCard batch={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Batch) => item.id, []);

  const renderEmptyComponent = useMemo(() => {
    if (isLoading) {
      return (
        <View style={batchesListingStyles.listContent}>
          {[1, 2, 3, 4].map(idx => (
            <React.Fragment key={idx}>
              <LibraryCardSkeleton />
              {idx < 4 && <ItemSeparator />}
            </React.Fragment>
          ))}
        </View>
      );
    }
    return (
      <View style={batchesListingStyles.emptyContainer}>
        <Text style={batchesListingStyles.emptyText}>
          {t('library.no_materials_found')}
        </Text>
        <Text style={batchesListingStyles.emptySubtext}>
          {t('library.check_back_later')}
        </Text>
      </View>
    );
  }, [isLoading, t]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footerLoader}>
        <LibraryCardSkeleton />
      </View>
    );
  }, [isFetchingNextPage]);

  const libraries = data?.pages || [];

  return (
    <View style={styles.container}>
      <AppHeader
        selectedCity={currentCity || t('common.select_city')}
        onCityPress={handleCityPress}
        onProfilePress={() => navigation.navigate('Profile')}
        logoSource={require('../assets/images/png/bank-r.webp')}
        showSearchBar={false}
      />

      <FlatList
        data={libraries}
        renderItem={renderBatchItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: listBottomPadding || RFont(100) },
          !libraries.length && !isLoading && batchesListingStyles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparator}
      />

      <CitySelectionSheet
        visible={showCitySheet}
        onClose={() => setShowCitySheet(false)}
        onSelectCity={handleSelectCity}
        selectedCity={currentCity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    padding: RFont(16),
  },
  footerLoader: {
    paddingVertical: RFont(20),
  },
});
