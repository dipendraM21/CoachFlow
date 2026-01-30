import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    ListRenderItem,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BatchCard } from '../components/BatchCard/BatchCard';
import { GuestStackParamList } from '../navigation/GuestNavigator';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';
import { Batch } from '../types/batch';
import { batchesListingStyles } from './BatchesListingScreen/BatchesListingScreen.styles';
import { ProfileAvatar, SearchIcon } from './BatchesListingScreen/icons';

type NavigationProp = NativeStackNavigationProp<GuestStackParamList>;

// Mock data - Replace with actual API call
const MOCK_BATCHES: Batch[] = [
  {
    id: '1',
    institute: {
      id: 'apex-1',
      name: 'Apex Academy',
      location: { city: 'Kota', state: 'Rajasthan' },
    },
    name: 'JEE Advanced 2025',
    subtitle: 'Super 30 - Morning',
    startDate: '2024-09-15',
    timing: { start: '08:00', end: '13:00' },
    duration: '18 Months',
    seatsLeft: 4,
    totalSeats: 30,
    fees: '₹1,50,000 / year',
    medium: 'English',
    instituteIcon: 'graduation',
    instituteIconColor: { bg: '#E0F2FE', color: '#0284C7' }, // Light Blue
  },
  {
    id: '2',
    institute: {
      id: 'apex-1',
      name: 'Apex Academy',
      location: { city: 'Kota', state: 'Rajasthan' },
    },
    name: 'NEET Dropper Batch',
    subtitle: 'Intensive Program',
    startDate: '2024-09-20',
    timing: { start: '14:00', end: '19:00' },
    duration: '12 Months',
    seatsLeft: 12,
    totalSeats: 25,
    fees: '₹1,20,000 / year',
    medium: 'Hindi/English',
    instituteIcon: 'flask',
    instituteIconColor: { bg: '#EDE9FE', color: '#7C3AED' }, // Light Purple
  },
  {
    id: '3',
    institute: {
      id: 'apex-1',
      name: 'Apex Academy',
      location: { city: 'Kota', state: 'Rajasthan' },
    },
    name: 'JEE Main 2025',
    subtitle: 'Foundation Focus',
    startDate: '2024-10-05',
    timing: { start: '10:00', end: '15:00' },
    duration: '24 Months',
    seatsLeft: 0,
    totalSeats: 20,
    fees: '₹1,00,000 / year',
    promoStatus: 'Filling Fast',
    promoStatusColor: 'warning',
    medium: 'English',
    instituteIcon: 'compass',
    instituteIconColor: { bg: '#FFEDD5', color: '#EA580C' }, // Light Orange
  },
];

export const BatchesListingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [batches] = useState<Batch[]>(MOCK_BATCHES);

  // Memoized filtered batches (limited to max 3)
  const filteredBatches = useMemo(() => {
    let result = batches;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = batches.filter(
        batch =>
          batch.name.toLowerCase().includes(query) ||
          batch.subtitle?.toLowerCase().includes(query) ||
          batch.institute.name.toLowerCase().includes(query) ||
          batch.institute.location.city.toLowerCase().includes(query) ||
          batch.institute.location.state.toLowerCase().includes(query),
      );
    }

    // Limit to maximum 3 batches
    return result.slice(0, 3);
  }, [batches, searchQuery]);

  // Memoized handlers
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleViewDetails = useCallback(
    (batchId: string) => {
      const batch = batches.find(b => b.id === batchId);
      if (batch) {
        navigation.navigate('BatchDetails', { batch });
      }
    },
    [batches, navigation],
  );

  const handleProfilePress = useCallback(() => {
    // TODO: Navigate to profile screen
    console.log('Profile pressed');
  }, []);

  // Memoized render item
  const renderBatchItem: ListRenderItem<Batch> = useCallback(
    ({ item }) => <BatchCard batch={item} onViewDetails={handleViewDetails} />,
    [handleViewDetails],
  );

  // Memoized key extractor
  const keyExtractor = useCallback((item: Batch) => item.id, []);

  // Memoized list empty component
  const renderEmptyComponent = useMemo(
    () => (
      <View style={batchesListingStyles.emptyContainer}>
        <Text style={batchesListingStyles.emptyText}>No batches found</Text>
        {searchQuery.trim() && (
          <Text style={batchesListingStyles.emptySubtext}>
            Try adjusting your search query
          </Text>
        )}
      </View>
    ),
    [searchQuery],
  );

  // Calculate header height with safe area - increased for new title block
  const headerHeight = useMemo(() => insets.top + RFont(140), [insets.top]);

  return (
    <View style={batchesListingStyles.container}>
      {/* App Bar / Header */}
      <View
        style={[
          batchesListingStyles.appBar,
          {
            paddingTop: insets.top + RFont(20),
            height: 'auto',
          },
        ]}
      >
        <Text style={batchesListingStyles.screenTitle}>Available Batches</Text>
        <Text style={batchesListingStyles.screenSubtitle}>
          Find the best coaching near you
        </Text>

        {/* Search Row */}
        <View style={batchesListingStyles.searchRow}>
          {/* Search Input */}
          <View style={batchesListingStyles.searchContainer}>
            <View style={batchesListingStyles.searchInputWrapper}>
              <SearchIcon size={20} color={colors.grey_600} />
              <TextInput
                style={batchesListingStyles.searchInput}
                placeholder="Select City"
                placeholderTextColor={colors.grey_600}
                value={searchQuery}
                onChangeText={handleSearchChange}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Profile Avatar */}
          <TouchableOpacity
            onPress={handleProfilePress}
            style={batchesListingStyles.profileButton}
            activeOpacity={0.7}
          >
            <ProfileAvatar size={44} text="UN" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Batch List */}
      <FlatList
        data={filteredBatches}
        renderItem={renderBatchItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          batchesListingStyles.listContent,
          filteredBatches.length === 0 && batchesListingStyles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        windowSize={5}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};
