declare module 'component-props' {
  import { selected_meal_props } from 'delivery-slice';
  import { Dispatch, ReactNode, SetStateAction } from 'react';
  import {
    ColorValue,
    GestureResponderEvent,
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    StyleProp,
    TextStyle,
    ViewStyle,
  } from 'react-native';
  import { lightTheme } from '../src/theme/colors';

  export type BottomSheetAnimationType = 'fade' | 'slide' | 'none';
  export interface GorhomBottomSheetProps {
    sheetOpen: boolean;
    sheetClose?: () => void;
    children: PropTypes.ReactNodeLike | PropTypes.ReactElementLike;
    footer?: ReactNode | ReactNode[];
    closeOnBackdrop?: boolean;
    modalBackgroundColor?: ColorValue;
    closeOnPressBack?: boolean;
    title: string;
    desc?: string;
    titleStyle?: StyleProp<TextStyle>;
    descStyle?: StyleProp<TextStyle>;
    customRightIcon?: ReactNode;
    hideCloseIcon?: boolean;
    animationType?: BottomSheetAnimationType;
    staticElement?: ReactNode;
    customView?: boolean;
    showBackArrow?: boolean;
    onPressBackArrow?: () => void;
    customViewContainerStyle?: ViewStyle;
    keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
  }
  export interface PrimaryBtnProps {
    textStyle?: StyleProp<TextStyle>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconStyle?: StyleProp<ViewStyle>;
    text?: string;
    textColor?: string;
    onPress?: ((event: GestureResponderEvent) => void) | null;
    style?: StyleProp<ViewStyle> | undefined;
    isSelected?: boolean;
    disabledColor?: string;
    disabledColor?: string;
    focusColor?: string;
    disabled?: boolean | null | undefined;
    isLoading?: boolean;
    backgroundColor?: string;
    loaderColor?: string;
    isBorderedBtn?: boolean;
    size?: 'sm' | 'md' | 'lg';
    fitContent?: boolean; // Makes button width fit its content instead of full width
  }

  export interface CloseWhiteBgBtnProps {
    onPress: () => void;
  }

  export interface DividerProps {
    color?: string;
    thickness?: number;
    style?: StyleProp<ViewStyle>;
  }

  export interface SelectableChipProps {
    textStyle?: StyleProp<TextStyle>;
    text: string;
    onPress?: ((event: GestureResponderEvent) => void) | null;
    style?: StyleProp<ViewStyle> | undefined;
    isSelected?: boolean;
    disabled?: boolean | null | undefined;
    isLoading?: boolean;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
  }
  export interface warning_chip_props {
    textStyle?: StyleProp<TextStyle>;
    text: string;
    style?: StyleProp<ViewStyle> | undefined;
  }
  export interface warning_chip_props {
    textStyle?: StyleProp<TextStyle>;
    text: string;
    style?: StyleProp<ViewStyle> | undefined;
  }

  export interface InfoCardProps {
    cardStyle?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
    message: string;
  }
  export interface SelectBottomSheetprops {
    labelField?: string;
    style?: StyleProp<ViewStyle>;
    placeholder?: string;
    containerStyle?: ViewStyle;
    option?: Array<{
      label?: string;
      value?: string;
    }>;
    error?: string | undefined;
    touched?: boolean;
    value: string | undefined;
    onChange?: (e: string) => void;
    header?: string;
    headerStyle?: StyleProp<TextStyle>;
    disable?: boolean | undefined;
    error?: string | undefined;
    bottomSheetTitle?: string;
  }

  export interface AddressSelectBottomSheetProps {
    option?: Array<{
      label?: string;
      value?: string;
    }>;
    value?: string | undefined;
    sheetOpen: boolean;
    title?: string;
    sheetClose?: () => void;
    onChange?: (e: string) => void;
  }

