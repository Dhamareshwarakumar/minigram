import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Test from './src/screens/Test';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};


export default App;