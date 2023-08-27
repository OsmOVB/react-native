import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { ItemDetails } from './src/screens/ItemDetails';
import { ExtraPage } from './src/screens/ExtraPage';

const Stack = createNativeStackNavigator();

 const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="ExtraPage" component={ExtraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;