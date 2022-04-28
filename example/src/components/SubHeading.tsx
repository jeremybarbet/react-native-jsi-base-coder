import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/use-theme';

interface SubHeadingProps {
  children: ReactNode;
}

export const SubHeading = ({ children }: SubHeadingProps) => {
  const isDark = useTheme();

  return (
    <>
      <Text style={[styles.subheading, { color: isDark ? '#fff' : '#000' }]}>{children}</Text>
      <View style={[styles.br, { backgroundColor: isDark ? '#323232' : '#e5e5e5' }]} />
    </>
  );
};

const styles = StyleSheet.create({
  subheading: {
    fontSize: 18,
    fontWeight: '700',

    marginTop: 50,
    marginBottom: 15,
  },

  br: {
    width: '100%',
    height: 1,

    marginBottom: 5,
  },
});
