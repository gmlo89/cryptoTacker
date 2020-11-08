/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import CoinStack from 'cryptoTracker/src/components/coins/CoinStack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import Colors from 'cryptoTracker/src/res/colors';
import FavoritesStack from 'cryptoTracker/src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions= {{
          tintColor: "#fefefe",
          style: {
            backgroundColor: Colors.blackPearl
          }
        }}
        >
        <Tabs.Screen 
          name="Coins"
          options={{
            tabBarIcon:({ size, color }) => (
              <Image 
                style={{ tintColor: color, width:size, height: size }}
                source={ require('cryptoTracker/src/assets/bank.png') } 
              />
            )
          }}
          component={CoinStack} 
        />

        <Tabs.Screen 
          name="Favorites"
          options={{
            tabBarIcon:({ size, color }) => (
              <Image 
                style={{ tintColor: color, width:size, height: size }}
                source={ require('cryptoTracker/src/assets/star.png') } 
              />
            )
          }}
          component={FavoritesStack} 
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};


export default App;
