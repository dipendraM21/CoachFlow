import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LanguageSelectorProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (lang: 'en' | 'gu') => void;
  currentLanguage: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isVisible,
  onClose,
  onSelect,
  currentLanguage,
}) => {
  const { t } = useTranslation();

  const languages = [
    { code: 'en', label: t('languages.en'), flag: '🇺🇸' },
    { code: 'gu', label: t('languages.gu'), flag: '🇮🇳' },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <View style={styles.handle} />
              <Text style={styles.title}>{t('common.select_language')}</Text>
              
              <View style={styles.optionsContainer}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    activeOpacity={0.7}
                    style={[
                      styles.option,
                      currentLanguage === lang.code && styles.selectedOption,
                    ]}
                    onPress={() => {
                      onSelect(lang.code as 'en' | 'gu');
                    }}
                  >
                    <View style={styles.optionContent}>
                      <View style={styles.flagContainer}>
                        <Text style={styles.flag}>{lang.flag}</Text>
                      </View>
                      <Text
                        style={[
                          styles.label,
                          currentLanguage === lang.code && styles.selectedLabel,
                        ]}
                      >
                        {lang.label}
                      </Text>
                    </View>
                    <View style={[
                      styles.radioCircle,
                      currentLanguage === lang.code && styles.selectedRadioCircle
                    ]}>
                      {currentLanguage === lang.code && <View style={styles.selectedDot} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.grey_100,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: RFont(20),
    fontFamily: 'Inter-Bold',
    color: colors.black_900 || '#1B1B1B',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#FFF5F2', // Very light orange
    borderColor: colors.orange,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  flag: {
    fontSize: RFont(18),
  },
  label: {
    fontSize: RFont(16),
    fontFamily: 'Inter-Medium',
    color: colors.grey_600 || '#62656A',
  },
  selectedLabel: {
    color: colors.orange,
    fontFamily: 'Inter-SemiBold',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.grey_400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioCircle: {
    borderColor: colors.orange,
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.orange,
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: RFont(16),
    fontFamily: 'Inter-SemiBold',
    color: colors.grey_400,
  },
});
