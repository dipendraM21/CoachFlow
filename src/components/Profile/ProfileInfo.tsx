import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import { fontStyles, RFont } from '../../theme/fonts';

interface ProfileInfoProps {
  name: string;
  email: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = React.memo(
  ({ name, email }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  name: {
    ...fontStyles.Maison_700_16PX_22LH,
    fontSize: RFont(24),
    lineHeight: RFont(30),
    color: colors.black,
    marginBottom: RFont(4),
    textAlign: 'center',
  },
  email: {
    ...fontStyles.Maison_500_14PX_18LH,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
