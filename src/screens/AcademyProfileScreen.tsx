import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BatchCard } from '../components/BatchCard/BatchCard';
import { ThemeButton } from '../components/Button/Button';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { Batch } from '../types/batch';
import { GuestStackParamList } from '../types/navigation';
import { academyProfileStyles } from './AcademyProfileScreen/AcademyProfileScreen.styles';
import {
  EmailIcon,
  LocationIcon,
  PhoneIcon,
} from './AcademyProfileScreen/icons';

import { useInstituteDetails } from '../hooks/queries/useBatchDetailsData';

type AcademyProfileRouteParams = {
  instituteId: string;
};

type NavigationProp = NativeStackNavigationProp<GuestStackParamList>;

const ItemSeparator = () => <View style={styles.separator} />;

export const AcademyProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const params = route.params as AcademyProfileRouteParams;
  const instituteId = params?.instituteId;

  const {
    data: academy,
    isLoading,
    isError,
    refetch,
  } = useInstituteDetails(instituteId);

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

  const handleViewDetails = useCallback(
    (batchId: string) => {
      const batch = academy?.batches?.find(b => b.id === batchId);
      if (batch) {
        navigation.navigate('BatchDetails', { batchId: batch.id });
      }
    },
    [academy?.batches, navigation],
  );

  const renderBatchItem: ListRenderItem<Batch> = useCallback(
    ({ item }) => <BatchCard batch={item} onViewDetails={handleViewDetails} />,
    [handleViewDetails],
  );

  const keyExtractor = useCallback((item: Batch) => item.id, []);

  if (isLoading) {
    return (
      <View style={academyProfileStyles.container}>
        <ScreenHeader title="Institute Details" onBackPress={handleBack} />
        <View style={academyProfileStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={academyProfileStyles.container}>
        <ScreenHeader title="Institute Details" onBackPress={handleBack} />
        <View style={academyProfileStyles.errorContainer}>
          <Text style={academyProfileStyles.errorText}>
            Failed to load institute details. Please try again.
          </Text>
          <ThemeButton
            title="Retry"
            onPress={() => refetch()}
            style={styles.retryButton}
          />
        </View>
      </View>
    );
  }

  if (!academy) {
    return (
      <View style={academyProfileStyles.container}>
        <ScreenHeader title="Institute Details" onBackPress={handleBack} />
        <View style={academyProfileStyles.errorContainer}>
          <Text style={academyProfileStyles.errorText}>Academy not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={academyProfileStyles.container}>
      {/* Header */}
      <ScreenHeader
        title={academy?.name || 'Institute Details'}
        onBackPress={handleBack}
      />

      <ScrollView
        style={academyProfileStyles.scrollView}
        contentContainerStyle={academyProfileStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Academy Profile Section */}
        <View style={academyProfileStyles.profileSection}>
          <View style={academyProfileStyles.profileCard}>
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
            <Text style={academyProfileStyles.academyName}>{academy.name}</Text>

            {/* Location Pill */}
            <View style={academyProfileStyles.locationPill}>
              <LocationIcon size={14} color="#64748B" />
              <Text style={academyProfileStyles.locationText}>
                {academy.location.city}, {academy.location.state}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={academyProfileStyles.actionButtonsContainer}>
              <View style={academyProfileStyles.callButtonWrapper}>
                <ThemeButton
                  title="Call Us"
                  onPress={handleCall}
                  leftIcon={<PhoneIcon size={20} color="#1D4ED8" />}
                  fullWidth
                  disabled={!academy.phone}
                  style={academyProfileStyles.contactButton}
                  textStyle={academyProfileStyles.contactButtonText}
                />
              </View>
              <View style={academyProfileStyles.emailButtonWrapper}>
                <ThemeButton
                  title="Email Us"
                  onPress={handleEmail}
                  fullWidth
                  disabled={!academy.email}
                  leftIcon={<EmailIcon size={20} color="#1D4ED8" />}
                  style={academyProfileStyles.contactButton}
                  textStyle={academyProfileStyles.contactButtonText}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Recent Batches Section */}
        {academy.batches && academy.batches.length > 0 ? (
          <View style={academyProfileStyles.batchesSection}>
            <Text style={academyProfileStyles.sectionTitle}>
              RECENT BATCHES
            </Text>
            <FlatList
              data={academy.batches}
              renderItem={renderBatchItem}
              keyExtractor={keyExtractor}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={ItemSeparator}
            />
          </View>
        ) : (
          <View style={academyProfileStyles.batchesSection}>
            <Text style={academyProfileStyles.noBatchesText}>
              No active batches found.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  retryButton: {
    marginTop: 16,
  },
  separator: {
    height: 12,
  },
});
