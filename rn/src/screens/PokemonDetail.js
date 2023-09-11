import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const PokemonDetail = ({ route }) => {
  const { name, color } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        setPokemonDetails(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  const getGifUrl = () => {
    if (pokemonDetails) {
      const id = pokemonDetails.id; // Obtém o id
      return `https://github.com/wellrccity/pokedex-html-js/blob/master/assets/img/pokemons/poke_${id}.gif?raw=true`;
    }
    return null;
  };

  const getImageUrl = () => {
    if (pokemonDetails) {
      const id = pokemonDetails.id;
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, ]}>
      {pokemonDetails ? (
        <View >
          <View style={styles.margem}>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getImageUrl() }}
                style={styles.image}
              />
            </View>
            <Text style={[styles.nameText, { color: color }]}>Nome: {pokemonDetails.name}</Text>
            <Text style={[styles.typeText, { color: color }]}>Altura: {pokemonDetails.height / 10} m</Text>
            <Text style={[styles.typeText, { color: color }]}>Peso: {pokemonDetails.weight / 10} kg</Text>
            <Text style={[styles.typeText, { color: color }]}>Tipo(s):</Text>
            <View style={styles.typesContainer}>
              {pokemonDetails.types.map((type, index) => (
                <View key={index} style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{type.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <Button
            title="Ver Animação"
            onPress={() => {
              const imageUrl = getGifUrl();
              if (imageUrl) {
                navigation.navigate('PokemonImage', { imageUrl, color });
              }
            }}
            style={styles.button}
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Carregando detalhes do Pokémon...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d1cfcf',
    alignItems: 'center',
    paddingVertical: 20,
    margin: '5%',

  },
  margem: {
    marginBottom: '25%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#f2c94c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 5,
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  typeBadge: {
    backgroundColor: '#f2c94c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  typeBadgeText: {
    fontSize: 16,
    color: '#333333',
  },
  loadingText: {
    fontSize: 18,
    color: '#666666',
  },
});
