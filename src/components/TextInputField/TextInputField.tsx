import type {
  FormInputProps,
  TextErrorProps,
  TextInputFieldContainerProps,
  TextInputHeaderProps,
  TextInputWrapperProps,
} from 'component-props';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import colors from '../../theme/colors';
import { gapStyles, paddingStyles } from '../../theme/commonMarginPadding';
import { fontStyles } from '../../theme/fonts';
import {
  borderRadiusStyles,
  borderWidthStyles,
  globalStyles,
} from '../../theme/globalStyles';
import { formInputStyles } from '../../theme/inputsStyles';

export const TextInputField: React.FC<FormInputProps> = ({
  error,
  wrapperStyle,
  inputWrapperStyle,
  inputStyles,
  placeholder = '',
  value = undefined,
  onChangeText = undefined,
  leftIcon,
  header,
  keyboardType = 'ascii-capable',
  disabled,
  autoFocus,
  headerStyle,
  containerStyle,
  numberOfLines = undefined,
  touched,
  inputRightComponent,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[gapStyles?.gap_8, containerStyle]}>
      {header && (
        <Text
          style={[
            globalStyles.textLeft,
            fontStyles.Maison_500_16PX_19_2LH,
            { color: colors.black },
            headerStyle,
          ]}
        >
          {header}
        </Text>
      )}
      <View
        style={[
          globalStyles.flex1,
          globalStyles.flexDirectionRow,
          globalStyles.alignItemsCenter,
          gapStyles.gap_12,
          inputWrapperStyle,
        ]}
      >
        <View
          style={[
            formInputStyles.input,
            globalStyles.alignItemsCenter,
            gapStyles.gap_12,
            globalStyles.row,
            {
              backgroundColor: colors.white,
              borderColor: error
                ? colors.red_500
                : isFocused
                ? colors.grey_900
                : colors.grey_100,
            },
            wrapperStyle,
          ]}
        >
          {leftIcon}
          <TextInput
            style={[
              globalStyles.writingDirectionLeft,
              globalStyles.textLeft,
              globalStyles.flex1,
              fontStyles.Maison_500_16PX_19_2LH,
              paddingStyles.py0,
              {
                color: disabled ? colors.grey_600 : colors.black_900,
              },
              inputStyles,
            ]}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={colors.grey_600}
            onChangeText={onChangeText}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={!disabled}
            autoFocus={autoFocus}
            multiline={(numberOfLines || 0) > 1}
            numberOfLines={numberOfLines}
            returnKeyType="done"
          />
        </View>
        {inputRightComponent}
      </View>
      {error && touched !== false && (
        <Text
          style={[fontStyles.Maison_500_14PX_18LH, { color: colors.red_500 }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

// transfer all the types to the @types folder
// continue this after the screen is over

export const TextInputFieldContainer = ({
  children,
  style,
}: TextInputFieldContainerProps) => {
  return <View style={[gapStyles.gap_8, style]}>{children}</View>;
};

export const TextInputHeader = ({ text, style }: TextInputHeaderProps) => {
  return (
    <Text
      style={[
        globalStyles.textLeft,
        fontStyles.Maison_500_16PX_19_2LH,
        { color: colors.black },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export const TextError = ({ text, style }: TextErrorProps) => {
  return (
    <Text
      style={[
        fontStyles.Maison_500_14PX_18LH,
        { color: colors.red_500 },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export const TextInputWrapper = ({
  style,
  children,
  error,
}: TextInputWrapperProps) => {
  return (
    <View
      style={[
        globalStyles.row,
        borderRadiusStyles.br70,
        borderWidthStyles.bw1,
        paddingStyles.py16,
        paddingStyles.px20,
        gapStyles.gap_12,
        {
          borderColor: error ? colors.red_500 : colors.grey_100,
        },

        style,
      ]}
    >
      {children}
    </View>
  );
};

// export const SearchBar: React.FC<FormInputProps> = ({
//   error,
//   wrapperStyle,
//   inputStyles,
//   placeholder = '',
//   value = undefined,
//   onChangeText = undefined,
//   keyboardType = 'ascii-capable',
//   disabled,
//   autoFocus,
//   containerStyle,
//   numberOfLines = undefined,
//   touched,
// }) => {
//   const { isRTL } = useSelector((state: RootState) => state.app);
//   const [isFocused, setIsFocused] = useState(false);
//   const colors = useTheme();
//   const inputRef = useRef<TextInput>(null);
//   return (
//     <Pressable
//       style={containerStyle}
//       onPressIn={() => {
//         inputRef.current?.focus();
//       }}
//     >
//       <View
//         style={[
//           gapStyles.gap_12,
//           isRTL ? globalStyles.rowReverse : globalStyles.row,
//           formInputStyles.input,
//           {
//             borderColor: error
//               ? colors.red_500
//               : isFocused
//               ? colors.grey_900
//               : colors.grey_100,
//           },
//           paddingStyles.py8,
//           wrapperStyle,
//         ]}
//       >
//         <SearchIcon />
//         <TextInput
//           ref={inputRef}
//           style={[
//             isRTL
//               ? globalStyles.writingDirectionRight
//               : globalStyles.writingDirectionLeft,
//             isRTL ? globalStyles.textRight : globalStyles.textLeft,
//             fontStyles.Maison_500_16PX_19_2LH,
//             {
//               color: disabled ? colors.grey_600 : colors.grey_700,
//               backgroundColor: colors.neutral_white,
//             },
//             inputStyles,
//           ]}
//           placeholder={placeholder}
//           keyboardType={keyboardType}
//           placeholderTextColor={colors.grey_600}
//           onChangeText={onChangeText}
//           value={value}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           editable={!disabled}
//           autoFocus={autoFocus}
//           multiline={(numberOfLines || 0) > 1}
//           numberOfLines={numberOfLines}
//         />
//       </View>
//       {error && touched && (
//         <Text
//           style={[
//             fontStyles.Maison_500_14PX_18LH,
//             marginStyles.mt_8,
//             { color: colors.red_500 },
//           ]}
//         >
//           {error}
//         </Text>
//       )}
//     </Pressable>
//   );
// };
