import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { ThemeButton } from '../components/Button/Button';
// Actually, OtpInput takes error prop.
import OtpInput from '../components/TextInputField/OtpInput';
import { useAuth } from '../context/AuthContext';
import { useVerifyOtpMutation } from '../hooks/mutations/useVerifyOtpMutation';
import { verifyOtpStyles } from '../theme/styles/verifyOtpStyles';
import { GuestStackParamList } from '../types/navigation';
import { showError, showSuccess } from '../utils/toast';

type VerifyOtpScreenNavigationProp = NativeStackNavigationProp<
  GuestStackParamList,
  'VerifyOtp'
>;

type RouteParams = {
  phoneNumber: string;
};

const OTP_EXPIRY_TIME = 300; // 5 minutes in seconds

export const VerifyOtpScreen: React.FC = () => {
  const navigation = useNavigation<VerifyOtpScreenNavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  // Auth & API
  const { setAuth } = useAuth();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtpMutation();

  // Params
  const rawPhoneNumber =
    (route.params as RouteParams)?.phoneNumber || '9876543210';

  // Form Setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
    clearErrors,
  } = useForm<{ otp: string }>({
    defaultValues: { otp: '' },
    mode: 'onChange',
  });

  // Timer Setup
  const [timer, setTimer] = useState(OTP_EXPIRY_TIME);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const otpInputRef = useRef<{ resetOtp: () => void } | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isResendEnabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsResendEnabled(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResendEnabled, timer]); // Simplified dependency

  // Handlers
  const onSubmit = (data: { otp: string }) => {
    verifyOtp(
      {
        phone: rawPhoneNumber,
        otp: data.otp,
      },
      {
        onSuccess: async response => {
          const { token, isNewUser } = response.data;
          await setAuth(token, isNewUser);
          // Auto-navigation by AppNavigator
          setTimeout(() => {
            showSuccess('Phone number verified successfully');
          }, 500);
        },
        onError: (err: unknown) => {
          const error = err as {
            response?: { data?: { message?: string }; status?: number };
            message?: string;
          };
          const backendMessage = error.response?.data?.message;
          const status = error.response?.status;

          // Strict Logic: 400 Bad Request usually means Invalid OTP
          if (backendMessage && status === 400) {
            setError('otp', { type: 'server', message: backendMessage });
          } else {
            const msg =
              backendMessage || error.message || 'Verification failed';
            showError(msg);
          }
        },
      },
    );
  };

  const handleResendCode = () => {
    // 1. Reset UI
    reset({ otp: '' });
    clearErrors();
    setTimer(OTP_EXPIRY_TIME);
    setIsResendEnabled(false);
    otpInputRef.current?.resetOtp();

    showSuccess('OTP sent successfully');
  };

  const handleChangeNumber = () => {
    navigation.navigate('Login', { phoneNumber: rawPhoneNumber });
  };

  // derived values
  const formattedPhoneNumber = useMemo(() => {
    const cleaned = rawPhoneNumber.replace(/\D/g, '');
    if (cleaned.length > 2) {
      if (cleaned.length >= 10) {
        const last10 = cleaned.slice(-10);
        return `+91 ${last10.slice(0, 5)} ${last10.slice(5)}`;
      }
      return cleaned;
    }
    return rawPhoneNumber;
  }, [rawPhoneNumber]);

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
      >
        <View style={[verifyOtpStyles.content, contentPadding]}>
          <ScrollView
            style={verifyOtpStyles.scrollView}
            contentContainerStyle={verifyOtpStyles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Title Section */}
            <View style={verifyOtpStyles.titleSection}>
              <View style={verifyOtpStyles.titleContainer}>
                <Text style={verifyOtpStyles.title}>
                  {t('auth.verify_phone')}
                </Text>
                <View style={verifyOtpStyles.titleAccent} />
              </View>
              <Text style={verifyOtpStyles.subtitle}>
                {t('auth.code_sent_to')}{' '}
                <Text style={verifyOtpStyles.phoneNumberHighlight}>
                  {formattedPhoneNumber}
                </Text>
              </Text>
            </View>

            {/* OTP Input Section (Controlled) */}
            <View style={verifyOtpStyles.otpSection}>
              <Controller
                control={control}
                name="otp"
                rules={{
                  required: 'OTP is required',
                  minLength: {
                    value: 4,
                    message: 'Enter valid 4-digit OTP',
                  },
                  maxLength: {
                    value: 4,
                    message: 'Enter valid 4-digit OTP',
                  },
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: 'Invalid OTP',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <OtpInput
                    ref={otpInputRef}
                    length={4}
                    value={value}
                    onChange={onChange}
                    onComplete={() => {}} // Could submit automatically if desired
                    error={!!errors.otp}
                  />
                )}
              />

              {errors.otp ? (
                <Text style={verifyOtpStyles.errorText}>
                  {errors.otp.message}
                </Text>
              ) : null}
            </View>

            {/* Timer and Resend Section */}
            <View style={verifyOtpStyles.timerSection}>
              {!isResendEnabled ? (
                <Text style={verifyOtpStyles.timerText}>
                  {t('auth.code_expires_in')}{' '}
                  <Text style={verifyOtpStyles.timerValue}>
                    {Math.floor(timer / 60)}:
                    {String(timer % 60).padStart(2, '0')}
                  </Text>
                </Text>
              ) : (
                <ThemeButton
                  title={t('auth.resend_code')}
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
              title={t('auth.verify_and_continue')}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isVerifying}
              isLoading={isVerifying}
              fullWidth
            />
            <View style={verifyOtpStyles.changeNumberContainer}>
              <ThemeButton
                title={t('auth.change_number')}
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
