import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { useTheme } from '../hooks/use-theme';

interface CopyProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export const Copy = ({ children, style }: CopyProps) => {
  const isDark = useTheme();

  return <Text style={[styles.copy, { color: isDark ? '#fff' : '#000' }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  copy: {
    fontSize: 16,
  },
});
