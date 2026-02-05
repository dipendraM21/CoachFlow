import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';
import { boxStyle } from '../../theme/globalStyles';

export interface TabOption<T> {
  label: string;
  value: T;
}

interface SelectionTabProps<T> {
  options: TabOption<T>[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
  label?: string;
  containerStyle?: object;
}

/**
 * SelectionTab Component
 *
 * A reusable segmented control/tab selection component.
 * Renders a list of options side-by-side.
 */
export const SelectionTab = <T extends string | number>({
  options,
  selectedValue,
  onSelect,
  label,
  containerStyle,
  error,
}: SelectionTabProps<T> & { error?: string }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.tabsContainer}>
        {options.map(option => {
          const isSelected = option.value === selectedValue;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.tab,
                boxStyle.shadow,
                isSelected && styles.tabActive,
                error && !selectedValue ? styles.tabError : null,
              ]}
              onPress={() => onSelect(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.tabText, isSelected && styles.tabTextActive]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: fontFamily.MaisonRegular, // Changed from Medium
    fontWeight: '500', // Added 500 weight to match other labels
    fontSize: RFont(14),
    color: colors.black,
    marginBottom: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  tab: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8, // Changed to 8 to match Input
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  tabError: {
    borderColor: colors.danger,
    borderWidth: 1.5,
  },
  tabText: {
    fontFamily: fontFamily.MaisonMedium, // Using Medium for better visibility
    fontSize: RFont(16),
    color: colors.black,
  },
  tabTextActive: {
    color: colors.white,
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.danger,
    marginTop: 6,
    paddingLeft: 4,
  },
});
