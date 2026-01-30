import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BatchCard } from '../components/BatchCard/BatchCard';
import { ThemeButton } from '../components/Button/Button';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { GuestStackParamList } from '../navigation/GuestNavigator';
import { Academy } from '../types/academy';
import { Batch } from '../types/batch';
import { academyProfileStyles } from './AcademyProfileScreen/AcademyProfileScreen.styles';
import {
    EmailIcon,
    LocationIcon,
    PhoneIcon
} from './AcademyProfileScreen/icons';

type AcademyProfileRouteParams = {
  academy: Academy;
};

type NavigationProp = NativeStackNavigationProp<GuestStackParamList>;

export const AcademyProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const academy = useMemo(() => {
    const params = route.params as AcademyProfileRouteParams;
    return params?.academy;
  }, [route.params]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCall = useCallback(() => {
    if (academy?.phone) {
      // TODO: Implement call functionality
      console.log('Call:', academy.phone);
    }
  }, [academy?.phone]);

  const handleEmail = useCallback(() => {
    if (academy?.email) {
      // TODO: Implement email functionality
      console.log('Email:', academy.email);
    }
  }, [academy?.email]);

  const handleViewDetails = useCallback(
    (batchId: string) => {
      const batch = academy?.batches?.find(b => b.id === batchId);
      if (batch) {
        navigation.navigate('BatchDetails', { batch });
      }
    },
    [academy?.batches, navigation],
  );

  const renderBatchItem: ListRenderItem<Batch> = useCallback(
    ({ item }) => <BatchCard batch={item} onViewDetails={handleViewDetails} />,
    [handleViewDetails],
  );

  const keyExtractor = useCallback((item: Batch) => item.id, []);

  if (!academy) {
    return (
      <View style={academyProfileStyles.container}>
        <Text style={academyProfileStyles.errorText}>Academy not found</Text>
      </View>
    );
  }

  return (
    <View style={academyProfileStyles.container}>
      {/* Header */}
      <ScreenHeader
        title={academy.name}
        onBackPress={handleBack}
      />

      {/* Scrollable Content */}
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
                  <Text style={academyProfileStyles.logoText}>Logo</Text>
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
        {academy.batches && academy.batches.length > 0 && (
          <View style={academyProfileStyles.batchesSection}>
            <Text style={academyProfileStyles.sectionTitle}>RECENT BATCHES</Text>
            <FlatList
              data={academy.batches}
              renderItem={renderBatchItem}
              keyExtractor={keyExtractor}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
