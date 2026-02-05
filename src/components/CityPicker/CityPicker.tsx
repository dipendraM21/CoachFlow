import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';
import { boxStyle } from '../../theme/globalStyles';
import { CitySelectionSheet } from '../CitySelection/CitySelection';

interface CityPickerProps {
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const CityPicker: React.FC<CityPickerProps> = ({
  value,
  onChange,
  placeholder = 'Select City',
  error,
}) => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const handleSelectCity = (city: string) => {
    onChange(city);
    // Sheet closes itself or we control it via prop, but the sheet implementation below handles close on select?
    // Checking CitySelection impl: "handleSelect calls onSelectCity then onClose".
    // So we just need to pass the handler.
    // Wait, onClose prop in Sheet calls setVisible(false).
    setIsSheetVisible(false); // Redundant if onSelect triggers onClose, but safe.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>City</Text>
      <TouchableOpacity
        style={[styles.input, boxStyle.shadow, error && styles.inputError]}
        onPress={() => setIsSheetVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <CitySelectionSheet
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
        onSelectCity={handleSelectCity}
        selectedCity={value || undefined}
      />
    </View>
  );
};

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
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1.3,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputError: {
    borderColor: colors.danger,
    borderWidth: 1.5,
  },
  inputText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(15), // Adjusted to 15 to match Input.tsx (was 16)
    color: colors.black,
    flex: 1,
  },
  placeholderText: {
    color: colors.grayLight, // Input.tsx uses textSecondary (#94A4B8). grayLight is #999999.
  },
  arrow: {
    fontSize: RFont(12),
    color: colors.gray,
    marginLeft: RFont(8),
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.danger,
    marginTop: 6,
    paddingLeft: 4,
  },
});
