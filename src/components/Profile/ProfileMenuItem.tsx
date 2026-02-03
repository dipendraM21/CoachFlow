import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';
import { ChevronRightIcon } from './ProfileIcons';

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  showChevron?: boolean;
  textColor?: string;
  isLast?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = React.memo(
  ({
    icon,
    label,
    onPress,
    showChevron = true,
    textColor = colors.black,
    isLast = false,
  }) => {
    return (
      <TouchableOpacity
        style={[styles.container, !isLast && styles.borderBottom]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        {showChevron && (
          <View style={styles.chevronContainer}>
            <ChevronRightIcon size={20} color={colors.textSecondary} />
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFont(16),
    paddingHorizontal: RFont(16),
    backgroundColor: colors.white,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey_100,
  },
  iconContainer: {
    width: RFont(40),
    height: RFont(40),
    borderRadius: RFont(20),
    backgroundColor: '#F1F5F9', // Slate-100 for icon background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFont(12),
  },
  label: {
    flex: 1,
    ...fontStyles.Maison_600_16PX_22LH,
  },
  chevronContainer: {
    marginLeft: RFont(8),
  },
});
