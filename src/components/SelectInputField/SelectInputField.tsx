import React, { useMemo, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';
import { boxStyle } from '../../theme/globalStyles';

export interface SelectInputProps {
  header?: string;
  placeholder?: string;
  options: Record<string, unknown>[];
  labelField?: string;
  valueField?: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  isRTL?: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  headerStyle?: TextStyle;
}

const Chevron = ({
  color,
  size,
  rotate,
}: {
  color: string;
  size: number;
  rotate?: string;
}) => (
  <View
    style={[
      styles.chevron,
      {
        width: size,
        height: size,
        borderColor: color,
        transform: [{ rotate: rotate || '45deg' }],
      },
    ]}
  />
);

const SelectInputField: React.FC<SelectInputProps> = ({
  labelField = 'label',
  header,
  valueField = 'value',
  placeholder = 'Select',
  options = [],
  headerStyle,
  value = undefined,
  onChange,
  disabled = false,
  error,
  style,
  containerStyle,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const borderStyle = useMemo(
    () => ({
      borderColor: error ? colors.danger : colors.border,
      borderWidth: error ? 1.5 : 1,
    }),
    [error],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {header && <Text style={[styles.label, headerStyle]}>{header}</Text>}
      <Dropdown
        mode="modal"
        disable={disabled}
        style={[styles.dropdown, style, boxStyle.shadow, borderStyle]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.dropdownListContainer} // Styles the list container
        itemContainerStyle={styles.itemContainerStyle} // Styles individual items container
        activeColor={colors.backgroundLight} // Highlight color
        data={options}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder="Search city..."
        search={true}
        keyboardAvoiding={true} // Fix for keyboard overlap
        dropdownPosition="auto" // Smart positioning
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item?.[valueField]);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Chevron
            color={isFocus ? colors.black : colors.gray}
            size={RFont(10)}
            rotate={isFocus ? '225deg' : '45deg'}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  dropdown: {
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  // Style for the dropdown list container
  dropdownListContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  placeholderStyle: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(15),
    color: '#999',
  },
  selectedTextStyle: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(15),
    color: colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 44,
    fontSize: RFont(14),
    borderRadius: 8,
    backgroundColor: colors.backgroundLight, // Light gray background for search
    borderColor: 'transparent', // Remove default border
    margin: 10,
    paddingHorizontal: 10, // Ensure text isn't flush
    fontFamily: fontFamily.MaisonRegular,
  },
  itemTextStyle: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(15),
    color: colors.black,
    marginVertical: -8, // Reduce default massive spacing if needed, or adjust
  },
  itemContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayLightest,
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.danger,
    marginTop: 4,
  },
  chevron: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    marginRight: 4,
    marginBottom: 2,
  },
});

export default SelectInputField;
