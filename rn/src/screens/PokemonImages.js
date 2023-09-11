import React from 'react';
import { Dimensions } from 'react-native';
import { View, Image, StyleSheet } from 'react-native';

export const PokemonImage = ({ route }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.gif}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1cfcf',
  },
  gif: {
    width: Dimensions.get('window').width * 0.60,
    height: 400,
    resizeMode: 'contain',
  },
});