  export interface RecommendedMealsBottomSheetProps {
    sheetOpen: boolean;
    title?: string;
    sheetClose?: () => void;
    onChange?: (e: string) => void;
    cartFormik: FormikProps<cartFormProps>;
    cartOnchange: (
      field: keyof KeyValueProps | Partial<KeyValueProps>,
      value?: KeyValueProps[keyof KeyValueProps],
    ) => void;
    addAllNonVegIng: () => {
      avoid_category: string[];
      avoid_ingredients: string[];
    };
    removeAllNonVegIng: () => {
      avoid_category: string[];
      avoid_ingredients: string[];
    };
  }

  export interface DeliveriesBottomSheetProps {
    option?: Array<{
      label?: string;
      value?: string;
    }>;
    sheetOpen: boolean;
    title?: string;
    sheetClose?: () => void;
    onChange?: (e: string) => void;
    ActionsDate?: string;
    activeView: string;
    bottomSheetTitle?: string;
    btnText?: string;
  }

  interface ChangeDeliveryDetailsProps {
    ActionsDate?: string;
    activeView: string;
    sheetOpen: boolean;
    sheetClose?: () => void;
    isHome?: boolean;
  }

  export interface LogBottomSheetProps {
    activeView?: string | undefined;
    sheetOpen: boolean;
    sheetClose?: () => void;
    onChange?: (e: string) => void;
  }

  export interface BottomFloatingCardProps {
    btnText?: string;
    onPress?: (() => void) | null;
    isLoading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    leftIcon?: React.ReactNode;
    btnSize?: 'sm' | 'md' | 'lg';
    btnStyle?: StyleProp<ViewStyle>;
    btnTextStyle?: StyleProp<TextStyle>;
  }

  export interface ModalLoaderProps {
    message?: string;
    subView?: React.ReactNode;
    backgroundColor?: string;
  }

  export interface HeaderProps {
    headerTitle?: string;
    showDivider?: boolean;
    SideElement?: ReactNode;
    goBack?: () => void;
  }

  export interface CustomDividerProps {
    color?: keyof typeof lightTheme;
    height?: number;
    margin?: number;
    padding?: number;
    text?: string;
    textStyle?: StyleProp<TextStyle>[];
    style?: StyleProp<ViewStyle>[];
  }

