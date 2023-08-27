import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ItemDetails = () => {
  return (
    <View style={styles.container}>
      <Text>Item Detalhe</Text>
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

