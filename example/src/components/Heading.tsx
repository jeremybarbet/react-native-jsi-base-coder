import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

import { useTheme } from '../hooks/use-theme';

interface HeadingProps {
  children: ReactNode;
}

export const Heading = ({ children }: HeadingProps) => {
  const isDark = useTheme();

  return <Text style={[styles.heading, { color: isDark ? '#fff' : '#000' }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontWeight: '700',

    marginTop: 80,
  },
});
