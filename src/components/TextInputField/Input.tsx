import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';
import { boxStyle } from '../../theme/globalStyles';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = React.memo(
  ({
    label,
    error,
    style,
    disabled,
    onFocus,
    onBlur,
    value,
    ...textInputProps
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFocus = (e: any) => {
      if (onFocus) onFocus(e);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBlur = (e: any) => {
      if (onBlur) onBlur(e);
    };

    const inputStyles = {
      borderColor: error ? colors.danger : colors.border,
      borderWidth: error ? 1.5 : 1.3,
      backgroundColor: disabled ? colors.grey_100 : colors.white,
      color: disabled ? colors.grey_600 : colors.black,
    };

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          style={[
            styles.input,
            boxStyle.shadow, // Applying default shadow always
            inputStyles,
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...textInputProps}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  },
);

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
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(15),
    borderWidth: 20,
    // Base styles
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.danger,
    marginTop: 6,
    paddingLeft: 4,
  },
});
