import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';

// ============================================================================
// Types & Interfaces
// ============================================================================

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'text'
  | 'ghost'
  | 'danger'
  | 'success';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Button text content */
  title?: string;
  /** Alternative to title - for backward compatibility */
  text?: string;
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner */
  isLoading?: boolean;
  /** Disable button interaction */
  disabled?: boolean;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Custom icon container style */
  iconStyle?: ViewStyle;
  /** Custom button container style */
  style?: ViewStyle | ViewStyle[];
  /** Custom text style */
  textStyle?: TextStyle | TextStyle[];
  /** Bordered button variant (alternative to outlined) */
  isBorderedBtn?: boolean;
  /** Custom loader color */
  loaderColor?: string;
  /** Custom focus/press color */
  focusColor?: string;
  /** Custom background color (overrides variant) */
  backgroundColor?: string;
  /** Custom text color (overrides variant) */
  textColor?: string;
  /** Custom border color (overrides variant) */
  borderColor?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** RTL support - pass true if RTL is enabled */
  isRTL?: boolean;
  /** Custom active opacity */
  activeOpacity?: number;
  /** Minimum width */
  minWidth?: number;
  /** Maximum width */
  maxWidth?: number;
}

// ============================================================================
// Theme Colors Interface
// ============================================================================

interface ThemeColors {
  primary: string;
  primary_grenade: string;
  neutral_white: string;
  neutral_black: string;
  neutral_gray: string;
  danger: string;
  success: string;
  border: string;
  disabled?: string;
}

// Map theme colors to component interface
const defaultColors: ThemeColors = {
  primary: colors.black,
  primary_grenade: colors.orange,
  neutral_white: colors.white,
  neutral_black: colors.black,
  neutral_gray: colors.gray,
  danger: colors.danger,
  success: colors.success,
  border: colors.border,
  disabled: colors.grayLight,
};

// ============================================================================
// Size Configurations
// ============================================================================

interface SizeConfig {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  lineHeight: number;
  iconSize: number;
  borderRadius: number;
  minHeight: number;
}

const sizeConfigs: Record<ButtonSize, SizeConfig> = {
  sm: {
    paddingVertical: RFont(10),
    paddingHorizontal: RFont(20),
    fontSize: RFont(14),
    lineHeight: RFont(18),
    iconSize: RFont(16),
    borderRadius: RFont(8),
    minHeight: RFont(36),
  },
  md: {
    paddingVertical: RFont(16),
    paddingHorizontal: RFont(32),
    fontSize: RFont(16),
    lineHeight: RFont(20),
    iconSize: RFont(20),
    borderRadius: RFont(12),
    minHeight: RFont(48),
  },
  lg: {
    paddingVertical: RFont(20),
    paddingHorizontal: RFont(40),
    fontSize: RFont(18),
    lineHeight: RFont(24),
    iconSize: RFont(24),
    borderRadius: RFont(16),
    minHeight: RFont(56),
  },
  xl: {
    paddingVertical: RFont(24),
    paddingHorizontal: RFont(48),
    fontSize: RFont(20),
    lineHeight: RFont(28),
    iconSize: RFont(28),
    borderRadius: RFont(20),
    minHeight: RFont(64),
  },
};

// ============================================================================
// Styles
// ============================================================================

const localStyles = StyleSheet.create({
  rightIconContainer: {
    marginRight: 0,
    marginLeft: 0,
  },
});

// ============================================================================
// ThemeButton Component
// ============================================================================

