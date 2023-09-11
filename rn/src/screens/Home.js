
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const navigateToPokemonDetail = (name, color) => {
    navigation.navigate('PokemonDetail', { name, color });
  };

  const fetchMoreData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 15}&limit=15`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      const newData = await Promise.all(jsonData.results.map(async (result) => {
        const { genus, color } = await fetchSpeciesInfo(`https://pokeapi.co/api/v2/pokemon-species/${result.name}`);
        return {
          name: result.name,
          url: result.url,
          species: genus,
          color: color,
        };
      }));
      setData(prevData => [...prevData, ...newData]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  

  const fetchSpeciesInfo = async (speciesUrl) => {
    try {
      const response = await fetch(speciesUrl);
      const jsonData = await response.json();
      const genus = jsonData.genera.find(item => item.language.name === 'en');
      const color = jsonData.color.name; 
  
      if (genus) {
        return { genus: genus.genus, color };
      } else {
        return { genus: 'Não encontrado', color };
      }
    } catch (error) {
      console.error('Fetch species info error:', error);
      return { genus: 'Não encontrado', color: 'black' };
    }
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToPokemonDetail(item.name, item.color)}>
      <View style={styles.item}>
        <Image
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonNumber(item.url)}.png` }}
          style={styles.itemImage}
        />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemText, {color:  item.color}]}>Nome: {item.name}</Text>
          <Text style={[styles.itemText, {color:  item.color}]}>Espécie: {item.species}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const extractPokemonNumber = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.name + index.toString()}
        renderItem={renderItem}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#d1cfcf'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
