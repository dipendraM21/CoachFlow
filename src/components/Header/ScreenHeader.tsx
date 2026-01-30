import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

interface ScreenHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  darkContent?: boolean;
}

const BackIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 19L8 12L15 5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ScreenHeader: React.FC<ScreenHeaderProps> = React.memo(({
  title,
  showBackButton = true,
  onBackPress,
  rightAction,
  style,
  backgroundColor = colors.backgroundLight, // Default background
  darkContent = true,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + RFont(12), // Safe area + breathing room (mt)
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      <StatusBar
        barStyle={darkContent ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Left Section (Back Button or Spacer) */}
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <BackIcon color={colors.black} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Center Section (Title) */}
      <View style={styles.titleContainer}>
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      {/* Right Section (Action or Spacer) */}
      <View style={styles.rightContainer}>
        {rightAction ? (
          rightAction
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFont(20),
    paddingBottom: RFont(16),
    zIndex: 100, // Ensure header is above content
  },
  leftContainer: {
    width: RFont(44), // Fixed width to ensure title centering
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: RFont(44), // Fixed width to ensure title centering
    alignItems: 'flex-end',
  },
  title: {
    ...fontStyles.Maison_600_18PX_24LH,
    color: colors.black,
    fontSize: RFont(18),
    textAlign: 'center',
  },
  backButton: {
    width: RFont(44),
    height: RFont(44),
    borderRadius: RFont(22),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for the circular button
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  placeholder: {
    width: RFont(44),
  },
});
