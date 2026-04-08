import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';
import { coachingCardStyles } from './CoachingCard.styles';

const SkeletonItem = ({ style }: { style: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return <Animated.View style={[style, { opacity, backgroundColor: colors.grey_100 }]} />;
};

export const CoachingCardSkeleton = () => {
  return (
    <View style={[coachingCardStyles.card, styles.skeletonCard]}>
      <View style={coachingCardStyles.headerRow}>
        <SkeletonItem style={styles.iconSkeleton} />
        <View style={coachingCardStyles.infoContainer}>
          <SkeletonItem style={styles.nameSkeleton} />
          <SkeletonItem style={styles.addressSkeleton} />
        </View>
      </View>

      <View style={coachingCardStyles.buttonRow}>
        <SkeletonItem style={styles.buttonSkeleton} />
        <SkeletonItem style={styles.buttonSkeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    opacity: 0.8,
  },
  iconSkeleton: {
    width: RFont(40),
    height: RFont(40),
    borderRadius: RFont(8),
  },
  nameSkeleton: {
    width: '70%',
    height: RFont(20),
    borderRadius: RFont(4),
    marginBottom: RFont(8),
  },
  addressSkeleton: {
    width: '40%',
    height: RFont(14),
    borderRadius: RFont(4),
  },
  buttonSkeleton: {
    flex: 1,
    height: RFont(44),
    borderRadius: RFont(24),
  },
});
