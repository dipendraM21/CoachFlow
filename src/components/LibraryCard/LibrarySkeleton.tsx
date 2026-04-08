import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';
import { RFont } from '../../theme/fonts';
import { libraryCardStyles } from './LibraryCard.styles';

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

export const LibraryCardSkeleton = () => {
  return (
    <View style={[libraryCardStyles.card, styles.skeletonCard]}>
      <View style={libraryCardStyles.headerRow}>
        <SkeletonItem style={styles.iconSkeleton} />
        <View style={libraryCardStyles.infoContainer}>
          <SkeletonItem style={styles.nameSkeleton} />
          <SkeletonItem style={styles.addressSkeleton} />
        </View>
      </View>

      <View style={libraryCardStyles.detailsRow}>
        <View style={libraryCardStyles.feesContainer}>
          <SkeletonItem style={styles.labelSkeleton} />
          <SkeletonItem style={styles.valueSkeleton} />
        </View>
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
  labelSkeleton: {
    width: RFont(80),
    height: RFont(12),
    borderRadius: RFont(2),
    marginBottom: RFont(4),
  },
  valueSkeleton: {
    width: RFont(60),
    height: RFont(16),
    borderRadius: RFont(4),
  },
  buttonSkeleton: {
    width: RFont(100),
    height: RFont(36),
    borderRadius: RFont(20),
  },
});
