import React, { memo } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appHeaderStyles } from './AppHeader.styles';
import {
  ChevronDownIcon,
  GraduationCapIcon,
  MagnifyingGlassIcon,
  ProfileUserIcon,
} from './HeaderIcons';

export interface AppHeaderProps {
  selectedCity: string;
  onCityPress: () => void;
  onProfilePress: () => void;
  logoSource?: ImageSourcePropType;
  showSearchBar?: boolean;
}

export const AppHeader = memo<AppHeaderProps>(
  ({
    selectedCity = 'Select City',
    onCityPress,
    onProfilePress,
    logoSource,
    showSearchBar = false,
  }) => {
    const insets = useSafeAreaInsets();

    return (
      <View style={[appHeaderStyles.container, { paddingTop: insets.top }]}>
        <View style={appHeaderStyles.contentContainer}>
          <View style={appHeaderStyles.topRow}>
            <View style={appHeaderStyles.leftContainer}>
              <View style={appHeaderStyles.logoContainer}>
                {logoSource ? (
                  <Image
                    source={logoSource}
                    style={appHeaderStyles.logoImage}
                    resizeMode="contain"
                  />
                ) : (
                  <GraduationCapIcon size={18} color="#FFFFFF" />
                )}
              </View>
              <Text style={appHeaderStyles.logoText}>StudyBuddy</Text>
            </View>

            <View style={appHeaderStyles.rightContainer}>
              <Pressable
                onPress={onCityPress}
                style={({ pressed }) => [
                  appHeaderStyles.citySelector,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text style={appHeaderStyles.cityText} numberOfLines={1}>
                  {selectedCity}
                </Text>
                <ChevronDownIcon size={10} color="#64748B" />
              </Pressable>

              <Pressable
                onPress={onProfilePress}
                style={({ pressed }) => [
                  appHeaderStyles.profileButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <ProfileUserIcon size={20} color="#64748B" />
              </Pressable>
            </View>
          </View>

          {showSearchBar && (
            <View style={appHeaderStyles.searchContainer}>
              <View style={appHeaderStyles.searchInputWrapper}>
                <MagnifyingGlassIcon size={16} color="#94A3B8" />
                <TextInput
                  style={appHeaderStyles.searchInput}
                  placeholder="Search exam, coaching, or batch"
                  placeholderTextColor="#94A3B8"
                  returnKeyType="search"
                />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  },
);

AppHeader.displayName = 'AppHeader';
