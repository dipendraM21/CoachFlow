import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '../../theme/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const SecondaryButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
    textStyle,
    leftIcon,
    rightIcon,
}) => {
    const buttonStyle = [
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ];

    const textStyleCombined = [
        styles.text,
        styles[`text_${variant}`],
        styles[`text_${size}`],
        disabled && styles.textDisabled,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? COLORS.textOnPrimary : COLORS.primary}
                />
            ) : (
                <>
                    {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                    <Text style={textStyleCombined}>{title}</Text>
                    {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.sm,
    },

    // Variants
    button_primary: {
        backgroundColor: COLORS.primary,
    },
    button_secondary: {
        backgroundColor: COLORS.secondary,
    },
    button_outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        shadowOpacity: 0,
        elevation: 0,
    },
    button_text: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },

    // Sizes
    button_small: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        minHeight: 36,
    },
    button_medium: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        minHeight: 48,
    },
    button_large: {
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xxl,
        minHeight: 56,
    },

    // States
    disabled: {
        opacity: 0.5,
    },
    fullWidth: {
        width: '100%',
    },

    // Text styles
    text: {
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        textAlign: 'center',
    },
    text_primary: {
        color: COLORS.textOnPrimary,
    },
    text_secondary: {
        color: COLORS.textOnPrimary,
    },
    text_outline: {
        color: COLORS.primary,
    },
    text_text: {
        color: COLORS.primary,
    },
    text_small: {
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
    text_medium: {
        fontSize: TYPOGRAPHY.fontSize.md,
    },
    text_large: {
        fontSize: TYPOGRAPHY.fontSize.lg,
    },
    textDisabled: {
        opacity: 1,
    },
    iconLeft: {
        marginRight: SPACING.sm,
    },
    iconRight: {
        marginLeft: SPACING.sm,
    },
});
