import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ExtraPage = () => {
  return (
    <View style={styles.container}>
      <Text>Extra Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