  export interface OtpInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
    style?: StyleProp<TextStyle>[];
    error?: boolean;
    onSubmitEditing?: () => void;
    value?: string; // Controlled value
    onChange?: (value: string) => void; // Controlled change handler
  }

  export interface FormInputProps {
    error?: string | undefined;
    touched?: boolean;
    wrapperStyle?: StyleProp<ViewStyle>;
    inputWrapperStyle?: StyleProp<ViewStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    inputStyles?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    placeholder?: string;
    value?: string | undefined;
    onChangeText?: ((text: string) => void) | undefined;
    leftIcon?: React.ReactNode;
    header?: string;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
    disabled?: boolean;
    autoFocus?: boolean;
    numberOfLines?: number;
    inputRightComponent?: React.ReactNode;
  }
  export interface DropDownprops {
    labelField?: string;
    style?: StyleProp<ViewStyle>;
    valueField?: string;
    placeholder?: string;
    containerStyle?: ViewStyle;
    option?: Array<{
      [key: string]: string;
    }>;
    value: string | null | undefined;
    onChange: (e: string) => void;
    header?: string;
    headerStyle?: StyleProp<TextStyle>;
    disable?: boolean | undefined;
    error?: string | undefined;
    touched?: boolean;
  }
  export interface MultiSelectProps {
    labelField?: string;
    style?: StyleProp<ViewStyle>;
    valueField?: string;
    placeholder?: string;
    containerStyle?: ViewStyle;
    option?: Array<{
      [key: string]: string;
    }>;
    value: string[] | null | undefined;
    onChange: (e: string[]) => void;
    header?: string;
    headerStyle?: StyleProp<TextStyle>;
    disable?: boolean | undefined;
    error?: string | undefined;
    touched?: boolean;
    renderLeftIcon?: () => React.ReactElement | null;
  }
  export interface DropDownprops {
    labelField?: string;
    style?: StyleProp<ViewStyle>;
    valueField?: string;
    placeholder?: string;
    containerStyle?: ViewStyle;
    option?: Array<{
      [key: string]: string;
    }>;
    value: string | null | undefined;
    onChange: (e: string) => void;
    header?: string;
    headerStyle?: StyleProp<TextStyle>;
    disable?: boolean | undefined;
    error?: string | undefined;
    touched?: boolean;
    renderLeftIcon?: () => React.ReactElement | null;
  }
  export interface CalendarModalProps {
    value?: string | undefined;
    onChangeText?: ((text: string) => void) | undefined;
    maximumDate?: Date | undefined | string;
    minimumDate?: Date | string;
    isWeekday?: () => number[];
    onclose: () => void;
    open: boolean;
    title?: string;
    titleStyle?: TextStyle;
  }
  export interface CalanderBottomSheetProps {
    disableDates?: (text: string) => void;
    allowedDates?: string[];
    value?: string | undefined;
    onChangeText?: ((text: string) => void) | undefined;
    maximumDate?: Date | undefined | string;
    minimumDate?: Date | string;
    isWeekday?: () => number[];
    onclose: () => void;
    open: boolean;
    title?: string;
    btnText?: string;
  }
  export interface MultiStepModalProps {
    onclose: () => void;
    open: boolean;
    loading?: boolean;
    setLoading?: (v: boolean) => void;
    incart?: boolean;
  }

  export interface DateInputProps {
    error?: FieldError | undefined;
    placeholder?: string;
    title?: string;
    value?: string | undefined;
    onChangeText?: ((text: string) => void) | undefined;
    leftIcon?: React.ReactNode;
    maximumDate?: Date | undefined | string;
    minimumDate?: Date | string;
    isWeekday?: () => number[];
    disabled?: boolean;
    disableDates?: (text: string) => void;
    showCalanderBottomSheet?: boolean;
    allowedDates?: string[];
    btnText?: string;
  }

  export interface StepperDateInputProps {
    title?: string;
    value?: string | undefined;
    onChangeText?: ((text: string) => void) | undefined;
    maximumDate?: Date | undefined;
    minimumDate?: Date;
    bodyMetricsFormik?: FormikProps<bodyMetricsProps>;
    disableDates?: (text: string) => void;
  }

  export interface DateTabsProps {
    onPress?: (v: string) => void;
  }

  export interface WeekSelectorHeaderProps {
    onChangeWeek?: (v: string) => void;
    isExpired?: boolean;
  }

  export interface TextInputFieldContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
  }

  type TextInputHeaderProps = {
    text: string;
    style?: StyleProp<TextStyle>; // Change from ViewStyle to TextStyle
  };

  export interface TextInputWrapperProps {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    error?: boolean;
  }

  export interface CounterTextInputProps {
    value?: string;
    onDecrement?: () => void;
    onIncrement?: () => void;
    onChangeText?: (text: string) => void;
  }

  export interface CustomTextInputProps {
    style?: StyleProp<TextStyle>;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    disabled?: boolean;
    autoFocus?: boolean;
    error?: string;
    touched?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  }

  export interface TextErrorProps {
    text: string;
    style?: StyleProp<TextStyle>;
  }

  export interface SpinnerCardProps {
    status: string;
    callback: () => void;
    errorMsg?: string | null;
  }

  interface OptionCardProps {
    onPress?: (() => void) | null;
    isSelected?: boolean;
    title?: string;
    badge?: string;
    style?: StyleProp<TextStyle>;
    element?: React.ReactNode;
  }

  interface ChoiceButtonContainerProps {
    data: string[] | DataArray[];
    type?: 'hideborder' | 'bottomborder' | 'grayborder';
    labelKey?: keyof DataArray;
    defaultSelected?: string[] | DataArray[];
    onSelectionChange: (item: string[] | DataArray[]) => void;
    choiseButtonStyle?: StyleProp<TextStyle>;
    selectOnlyOne?: boolean;
    style?: StyleProp<ViewStyle>;
    disableDeselect?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
    element?: (item: string | DataArray) => React.ReactNode;
    scrollEnabled?: boolean;
  }

  interface DataArray {
    _id: string;
    [key: string]: string;
  }

  interface CityProps {
    _id: string;
    city_name: string;
    [key: string]: string;
  }

  interface InstructionItem {
    _id: string;
    name: string;
    name_tl: {
      ar: string;
      en: string;
    };
  }
  interface Timingitem {
    _id: string;
    timing: string;
  }
  interface AddressFormValues {
    label: string;
    customLabel: string;
    city: CityProps | null;
    area: string | null;
    address: string | null;
    deliveryTime: Timingitem | null;
    bag_info?: string;
    instruction?: InstructionItem[];
    addressId?: string;
  }

  interface ChipProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
    style?: StyleProp<TextStyle>;
    textStyle?: StyleProp<TextStyle>;
    showCross?: boolean;
    showCrossBtnToAll?: boolean;
    disableAll?: boolean;
    crossColor?: string;
    crossIconSize?: number;
  }

  interface ChipsData {
    _id: string;
    [key: string]: string;
  }

  interface ChipsContainerProps {
    initialChips: string[] | ChipsData[];
    onSelectionChange?: (selected: string[] | ChipsData[]) => void;
    style?: StyleProp<TextStyle>;
    chipStyle?: StyleProp<TextStyle>;
    showCross?: boolean;
    selectOnlyOne?: boolean;
    defaultSelected?: string[] | ChipsData[];
    disableDeselect?: boolean;
    labelKey?: keyof ChipsData | 'string';
    showCrossBtnToAll?: boolean;
    disableAll?: boolean;
    defaultFirstSelectOff?: boolean;
    showChipsCount?: number;
    crossColor?: string;
    chipTextStyle?: StyleProp<TextStyle>;
    crossIconSize?: number;
    setShowChipCount?: () => void;
    conditionalSelection?: (
      setSelectedChips: React.Dispatch<
        React.SetStateAction<string[] | ChipsData[]>
      >,
      newSelection: string[] | ChipsData[],
    ) => void;
  }

  interface UpdatedChipsContainerProps {
    initialChips: string[] | ChipsData[];
  }

  interface otpWithTimerProps {
    timer?: number;
    onOtpChange: (value: string) => void;
    error?: boolean;
    errMsg?: string;
    stopTimer?: boolean; // Add this prop
    onResend?: () => void; // Add this prop for resend functionality
    onSubmitEditing?: () => void;
  }
  interface nativeCallback {
    status?: 'ready' | 'submitted' | 'Not Available' | 'callBackError';
    paymentID?: string;
    method?: string;
    message?: string;
  }
  export interface NativeApplePayButtonProps {
    style?: ViewStyle; // or use StyleProp<ViewStyle> from 'react-native' if you want to be more precise
    paymentSessionIDProp: string;
    paymentSessionSecretProp: string;
    onSuccess?: (event: NativeSyntheticEvent<nativeCallback>) => void;
    onError?: (event: NativeSyntheticEvent<nativeCallback>) => void;
    onReady?: () => void;
    onSubmit?: () => void;
  }
  export interface StartPaymentProps {
    paymentSessionID: string;
    paymentSessionSecret: string;
  }
  export interface StartPaymentPagePros extends StartPaymentProps {
    order_id?: string;
    payButtonLabel: string;
    onClose?: () => void;
  }
  export interface FlowComponentProps extends StartPaymentProps {
    onFlowComponentReady?: (
      event: NativeSyntheticEvent<nativeCallback>,
    ) => void;
    onFlowComponentSubmit?: (
      event: NativeSyntheticEvent<nativeCallback>,
    ) => void;
    onFlowComponentSuccess?: (
      event: NativeSyntheticEvent<nativeCallback>,
    ) => void;
    onFlowComponentError?: (
      event: NativeSyntheticEvent<nativeCallback>,
    ) => void;
    style?: ViewStyle;
    payButtonLabel?: string;
  }

  export interface NativeFlowComponentProps {
    paymentSessionIDProp: string;
    paymentSessionSecretProp: string;
    payButtonLabel?: string;
    style?: unknown;
    onReady?: (event: NativeSyntheticEvent<nativeCallback>) => void;
    onSubmit?: (event: NativeSyntheticEvent<nativeCallback>) => void;
    onSuccess?: (event: NativeSyntheticEvent<nativeCallback>) => void;
    onError?: (event: NativeSyntheticEvent<nativeCallback>) => void;
  }
  export interface CustomSwitchProps {
    isEnabled: boolean;
    setIsEnabled: (e: boolean) => void;
  }

  export interface OptionItem {
    label: string;
    value?: string;
  }
  export interface CategoriesProps {
    data?: Array<{
      label?: string;
      value?: string;
    }>;
    selectedFilter?: string;
    style?: StyleProp<ViewStyle> | undefined;
    onPress?: (v: string) => void;
  }
  export interface PaymentHistoryCardProps {
    paymentStatus?: string;
    paymentType?: string;
    amount?: string | number;
    date?: string;
    cardLastFourDigit?: string;
    cardType?: card_type;
    isCredit?: boolean;
  }

  export interface SameAsWhatsappInterface {
    onPress: () => void;
    isChecked: boolean;
  }
  export interface SelectedMealProps {
    type: string;
    customer_id: string;
    delivery_id: string;
    recipe_id: string;
    variant: string;
    size: string;
    unique_id: string;
    protein_category: string;
  }
  interface MealCarouselModalProps {
    selectedMeal?: SelectedMealProps;
    setSelectedMeal: Dispatch<SetStateAction<SelectedMealProps>>;
    setDefaultSelectedMeal: Dispatch<
      SetStateAction<selected_meal_props | undefined>
    >;
    visible: boolean;
    preSelectedMealId?: string;
    meals: liveRecipes[];
    initialIndex: number;
    onClose: () => void;
    meal_category:
      | 'breakfast'
      | 'morning_snack'
      | 'evening_snack'
      | 'dinner'
      | 'lunch';
    unique_id: string | undefined;
    recipe_id: string | undefined;
    delivery_id: string | undefined;
    // selectedMealItem?: selected_meal_props;
    selectedMealItem?: selected_meal_props;
  }
  export interface MealCarouselSlideWrapperProps {
    isExpanded?: boolean;
    index?: number;
    setExpandedIndex?: React.Dispatch<
      React.SetStateAction<number | null | undefined>
    >;
    isPreSelected?: boolean;
    onClose?: () => void;
    children: PropTypes.ReactNodeLike | PropTypes.ReactElementLike;
    footer?: ReactNode | ReactNode[];
    title: string;
  }

  export interface DeliveryCardSkeletonLoaderProps {
    macros?: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  }
  interface NoActivePlanCardProps {
    variant?: 'center' | 'start';
    loader: boolean;
  }
  interface TabsData {
    id: string;
    label: string;
    isActive: boolean;
  }
  interface TabsProps {
    tabs: TabsData[];

    onTabChange: (data: TabsData[]) => void;
  }
  interface MealTypeLabelProps {
    label: 'balance' | 'low';
    isVeg: boolean;
  }
  interface YourPLans {
    future_plan_list: FuturePlanList[];
    past_plan_list: PastPlanList[];
    loader: boolean;
  }

  interface BottomSheetWithSearchBarProps {
    data: string[] | DataArray[];
    sheetOpen: boolean;
    sheetClose: () => void;
    onSubmit: (string: string[] | DataArray[]) => void;
    selectOnlyOne: boolean;
    isLoading?: boolean;
    showSearchBar?: boolean;
    selectMultiple?: boolean;
    title: string;
    searchKey: string;
    defaultSelected?: string[] | DataArray[];
    contentContainerStyle?: StyleProp<ViewStyle>;
    tempElement?: React.ReactElement;
    buttonText?: string;
    type?: 'hideborder' | 'bottomborder' | 'grayborder'; // instead of type: string
    element?: (item: string | DataArray) => React.ReactNode;
    choiseButtonStyle?: StyleProp<ViewStyle>;
  }

  export interface EmailPhoneInputProps {
    label?: string;
    onChange: (text: string) => void;
    error?: string;
    handleBlur?: () => void;
    keyboardType?: KeyboardTypeOptions;
    value?: string | null;
  }

  export interface WhatsAppNumberInputField {
    whatsAppNo: string;
    onChangewhatsAppNo: (str: string) => void;
    whatsAppCountryCodeValue: string;
    onChangeWhatsAppCountryCodeValue: (str: string) => void;
    errorMsg: string;
    onFocus: () => void;
  }

  export interface CountryCodeModalProps {
    modal: boolean;
    onModalClose: () => void;
    onSelect: (code: string) => void;
    selectedCountryCode?: string;
  }

  export interface CountryData {
    code: string;
    name: string;
    callingCode: string;
    flag: string;
    fullString: string;
  }
  interface ResubscribeLabelProps {
    customer_id: string;
    subscription_id: string;
    callBack: ActionMeta<cartDetailsProps>['callBack'];
  }
  export interface OtpInputRef {
    resetOtp: () => void;
  }

  interface CardFetchingModalProps {
    open: boolean;
    loaderText?: string;
    id: string;
    B;
    close: () => void;
  }

  interface CardStatusType {
    card_loading: string;
    card_fetched: string;
    card_error: string;
  }
  interface PollingUserFromTokenPayload {
    maxTries?: number; // Maximum number of tries
  }

  type CaseType =
    | 'toUpperCase'
    | 'toLowerCase'
    | 'capitalize'
    | 'camelCase'
    | 'kebabCase'
    | 'snakeCase'
    | 'titleCase';

  interface TransformCaseOptions {
    value: string;
    caseType: CaseType;
  }
  interface WebViewComponentProps {
    open: boolean;
    url: string | null;
    onClose: () => void;
    showStatusBarHeight?: boolean;
  }
  export interface TargetTextProps {
    target: number;
    label?: string;
  }
  export interface LogWeightProps {
    activeView?: string;
    onPressEdit?: () => void;
    setScreenValues?: (value: string) => void;
    handleReturnToDashboard?: () => void;
  }
  export interface WeightProgressProps {
    onPressEdit?: () => void;
    handleReturnToDashboard?: () => void;
  }

  interface SelectActivityBottomSheetProps {
    open: boolean;
    sheetClose: () => void;
    searchKey: string;
    setActivity: (data: {
      _id: string;
      name: string;
      category: string;
    }) => void;
    activityValue: null | { _id: string; name: string };
  }

  export interface ReviewMealSelectProps {
    text: string;
    icon?: React.ReactNode;
    onClick: () => void;
    style?: StyleProp<ViewStyle>;
  }

  export interface ReviewMealInputFieldProps {
    value: string;
    onChange: (str: string) => void;
    placeholder: string;
    style?: StyleProp<ViewStyle>;
    keyboard?:
      | 'default'
      | 'email-address'
      | 'numeric'
      | 'phone-pad'
      | 'number-pad';
  }

  interface CloseBtnProps {
    onPress: () => void;
    varient?: 'white' | 'grey';
  }

  interface LogAteDescribeCardProps {
    textChange: (str: string) => void;
    text: string;
    style?: StyleProp<ViewStyle>;
    title: string;
    placeholder: string;
  }

  export interface WeekSelectorProps {
    weeks: number[] | string[];
    selectedWeek: number | string;
    onSelect: (week: number | string) => void;
    label?: string;
  }

  interface DelicoinsAiYourDelicoinsProps {
    worth: number;
    delicoins: number;
    loading: boolean;
  }

  interface CircleImageProps {
    imageUrl: string;
    height?: number;
    width?: number;
  }
}
