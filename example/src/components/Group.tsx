import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../hooks/use-theme';

interface GroupProps {
  children: ReactNode;
}

export const Group = ({ children }: GroupProps) => {
  const isDark = useTheme();

  return (
    <View style={[styles.group, { backgroundColor: isDark ? '#181818' : '#eee' }]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginTop: 8,
    marginBottom: 8,
    padding: 10,

    borderRadius: 6,
  },
});
