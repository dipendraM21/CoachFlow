import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { INDIAN_CITIES_BY_STATE } from '../../constant/constant';
import { SearchIcon } from '../../screens/BatchesListingScreen/icons';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Icons
const CloseIcon = () => (
  <View style={styles.closeIcon}>
    <View style={[styles.closeLine, { transform: [{ rotate: '45deg' }] }]} />
    <View style={[styles.closeLine, { transform: [{ rotate: '-45deg' }] }]} />
  </View>
);

interface CitySelectionSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
  selectedCity?: string;
}

const POPULAR_CITIES = [
  'Mumbai',
  'Delhi',
  'Kota',
  'Jaipur',
  'Pune',
  'Bangalore',
];

export const CitySelectionSheet: React.FC<CitySelectionSheetProps> = ({
  visible,
  onClose,
  onSelectCity,
  selectedCity,
}) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  // Animation Values
  // Slide starts at Screen Height (hidden below), moves to 0
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  // Opacity starts at 0 (invisible), moves to 1
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Track if we are currently visible to handle open animation on prop change
  useEffect(() => {
    if (visible) {
      // Open Animation - Use timing for smoother, predictable slide
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400, // Slightly longer for smoothness
          easing: Easing.out(Easing.poly(4)), // Smooth entry curve
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset values when hidden
      slideAnim.setValue(SCREEN_HEIGHT);
      fadeAnim.setValue(0);
      setSearchText('');
    }
  }, [visible, slideAnim, fadeAnim]);

  const handleClose = () => {
    // Close Animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }),
    ]).start(() => {
      // Notify parent after animation
      onClose();
    });
  };

  const handleSelect = (city: string) => {
    // Select city logic with delay/animation if needed, currently same as close
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onSelectCity(city);
      // We don't call onClose here because usage usually implies selection closes it.
      // But parent might not toggle visible until callback?
      // Actually standard pattern is callback -> parent setState.
      // Since CityPicker does: onChange(city); setIsVisible(false);
      // We rely on parent unmounting us.
      // Ideally we would want to animate out then fire callback.
    });
  };

  // Flatten logic
  const allCities = useMemo(() => {
    return Object.values(INDIAN_CITIES_BY_STATE).flat().sort();
  }, []);

  const filteredCities = useMemo(() => {
    if (!searchText.trim()) return allCities;
    return allCities.filter(c =>
      c.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [allCities, searchText]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none" // Custom animation
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop Fade */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* Sliding Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: insets.bottom + 20,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Select your city</Text>
              <Text style={styles.subtitle}>
                Find the best coaching near you
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchIcon size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search city"
              placeholderTextColor="#94A3B8"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Popular Cities */}
          {searchText === '' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>POPULAR CITIES</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsContainer}
              >
                {POPULAR_CITIES.map(city => {
                  const isSelected = city === selectedCity;
                  return (
                    <TouchableOpacity
                      key={city}
                      style={[styles.chip, isSelected && styles.chipSelected]}
                      onPress={() => handleSelect(city)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {city}
                      </Text>
                      {isSelected && <Text style={styles.chipCheck}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* All Cities List */}
          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>ALL CITIES</Text>
            <FlatList
              data={filteredCities}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.cityItemText}>{item}</Text>
                  {item === selectedCity && (
                    <Text style={styles.checkIcon}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              initialNumToRender={15}
              maxToRenderPerBatch={15}
              windowSize={5}
              removeClippedSubviews={true}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: colors.white, // assuming white
    borderTopLeftRadius: RFont(24),
    borderTopRightRadius: RFont(24),
    height: '85%',
    paddingTop: RFont(24),
    paddingHorizontal: RFont(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: RFont(24),
  },
  title: {
    ...fontStyles.Maison_600_20PX_28LH,
    color: '#0F172A',
    marginBottom: RFont(4),
  },
  subtitle: {
    ...fontStyles.Maison_400_14PX_18LH,
    color: '#64748B',
  },
  closeButton: {
    padding: RFont(8),
    backgroundColor: '#F1F5F9',
    borderRadius: RFont(20),
  },
  closeIcon: {
    width: RFont(16),
    height: RFont(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: '100%',
    height: RFont(2),
    backgroundColor: '#64748B',
    borderRadius: 1,
  },
  listSection: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: RFont(12),
    paddingHorizontal: RFont(16),
    height: RFont(48),
  },
  searchInput: {
    flex: 1,
    marginLeft: RFont(12),
    ...fontStyles.Maison_400_16PX_22LH, // Replaced 24LH with 22LH
    color: '#0F172A',
  },
  section: {
    marginTop: RFont(16),
  },
  sectionTitle: {
    ...fontStyles.Maison_600_12PX_16LH,
    color: '#94A3B8',
    marginBottom: RFont(12),
    marginTop: RFont(12),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  chipsContainer: {
    gap: RFont(8),
    paddingBottom: RFont(2), // Clip fix
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFont(16),
    paddingVertical: RFont(8),
    borderRadius: RFont(20),
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  chipSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  chipText: {
    ...fontStyles.Maison_500_14PX_18LH, // Replaced 20LH with 18LH
    color: '#0F172A',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  chipCheck: {
    color: '#FFFFFF',
    marginLeft: RFont(6),
    fontSize: RFont(12),
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFont(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cityItemText: {
    ...fontStyles.Maison_400_16PX_22LH, // Replaced 24LH with 22LH
    color: '#0F172A',
  },
  checkIcon: {
    color: '#0F172A',
    fontSize: RFont(16),
    fontWeight: 'bold',
  },
});
