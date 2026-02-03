import { ImageStyle, Platform, StyleSheet, ViewStyle } from 'react-native';
import colors from './colors';
import { RFont } from './fonts';

export type FormInputStylesType = {
  container: ViewStyle;
  dropdown: ViewStyle;
  dropdownIcon: ImageStyle;
  icon: ViewStyle;
  input: ViewStyle;
  multiselect: ViewStyle;
  primaryInput: ViewStyle;
  customInput: ViewStyle;
};

const obj: FormInputStylesType = {
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: RFont(8),
    borderWidth: 1,
    paddingHorizontal: RFont(16),
    paddingVertical: Platform.OS === 'ios' ? RFont(10) : RFont(4),
  },
  dropdown: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors?.grey_100,
    borderRadius: RFont(70),
    borderWidth: RFont(1),
    paddingHorizontal: RFont(20),
    paddingVertical: RFont(14),
  },
  dropdownIcon: {
    height: RFont(24),
    width: RFont(24),
  },
  icon: {
    marginRight: RFont(8),
  },
  input: {
    alignItems: 'center',
    borderRadius: RFont(70),
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(14),
  },
  multiselect: {
    borderRadius: RFont(8),
    borderWidth: 1,
    minHeight: RFont(48),
    padding: RFont(12),
  },
  primaryInput: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors?.grey_100,
    borderRadius: RFont(70),
    borderWidth: 1,
    paddingHorizontal: RFont(20),
    paddingVertical: RFont(16),
  },
  customInput: {
    borderRadius: RFont(32),
    borderWidth: 1,
    borderColor: colors?.grey_100,
    padding: RFont(16),
    backgroundColor: colors?.white,
    display: 'flex',
    alignItems: 'center',
    gap: RFont(6),
  },
};

export const formInputStyles: FormInputStylesType = StyleSheet.create(obj);
