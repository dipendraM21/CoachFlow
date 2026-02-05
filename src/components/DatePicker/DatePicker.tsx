import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarIcon } from '../../assets/Icons';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';
import { boxStyle } from '../../theme/globalStyles';
import { DatePickerModal } from './DatePickerModal';

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value: Date | string | null;
  onChange: (date: Date) => void;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

/**
 * DatePicker Component
 *
 * A text input-style component that opens a wheel/spinner date picker modal.
 * Optimized for Date of Birth selection with past dates enabled by default.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  placeholder = 'Select date',
  value,
  onChange,
  error,
  minimumDate,
  maximumDate = new Date(), // Default: today (no future dates for DOB)
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Parse value to Date object
  const dateValue = value
    ? typeof value === 'string'
      ? new Date(value)
      : value
    : null;

  // Format date for display (DD/MM/YYYY)
  const formatDate = useCallback((date: Date | string | null) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);

  // Handle date confirmation from modal
  const handleConfirm = useCallback(
    (selectedDate: Date) => {
      onChange(selectedDate);
      setModalVisible(false);
    },
    [onChange],
  );

  // Handle modal cancel
  const handleCancel = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.input,
          boxStyle.shadow,
          error ? styles.inputError : null,
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <CalendarIcon width={20} height={20} color={colors.grey_400} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <DatePickerModal
        visible={modalVisible}
        initialDate={dateValue}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    fontWeight: '500',
    color: colors.black,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1.3,
    borderColor: colors.border,
    borderRadius: 12, // Changed to 8 to match Input.tsx (was 12)
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: colors.danger,
    borderWidth: 1.5,
  },
  text: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(15),
    color: colors.black,
  },
  placeholder: {
    color: '#999',
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.danger,
    marginTop: 6,
    paddingLeft: 4,
  },
});
