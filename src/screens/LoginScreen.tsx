import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeButton } from '../components/Button/Button';
import { Input } from '../components/TextInputField/Input';
import { useSendOtpMutation } from '../hooks/mutations/useSendOtpMutation';
import colors from '../theme/colors';
import { fontFamily, RFont } from '../theme/fonts';
import { GuestStackParamList } from '../types/navigation';
import { indianPhonePattern, numericPattern } from '../utils/regexMatch';
import { showError } from '../utils/toast';
import { translations } from '../utils/translation';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  GuestStackParamList,
  'Login'
>;

// ... imports

type LoginScreenRouteProp = RouteProp<GuestStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute<LoginScreenRouteProp>();

  // Pre-fill phone number if navigating back from Verify OTP
  const [phoneNumber, setPhoneNumber] = useState(
    route.params?.phoneNumber || '',
  );
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const { mutate: sendOtp, isPending } = useSendOtpMutation();

  const handlePhoneChange = (text: string) => {
    // strict strict numeric check
    if (text === '' || numericPattern.test(text)) {
      if (text.length <= 10) {
        setPhoneNumber(text);
        if (phoneError) setPhoneError(null); // Clear error on typing
      }
    }
  };

  const handleContinue = () => {
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedPhone) {
      setPhoneError('Phone number is required');
      return;
    }

    const indianStartDigitPattern = /^[6-9]/;

    if (!indianStartDigitPattern.test(trimmedPhone)) {
      setPhoneError('Phone number must start with 6, 7, 8, or 9.');
      return;
    }

    if (trimmedPhone.length !== 10) {
      setPhoneError('Phone number must be 10 digits.');
      return;
    }

    if (!indianPhonePattern.test(trimmedPhone)) {
      setPhoneError('Please enter a valid Indian mobile number.');
      return;
    }

    sendOtp(
      {
        phone: trimmedPhone,
        role: 'STUDENT',
      },
      {
        onSuccess: () => {
          navigation.navigate('VerifyOtp', { phoneNumber: trimmedPhone });
        },
        onError: error => {
          // Toast is ONLY for API errors
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'An error occurred';
          showError(errorMessage);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View
          style={[
            styles.content,
            {
              paddingTop: insets.top,
              paddingBottom: Math.max(insets.bottom, 24),
            },
          ]}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardDismissMode="on-drag"
          >
            {/* App Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/png/app-logo.jpeg')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Welcome Message */}
            <Text style={styles.welcomeText}>{translations.WELCOME_BACK}</Text>

            {/* Instructional Text */}
            <Text style={styles.instructionText}>
              {translations.ENTER_NUMBER_TO_DISCOVER}
            </Text>

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <Input
                label={translations.PHONE_NUMBER}
                placeholder={translations.PHONE_NUMBER_PLACEHOLDER}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="numeric"
                maxLength={10}
                autoComplete="tel"
                textContentType="telephoneNumber"
                error={phoneError}
              />
            </View>
          </ScrollView>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <ThemeButton
              title={translations.CONTINUE}
              onPress={handleContinue}
              disabled={isPending}
              isLoading={isPending}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 200,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    // Removed borderRadius/backgroundColor as per typical image logo usage
  },
  welcomeText: {
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(24),
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: RFont(20),
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 24,
  },
});
