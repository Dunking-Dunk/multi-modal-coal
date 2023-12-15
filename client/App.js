import React from 'react';
import { CryptoDetail, HomeSup, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Home'}
      >
        <Stack.Screen
          name="Home"
          component={Tabs}
        />
        <Stack.Screen
          name="CryptoDetail"
          component={HomeSup}
        />
        <Stack.Screen
          name="Transaction"
          component={HomeSup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;