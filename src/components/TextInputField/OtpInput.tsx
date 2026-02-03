import { OtpInputProps, OtpInputRef } from 'component-props';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import { gapStyles } from '../../theme/commonMarginPadding';
import { fontStyles, RFont } from '../../theme/fonts';
import { globalStyles } from '../../theme/globalStyles';

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(
  (
    {
      length = 4,
      onComplete,
      style,
      error,
      value = '',
      onChange,
      onSubmitEditing = () => {},
    },
    ref,
  ) => {
    // Derived state from props
    const otp = useMemo(() => {
      const arr = new Array(length).fill('');
      for (let i = 0; i < length; i++) {
        arr[i] = value[i] || '';
      }
      return arr;
    }, [value, length]);

    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }, []);

    const handleKeyPress = (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number,
    ) => {
      if (event.nativeEvent.key === 'Backspace') {
        const newOtp = [...otp];

        // If current box empty, move back and delete previous
        // If current box has value, delete it (handled by onChangeText usually, but backspace on empty needs handling)

        if (!otp[index] && index > 0) {
          newOtp[index - 1] = '';
          const newValue = newOtp.join('');
          onChange?.(newValue);
          inputRefs.current[index - 1]?.focus();
        } else {
          // Normal backspace on non-empty managed by onChangeText("") logic usually,
          // but generic text input backspace logic:
          // If we hit backspace on a filled input, it clears.
          // If we hit backspace on empty input, it moves back.
        }
      }
    };

    // Special case for backspace on filled input to rely on keyPress or onChangeText?
    // TextInput onChangeText('') is called on backspace if value exists.
    // If value is empty, only onKeyPress is fired.

    // Let's refine handleChange for empty string (deletion)
    const handleChangeText = (text: string, index: number) => {
      const newOtp = [...otp];
      if (text === '') {
        // Deletion
        newOtp[index] = '';
        const newValue = newOtp.join('');
        onChange?.(newValue);
        // Move back? Usually only if empty already?
        // Standard UX: If I delete a digit, I stay there or move back?
        // Most OTPs stay. Move back is only on "delete from empty".
        return;
      }

      // Insertion
      newOtp[index] = text.slice(-1);
      const newValue = newOtp.join('');
      onChange?.(newValue);
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      if (newValue.length === length) {
        onComplete?.(newValue);
      }
    };

    useImperativeHandle(ref, () => ({
      resetOtp: () => {
        // Parent resets value via state, we just focus first
        inputRefs.current[0]?.focus();
      },
    }));

    return (
      <View style={[globalStyles.row, gapStyles.gap_12, styles.container]}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRef => {
              if (inputRef) {
                inputRefs.current[index] = inputRef;
              }
            }}
            focusable
            style={[
              styles.input,
              {
                borderColor: error ? colors.red_500 : colors.grey_100,
              },
              style,
            ]}
            value={digit}
            onChangeText={text => handleChangeText(text, index)}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="done"
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    flex: 1,
    aspectRatio: 1,
    textAlign: 'center',
    borderRadius: RFont(16),
    borderWidth: 1,
    paddingVertical: RFont(16),
    paddingHorizontal: 0,
    fontFamily: fontStyles?.Maison_500_16PX_22LH?.fontFamily,
    fontSize: RFont(20),
    lineHeight: RFont(24),
    backgroundColor: colors.white,
    color: colors.grey_900,
    minHeight: RFont(64),
    maxHeight: RFont(64),
  },
});

export default OtpInput;
