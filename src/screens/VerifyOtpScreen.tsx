import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeButton } from '../components/Button/Button';
import OtpInput from '../components/TextInputField/OtpInput';
import type { GuestStackParamList } from '../navigation/GuestNavigator';
import { verifyOtpStyles } from '../theme/styles/verifyOtpStyles';
import { translations } from '../utils/translation';

type VerifyOtpScreenNavigationProp = NativeStackNavigationProp<
  GuestStackParamList,
  'VerifyOtp'
>;

type RouteParams = {
  phoneNumber: string;
};

const OTP_EXPIRY_TIME = 120; // 2 minutes in seconds

export const VerifyOtpScreen: React.FC = () => {
  const navigation = useNavigation<VerifyOtpScreenNavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(OTP_EXPIRY_TIME);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const otpInputRef = useRef<{ resetOtp: () => void } | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phoneNumber =
    (route.params as RouteParams)?.phoneNumber || '9876543211';

  const handleOtpComplete = useCallback((value: string) => {
    setOtp(value);
    setError(false);
  }, []);

  const handleVerify = useCallback(() => {
    if (otp.length !== 4) {
      setError(true);
      return;
    }
    // Handle OTP verification
    console.log('Verifying OTP:', otp);
    // TODO: Add actual OTP verification API call here
    // On success, navigate to SetupProfile
    navigation.navigate('SetupProfile');
  }, [otp, navigation]);

  const handleChangeNumber = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleResendCode = useCallback(() => {
    if (!isResendEnabled) {
      return;
    }
    // Reset timer
    setTimer(OTP_EXPIRY_TIME);
    setIsResendEnabled(false);
    // Reset OTP input
    otpInputRef.current?.resetOtp();
    setOtp('');
    setError(false);
    // Handle resend OTP API call
    console.log('Resending OTP to:', phoneNumber);
    // TODO: Call your resend OTP API here
  }, [isResendEnabled, phoneNumber]);

  // Timer countdown effect
  useEffect(() => {
    // Clear any existing interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Only start timer if it's greater than 0 and resend is not enabled
    if (timer > 0 && !isResendEnabled) {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            setIsResendEnabled(true);
            return 0;
          }
          return newTimer;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [timer, isResendEnabled]);

  const formattedPhoneNumber = useMemo(() => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    // Format for better display: show last few digits
    if (cleaned.length > 2) {
      return cleaned.slice(-2);
    }
    return cleaned;
  }, [phoneNumber]);

  const contentPadding = useMemo(
    () => ({
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }),
    [insets.top, insets.bottom],
  );

  return (
    <View style={verifyOtpStyles.container}>
      <KeyboardAvoidingView
        style={verifyOtpStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={[verifyOtpStyles.content, contentPadding]}>
          <ScrollView
            style={verifyOtpStyles.scrollView}
            contentContainerStyle={verifyOtpStyles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardDismissMode="on-drag"
          >
            {/* Title Section with Enhanced Styling */}
            <View style={verifyOtpStyles.titleSection}>
              <View style={verifyOtpStyles.titleContainer}>
                <Text style={verifyOtpStyles.title}>
                  {translations.VERIFY_PHONE}
                </Text>
                <View style={verifyOtpStyles.titleAccent} />
              </View>
              <Text style={verifyOtpStyles.subtitle}>
                {translations.CODE_SENT_TO}{' '}
                <Text style={verifyOtpStyles.phoneNumberHighlight}>
                  {formattedPhoneNumber}
                </Text>
              </Text>
            </View>

            {/* OTP Input Section */}
            <View style={verifyOtpStyles.otpSection}>
              <OtpInput
                ref={otpInputRef}
                length={4}
                onComplete={handleOtpComplete}
                error={error}
              />
            </View>

            {/* Timer and Resend Section */}
            <View style={verifyOtpStyles.timerSection}>
              {!isResendEnabled ? (
                <Text style={verifyOtpStyles.timerText}>
                  {translations.CODE_EXPIRES_IN}{' '}
                  <Text style={verifyOtpStyles.timerValue}>
                    {Math.floor(timer / 60)}:
                    {String(timer % 60).padStart(2, '0')}
                  </Text>
                </Text>
              ) : (
                <ThemeButton
                  title={translations.RESEND_CODE}
                  onPress={handleResendCode}
                  variant="text"
                  size="md"
                  textStyle={verifyOtpStyles.resendText}
                  style={verifyOtpStyles.resendButton}
                />
              )}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={verifyOtpStyles.buttonContainer}>
            <ThemeButton
              title={translations.VERIFY_AND_CONTINUE}
              onPress={handleVerify}
              disabled={otp.length !== 4}
              fullWidth
            />
            <View style={verifyOtpStyles.changeNumberContainer}>
              <ThemeButton
                title={translations.CHANGE_NUMBER}
                onPress={handleChangeNumber}
                variant="text"
                size="md"
                textStyle={verifyOtpStyles.changeNumberText}
                style={verifyOtpStyles.changeNumberButton}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
