import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import colors from '../theme/colors';
import { RFont } from '../theme/fonts';

const CONTACT_NUMBER = '+918655437186';
const CONTACT_NUMBER_DISPLAY = '+91 86554 37186';

export const HelpSupportScreen: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const handleCall = () => {
    Linking.openURL(`tel:${CONTACT_NUMBER}`);
  };

  const handleWhatsApp = () => {
    const url = `whatsapp://send?phone=${CONTACT_NUMBER.replace('+', '')}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Fallback to web link if app is not installed
        Linking.openURL(`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`);
      }
    });
  };

  const handleEmail = () => {
    Linking.openURL('mailto:coachflow.help@gmail.com');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader 
        title={t('profile.help_support')} 
        showBackButton={true} 
        backgroundColor="#F8FAFC"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.supportImageContainer}>
            <Text style={styles.supportEmoji}>🎧</Text>
          </View>
          <Text style={styles.headerTitle}>How can we help you?</Text>
          <Text style={styles.headerSubtitle}>
            Our team is here to assist you with any questions or issues you might have.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <TouchableOpacity style={styles.contactCard} onPress={handleCall} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: '#E0F2FE' }]}>
              <Text style={styles.icon}>📞</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Call Us</Text>
              <Text style={styles.contactValue}>{CONTACT_NUMBER_DISPLAY}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleWhatsApp} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
              <Text style={styles.icon}>💬</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>WhatsApp</Text>
              <Text style={styles.contactValue}>Chat with Support</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleEmail} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFEDD5' }]}>
              <Text style={styles.icon}>✉️</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email Us</Text>
              <Text style={styles.contactValue}>coachflow.help@gmail.com</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>How do I change my profile photo?</Text>
            <Text style={styles.faqAnswer}>
              Go to Profile {'->'} Tap on the camera icon on your avatar to pick a new photo from your gallery.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Can I change the app language?</Text>
            <Text style={styles.faqAnswer}>
              Yes! Go to Profile {'->'} General {'->'} Language to switch between English and Gujarati.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Where can I see my batch details?</Text>
            <Text style={styles.faqAnswer}>
              All your enrolled batches are listed on the Home screen. Tap on any batch to see full details.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>CoachFlow Support v1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  supportImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  supportEmoji: {
    fontSize: RFont(32),
  },
  headerTitle: {
    fontSize: RFont(22),
    fontFamily: 'Inter-Bold',
    color: colors.black_900 || '#1B1B1B',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: RFont(14),
    fontFamily: 'Inter-Regular',
    color: colors.grey_600 || '#62656A',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: RFont(18),
    fontFamily: 'Inter-SemiBold',
    color: colors.black_900 || '#1B1B1B',
    marginBottom: 16,
    marginLeft: 4,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: RFont(20),
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: RFont(14),
    fontFamily: 'Inter-Medium',
    color: colors.grey_400 || '#9CA3AF',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: RFont(16),
    fontFamily: 'Inter-SemiBold',
    color: colors.black_900 || '#1B1B1B',
  },
  chevron: {
    fontSize: RFont(24),
    color: colors.grey_400,
    fontFamily: 'Inter-Light',
  },
  faqCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  faqQuestion: {
    fontSize: RFont(15),
    fontFamily: 'Inter-SemiBold',
    color: colors.black_900 || '#1B1B1B',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: RFont(14),
    fontFamily: 'Inter-Regular',
    color: colors.grey_600 || '#62656A',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: RFont(12),
    fontFamily: 'Inter-Medium',
    color: colors.grey_400,
  },
});
