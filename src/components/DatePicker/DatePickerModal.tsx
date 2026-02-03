import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import { fontFamily, RFont } from '../../theme/fonts';

// Constants for wheel picker
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

interface DatePickerModalProps {
  visible: boolean;
  initialDate?: Date | null;
  minimumDate?: Date;
  maximumDate?: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

/**
 * Optimized Date Picker Modal
 *
 * Built with React Native's Animated API for maximum compatibility with RN 0.83.
 * Features smooth animations, premium UI, and optimized performance.
 */
export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  initialDate = null,
  minimumDate,
  maximumDate = new Date(),
  onConfirm,
  onCancel,
}) => {
  // Animation values for modal
  const modalScale = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Month names
  const MONTHS = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    [],
  );

  // Initialize with initialDate or maximumDate
  const getInitialValues = useCallback(() => {
    const baseDate = initialDate || maximumDate;
    return {
      month: baseDate.getMonth(),
      day: baseDate.getDate(),
      year: baseDate.getFullYear(),
    };
  }, [initialDate, maximumDate]);

  const [selectedMonth, setSelectedMonth] = useState(getInitialValues().month);
  const [selectedDay, setSelectedDay] = useState(getInitialValues().day);
  const [selectedYear, setSelectedYear] = useState(getInitialValues().year);

  // ScrollView refs for programmatic scrolling
  const monthScrollRef = useRef<ScrollView>(null);
  const dayScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  // Generate year range (100 years back from maximumDate)
  const years = useMemo(() => {
    const maxYear = maximumDate.getFullYear();
    const minYear = minimumDate ? minimumDate.getFullYear() : maxYear - 100;
    const yearList: number[] = [];
    for (let year = maxYear; year >= minYear; year--) {
      yearList.push(year);
    }
    return yearList;
  }, [minimumDate, maximumDate]);

  // Calculate days in selected month/year
  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedMonth, selectedYear]);

  // Generate day array
  const days = useMemo(() => {
    const dayList: number[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dayList.push(day);
    }
    return dayList;
  }, [daysInMonth]);

  // Adjust selected day if it exceeds days in the new month
  const adjustDayIfNeeded = useCallback(
    (month: number, year: number, currentDay: number) => {
      const maxDays = new Date(year, month + 1, 0).getDate();
      return currentDay > maxDays ? maxDays : currentDay;
    },
    [],
  );

  // Handle month change
  const handleMonthChange = useCallback(
    (monthIndex: number) => {
      setSelectedMonth(monthIndex);
      const adjustedDay = adjustDayIfNeeded(
        monthIndex,
        selectedYear,
        selectedDay,
      );
      if (adjustedDay !== selectedDay) {
        setSelectedDay(adjustedDay);
      }
    },
    [selectedYear, selectedDay, adjustDayIfNeeded],
  );

  // Handle year change
  const handleYearChange = useCallback(
    (year: number) => {
      setSelectedYear(year);
      const adjustedDay = adjustDayIfNeeded(selectedMonth, year, selectedDay);
      if (adjustedDay !== selectedDay) {
        setSelectedDay(adjustedDay);
      }
    },
    [selectedMonth, selectedDay, adjustDayIfNeeded],
  );

  // Handle day change
  const handleDayChange = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  // Validate if selected date is within allowed range
  const isDateValid = useCallback(() => {
    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

    if (minimumDate && selectedDate < minimumDate) {
      return false;
    }

    if (maximumDate && selectedDate > maximumDate) {
      return false;
    }

    return true;
  }, [selectedMonth, selectedDay, selectedYear, minimumDate, maximumDate]);

  // Handle confirm with animation
  const handleConfirm = useCallback(() => {
    if (!isDateValid()) {
      return;
    }

    const confirmedDate = new Date(selectedYear, selectedMonth, selectedDay);

    // Animate out
    Animated.parallel([
      Animated.spring(modalScale, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onConfirm(confirmedDate);
    });
  }, [
    selectedMonth,
    selectedDay,
    selectedYear,
    isDateValid,
    onConfirm,
    modalScale,
    overlayOpacity,
  ]);

  // Handle cancel with animation
  const handleCancel = useCallback(() => {
    // Animate out
    Animated.parallel([
      Animated.spring(modalScale, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const initial = getInitialValues();
      setSelectedMonth(initial.month);
      setSelectedDay(initial.day);
      setSelectedYear(initial.year);
      onCancel();
    });
  }, [getInitialValues, onCancel, modalScale, overlayOpacity]);

  // Animate in when visible
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(modalScale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 15,
          stiffness: 150,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Scroll to initial positions
      setTimeout(() => {
        const initial = getInitialValues();
        monthScrollRef.current?.scrollTo({
          y: initial.month * ITEM_HEIGHT,
          animated: false,
        });
        dayScrollRef.current?.scrollTo({
          y: (initial.day - 1) * ITEM_HEIGHT,
          animated: false,
        });
        const yearIndex = years.indexOf(initial.year);
        yearScrollRef.current?.scrollTo({
          y: yearIndex * ITEM_HEIGHT,
          animated: false,
        });
      }, 100);
    }
  }, [visible, modalScale, overlayOpacity, getInitialValues, years]);

  // Render wheel picker column
  const renderWheelPicker = useCallback(
    (
      items: (string | number)[],
      selectedIndex: number,
      onSelect: (index: number) => void,
      width: number,
      scrollRef: React.RefObject<ScrollView | null>,
    ) => {
      return (
        <View style={[styles.pickerColumn, { width }]}>
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              const index = Math.round(offsetY / ITEM_HEIGHT);
              onSelect(index);
            }}
            contentContainerStyle={{
              paddingVertical: ITEM_HEIGHT * 2,
            }}
          >
            {items.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.pickerItem}
                  onPress={() => {
                    scrollRef.current?.scrollTo({
                      y: index * ITEM_HEIGHT,
                      animated: true,
                    });
                    onSelect(index);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      isSelected && styles.pickerItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Selection indicator */}
          <View style={styles.selectionIndicator} pointerEvents="none">
            <View style={styles.selectionIndicatorTop} />
            <View style={styles.selectionIndicatorBottom} />
          </View>
        </View>
      );
    },
    [],
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleCancel}
      statusBarTranslucent
    >
      <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: modalScale }],
                opacity: modalScale,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalContent}
              onPress={e => e.stopPropagation()}
            >
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Select date</Text>
                <Text style={styles.headerSubtitle}>
                  {MONTHS[selectedMonth]} {selectedDay}, {selectedYear}
                </Text>
              </View>

              {/* Wheel Pickers Container */}
              <View style={styles.pickersContainer}>
                {/* Month Picker */}
                {renderWheelPicker(
                  MONTHS,
                  selectedMonth,
                  handleMonthChange,
                  140,
                  monthScrollRef,
                )}

                {/* Day Picker */}
                {renderWheelPicker(
                  days,
                  days.indexOf(selectedDay),
                  index => handleDayChange(days[index]),
                  80,
                  dayScrollRef,
                )}

                {/* Year Picker */}
                {renderWheelPicker(
                  years,
                  years.indexOf(selectedYear),
                  index => handleYearChange(years[index]),
                  100,
                  yearScrollRef,
                )}
              </View>

              {/* Footer Actions */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  headerTitle: {
    fontSize: RFont(20),
    fontFamily: fontFamily.MaisonMedium,
    color: colors.black,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: RFont(14),
    fontFamily: fontFamily.MaisonRegular,
    color: colors.gray,
    marginTop: 4,
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: PICKER_HEIGHT,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  pickerColumn: {
    height: PICKER_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: RFont(16),
    fontFamily: fontFamily.MaisonRegular,
    color: colors.gray,
    letterSpacing: -0.2,
  },
  pickerItemTextSelected: {
    fontSize: RFont(20),
    fontFamily: fontFamily.MaisonMedium,
    color: colors.black,
    letterSpacing: -0.4,
  },
  selectionIndicator: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
  },
  selectionIndicatorTop: {
    height: 1,
    backgroundColor: colors.orange,
    opacity: 0.3,
  },
  selectionIndicatorBottom: {
    height: 1,
    backgroundColor: colors.orange,
    opacity: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cancelButtonText: {
    fontSize: RFont(16),
    fontFamily: fontFamily.MaisonMedium,
    color: colors.gray,
    letterSpacing: -0.2,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: RFont(16),
    fontFamily: fontFamily.MaisonMedium,
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
});
