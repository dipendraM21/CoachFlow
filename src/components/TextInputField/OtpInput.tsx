import { OtpInputProps, OtpInputRef } from 'component-props';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
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
    { length = 4, onComplete, style, error, onSubmitEditing = () => {} },
    ref,
  ) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<TextInput[]>([]);

    // {adding the 100ms delay as some some mobile canceling out the keyboard focus on rendering}
    useEffect(() => {
      const timeout = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100); // delay helps Android reliably open the keyboard

      return () => clearTimeout(timeout);
    }, []);

    const handleChange = (text: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = text.slice(-1);
      setOtp(newOtp);

      const currentOtp = newOtp.join('');
      onComplete?.(currentOtp);
      // Move to next input if value entered
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete when all digits entered
      // onComplete?.(newOtp.join(''));
    };

    const handleKeyPress = (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number,
    ) => {
      // Move to previous input on backspace and clear value
      if (event.nativeEvent.key === 'Backspace') {
        const newOtp = [...otp];

        if (!otp[index] && index > 0) {
          // If current input is empty, move to previous and clear it
          newOtp[index - 1] = '';
          setOtp(newOtp);
          inputRefs.current[index - 1]?.focus();
          onComplete?.(newOtp.join(''));
        } else {
          // Clear current input
          newOtp[index] = '';
          setOtp(newOtp);
          if (index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
          onComplete?.(newOtp.join(''));
        }
      }
    };

    useImperativeHandle(ref, () => ({
      resetOtp: () => {
        const emptyOtp = Array(length).fill('');
        setOtp(emptyOtp);
        inputRefs.current[0]?.focus();
        onComplete?.('');
      },
    }));

    return (
      <View style={[globalStyles.row, gapStyles.gap_12, styles.container]}>
        {otp?.map((digit, index) => (
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
            onChangeText={text => {
              handleChange(text, index);
            }}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="done"
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="numeric"
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
