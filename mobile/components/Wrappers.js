import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Container = ({ children, backgroundColor, style }) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {children}
    </View>
  );
};

export const Row = ({ children, backgroundColor, style }) => {
  return (
    <View style={[styles.row, { backgroundColor }, style]}>
      {children}
    </View>
  );
};

export const SpaceBetweenRow = ({ children, backgroundColor, style }) => {
  return (
    <View style={[styles.spaceBetweenRow, style, { backgroundColor }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetweenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
