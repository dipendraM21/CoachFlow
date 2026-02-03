import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';

export type GenderOption = 'male' | 'female';

interface GenderSelectorProps {
  value?: GenderOption | null;
  onChange: (value: GenderOption) => void;
  error?: string;
}

export const GenderSelector = React.memo<GenderSelectorProps>(
  ({ value, onChange, error }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              value === 'male' && styles.optionSelected,
              error && styles.optionError,
            ]}
            onPress={() => onChange('male')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                value === 'male' && styles.optionTextSelected,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              value === 'female' && styles.optionSelected,
              error && styles.optionError,
            ]}
            onPress={() => onChange('female')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                value === 'female' && styles.optionTextSelected,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: RFont(20),
  },
  label: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    fontWeight: '500',
    color: colors.black,
    marginBottom: RFont(8),
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: RFont(12),
  },
  option: {
    flex: 1,
    height: RFont(52),
    borderRadius: RFont(12),
    borderWidth: 1,
    borderColor: colors.grey_100,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },

  optionError: {
    borderColor: colors.red_500,
  },
  optionText: {
    fontFamily: fontFamily.MaisonMedium,
    fontSize: RFont(14),
    color: colors.black,
  },
  optionTextSelected: {
    color: colors.white,
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.red_500,
    marginTop: RFont(4),
  },
});
