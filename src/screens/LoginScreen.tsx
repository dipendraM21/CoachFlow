import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
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
import type { GuestStackParamList } from '../navigation/GuestNavigator';
import colors from '../theme/colors';
import { fontFamily, RFont } from '../theme/fonts';
import { translations } from '../utils/translation';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  GuestStackParamList,
  'Login'
>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      return;
    }
    // Navigate to VerifyOtp screen with phone number
    navigation.navigate('VerifyOtp', { phoneNumber: phoneNumber.trim() });
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
            { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 24) },
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
              <View style={styles.logo}>
                <Text style={styles.logoText}>{translations.LOGO_TEXT}</Text>
              </View>
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
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoComplete="tel"
                textContentType="telephoneNumber"
              />
            </View>
          </ScrollView>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <ThemeButton
              title={translations.CONTINUE}
              onPress={handleContinue}
              disabled={!phoneNumber.trim()}
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
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(32),
    color: '#FFF',
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
