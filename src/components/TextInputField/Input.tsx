import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  disabled?: boolean;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

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
    const [isFocused, setIsFocused] = useState(false);
    const animatedFocus = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(animatedFocus, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false, // Border color animation requires non-native driver
      }).start();
    }, [isFocused, animatedFocus]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFocus = (e: any) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBlur = (e: any) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    // Interpolate border color based on focus state
    const borderColorAnimation = animatedFocus.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.border, colors.orange],
    });

    // Determine final border color: Error > Animation (Focus/Default)
    // We apply the animated border color via style, but override it with error style if needed.
    // Actually, cleanest way is to use conditional styles, but we want animation.
    // If error, we want static red. If no error, we want animated color.

    const animatedStyle = {
      borderColor: error ? colors.danger : borderColorAnimation,
      borderWidth: isFocused || error ? 1.5 : 1, // Slightly thicker on focus/error
      backgroundColor: disabled ? colors.backgroundLight : colors.white,
      color: disabled ? colors.textSecondary : colors.black,
    };

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <AnimatedTextInput
          style={[styles.input, animatedStyle, style]}
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
