import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';

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
    fontFamily: fontFamily.MaisonMedium,
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
    borderColor: colors.borderColor, // Ensure this key exists in your colors object
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderColor: colors.black,
    backgroundColor: '#FFF',
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
    // Add specific active text styles if needed (e.g., color change)
    // Currently keeping black as per previous design
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.danger,
    marginTop: 6,
    paddingLeft: 4,
  },
});
