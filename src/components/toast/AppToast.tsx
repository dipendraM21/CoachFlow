import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
// @ts-ignore
import { BaseToastProps } from 'react-native-toast-message';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';
import { ToastProps, ToastType } from '../../types/toast/toast.types';

const getToastColors = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        background: '#E8F5E9',
        border: colors.success,
        icon: colors.success,
      };
    case 'error':
      return {
        background: '#FFEBEE',
        border: colors.danger,
        icon: colors.danger,
      };
    case 'warning':
      return {
        background: '#FFF3E0',
        border: colors.warning,
        icon: colors.warning,
      };
    case 'info':
      return {
        background: '#E3F2FD',
        border: colors.info,
        icon: colors.info,
      };
    default:
      return {
        background: colors.white,
        border: colors.gray,
        icon: colors.gray,
      };
  }
};

export const AppToast: React.FC<ToastProps & BaseToastProps> = React.memo(
  ({ type, text1, text2 }) => {
    const toastColors = useMemo(() => getToastColors(type), [type]);

    const containerStyle = useMemo<ViewStyle>(
      () => ({
        ...styles.container,
        backgroundColor: toastColors.background,
        borderLeftColor: toastColors.border,
      }),
      [toastColors],
    );

    return (
      <View style={containerStyle}>
        <View style={styles.contentContainer}>
          {text1 ? (
            <Text style={[styles.title, { color: toastColors.icon }]}>
              {text1}
            </Text>
          ) : null}
          {text2 ? <Text style={styles.message}>{text2}</Text> : null}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    minHeight: 60,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderLeftWidth: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(16),
    marginBottom: 4,
  },
  message: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    color: colors.gray,
  },
});
