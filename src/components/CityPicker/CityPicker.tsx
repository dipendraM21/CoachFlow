import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';
import { ThemeButton } from '../Button/Button';

interface CityPickerProps {
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  r;
  error?: string;
}

const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Patna',
  'Vadodara',
  'Ghaziabad',
];

export const CityPicker: React.FC<CityPickerProps> = ({
  value,
  onChange,
  placeholder = 'Select City',
  error,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectCity = (city: string) => {
    onChange(city);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>City</Text>
      <TouchableOpacity
        style={[styles.input, error && styles.inputError]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select City</Text>
              <ThemeButton
                title="✕"
                onPress={() => setIsModalVisible(false)}
                variant="text"
                size="sm"
                textStyle={styles.closeButtonText}
                style={styles.closeButton}
              />
            </View>
            <ScrollView style={styles.cityList}>
              {CITIES.map(city => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.cityItem,
                    value === city && styles.cityItemSelected,
                  ]}
                  onPress={() => handleSelectCity(city)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.cityItemText,
                      value === city && styles.cityItemTextSelected,
                    ]}
                  >
                    {city}
                  </Text>
                  {value === city && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: RFont(20),
  },
  label: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(14),
    color: colors.black,
    marginBottom: RFont(8),
  },
  input: {
    width: '100%',
    height: RFont(50),
    borderWidth: 1,
    borderColor: colors.grey_100,
    borderRadius: RFont(8),
    paddingHorizontal: RFont(16),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputError: {
    borderColor: colors.red_500,
  },
  inputText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(16),
    color: colors.black,
    flex: 1,
  },
  placeholderText: {
    color: colors.grayLight,
  },
  arrow: {
    fontSize: RFont(12),
    color: colors.gray,
    marginLeft: RFont(8),
  },
  errorText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(12),
    color: colors.red_500,
    marginTop: RFont(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: RFont(20),
    borderTopRightRadius: RFont(20),
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RFont(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.grey_100,
  },
  modalTitle: {
    fontFamily: fontFamily.MaisonBold,
    fontSize: RFont(18),
    color: colors.black,
  },
  closeButton: {
    width: RFont(32),
    height: RFont(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: RFont(24),
    color: colors.gray,
  },
  cityList: {
    maxHeight: RFont(400),
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RFont(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.grey_100,
  },
  cityItemSelected: {
    backgroundColor: colors.grayLightest,
  },
  cityItemText: {
    fontFamily: fontFamily.MaisonRegular,
    fontSize: RFont(16),
    color: colors.black,
  },
  cityItemTextSelected: {
    fontFamily: fontFamily.MaisonMedium,
    color: colors.black,
  },
  checkmark: {
    fontSize: RFont(18),
    color: colors.black,
    fontFamily: fontFamily.MaisonBold,
  },
});
