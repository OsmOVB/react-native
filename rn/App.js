import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { PokemonImage } from './src/screens/PokemonImages';
import { PokemonDetail } from './src/screens/PokemonDetail';



const Stack = createNativeStackNavigator();

 const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
        <Stack.Screen name="PokemonImage" component={PokemonImage} /> 
      </Stack.Navigator>
    </NavigationContainer>
    // <View>
    //   <Form />
    // </View>
  );
};

export default App;