export const ThemeButton: React.FC<ButtonProps> = React.memo(
  ({
    title,
    text,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    iconStyle,
    style,
    textStyle,
    isBorderedBtn = false,
    loaderColor,
    focusColor,
    backgroundColor,
    textColor,
    borderColor,
    fullWidth = false,
    isRTL = false,
    activeOpacity = 0.7,
    minWidth,
    maxWidth,
    onPress,
    ...touchableProps
  }) => {
    const [isFocus, setFocus] = useState(false);
    const spinAnim = useRef(new Animated.Value(0)).current;

    // Get display text (support both title and text props for backward compatibility)
    const displayText = title || text || '';

    // Get size configuration
    const sizeConfig = sizeConfigs[size];

    // Animation for loading spinner
    useEffect(() => {
      if (isLoading) {
        Animated.loop(
          Animated.timing(spinAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ).start();
      } else {
        spinAnim.stopAnimation();
        spinAnim.setValue(0);
      }
    }, [isLoading, spinAnim]);

    const spin = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    // Get variant colors
    const getVariantColors = useCallback(
      (themeColors: ThemeColors) => {
        const isOutlined = isBorderedBtn || variant === 'outlined';
        const isText = variant === 'text' || variant === 'ghost';
        const isPrimary = !variant || variant === 'primary';

        // Background color
        let bgColor = backgroundColor;
        if (!bgColor) {
          if (disabled && !isOutlined && !isText) {
            // Use gray for disabled buttons
            bgColor = themeColors.disabled || '#999999';
          } else if (isFocus && isOutlined) {
            // Black overlay for outlined buttons on press
            bgColor = 'rgba(0, 0, 0, 0.1)';
          } else if (isFocus && !isOutlined && !isText) {
            // Darker black for primary buttons on press, or use focusColor if provided
            if (isPrimary) {
              bgColor = focusColor || 'rgba(0, 0, 0, 0.8)';
            } else {
              bgColor = focusColor || 'rgba(0, 0, 0, 0.1)';
            }
          } else if (isOutlined || isText) {
            bgColor = 'transparent';
          } else if (variant === 'danger') {
            bgColor = themeColors.danger;
          } else if (variant === 'success') {
            bgColor = themeColors.success;
          } else if (variant === 'secondary') {
            bgColor = themeColors.neutral_white;
          } else {
            bgColor = themeColors.primary;
          }
        }

        // Border color
        let brdColor = borderColor;
        if (!brdColor) {
          if (isFocus && isOutlined) {
            // Darker black border for outlined buttons on press
            brdColor = themeColors.primary;
          } else if (isOutlined) {
            brdColor = themeColors.primary;
          } else if ((isOutlined || isBorderedBtn) && disabled) {
            // Use gray for disabled buttons
            brdColor = themeColors.disabled || '#999999';
          } else if (disabled && !isOutlined) {
            // Use gray for disabled buttons
            brdColor = themeColors.disabled || '#999999';
          } else if (variant === 'danger' && isOutlined) {
            brdColor = themeColors.danger;
          } else if (variant === 'success' && isOutlined) {
            brdColor = themeColors.success;
          } else if (variant === 'secondary' && !isOutlined) {
            brdColor = themeColors.border;
          } else {
            brdColor = 'transparent';
          }
        }

        // Text color
        let txtColor = textColor;
        if (!txtColor) {
          if (isOutlined || isText) {
            txtColor = themeColors.primary_grenade || themeColors.primary;
          } else if (variant === 'secondary') {
            txtColor = themeColors.neutral_black;
          } else {
            txtColor = themeColors.neutral_white;
          }
        }

        // Loader color
        const loadColor =
          loaderColor ||
          (isOutlined
            ? themeColors.primary_grenade || themeColors.primary
            : themeColors.neutral_white);

        return { bgColor, brdColor, txtColor, loadColor };
      },
      [
        isBorderedBtn,
        variant,
        disabled,
        isFocus,
        focusColor,
        backgroundColor,
        borderColor,
        textColor,
        loaderColor,
      ],
    );

    const variantColors = getVariantColors(defaultColors);

    // Memoized button styles
    const buttonStyles = useMemo<ViewStyle[]>(() => {
      const baseStyle: ViewStyle = {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: sizeConfig.paddingVertical,
        paddingHorizontal: sizeConfig.paddingHorizontal,
        minHeight: sizeConfig.minHeight,
        borderRadius: sizeConfig.borderRadius,
        backgroundColor: variantColors.bgColor,
        borderColor: variantColors.brdColor,
        borderWidth:
          isBorderedBtn || variant === 'outlined' || variant === 'secondary'
            ? isBorderedBtn && disabled
              ? 1
              : 2
            : 0,
        opacity: disabled && !isLoading ? 0.6 : 1,
      };

      if (fullWidth) {
        baseStyle.width = '100%';
      }
      if (minWidth !== undefined) {
        baseStyle.minWidth = minWidth;
      }
      if (maxWidth !== undefined) {
        baseStyle.maxWidth = maxWidth;
      }

      return [baseStyle, Array.isArray(style) ? [...style] : style].filter(
        Boolean,
      ) as ViewStyle[];
    }, [
      isRTL,
      sizeConfig,
      variantColors,
      isBorderedBtn,
      variant,
      disabled,
      isLoading,
      fullWidth,
      minWidth,
      maxWidth,
      style,
    ]);

    // Memoized text styles
    const textStyles = useMemo<TextStyle[]>(() => {
      const baseTextStyle: TextStyle = {
        fontFamily: fontFamily.MaisonMedium,
        fontSize: sizeConfig.fontSize,
        lineHeight: sizeConfig.lineHeight,
        color: variantColors.txtColor,
        textAlign: 'center',
      };

      return [
        baseTextStyle,
        Array.isArray(textStyle) ? [...textStyle] : textStyle,
      ].filter(Boolean) as TextStyle[];
    }, [sizeConfig, variantColors, textStyle]);

    // Memoized icon container style
    const iconContainerStyle = useMemo<ViewStyle[]>(() => {
      const baseIconStyle: ViewStyle = {
        marginRight: displayText && !isRTL ? RFont(8) : 0,
        marginLeft: displayText && isRTL ? RFont(8) : 0,
      };

      return [baseIconStyle, iconStyle].filter(Boolean) as ViewStyle[];
    }, [displayText, isRTL, iconStyle]);

    // Handle press events
    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (onPress && !disabled && !isLoading) {
          onPress(event);
        }
      },
      [onPress, disabled, isLoading],
    );

    const handlePressIn = useCallback(() => {
      setFocus(true);
    }, []);

    const handlePressOut = useCallback(() => {
      setFocus(false);
    }, []);

    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        disabled={disabled || isLoading}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={buttonStyles}
        {...touchableProps}
      >
        {isLoading ? (
          <Animated.View
            style={[iconContainerStyle, { transform: [{ rotate: spin }] }]}
          >
            <ActivityIndicator size="small" color={variantColors.loadColor} />
          </Animated.View>
        ) : (
          leftIcon && <View style={iconContainerStyle}>{leftIcon}</View>
        )}

        {displayText ? <Text style={textStyles}>{displayText}</Text> : null}

        {!isLoading && rightIcon && (
          <View style={[iconContainerStyle, localStyles.rightIconContainer]}>
            {rightIcon}
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

ThemeButton.displayName = 'ThemeButton';

// ============================================================================
// Export default styles for external use if needed
// ============================================================================

export const buttonStyles = StyleSheet.create({
  // Can be used for additional shared styles if needed
});

export default ThemeButton;
