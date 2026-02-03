import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

interface SectionContainerProps {
  title?: string;
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = React.memo(
  ({ title, children }) => {
    return (
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.card}>{children}</View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: RFont(24),
  },
  title: {
    ...fontStyles.Maison_600_12PX_16LH,
    color: colors.textSecondary,
    marginBottom: RFont(8),
    paddingHorizontal: RFont(4),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: RFont(16),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9', // Slate-100
  },
});
