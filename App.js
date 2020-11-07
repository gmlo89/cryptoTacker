/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CoinStack from 'cryptoTracker/src/components/coins/CoinStack';

const App = () => {
  return (
    <NavigationContainer>
      <CoinStack></CoinStack>
    </NavigationContainer>
  );
};


export default App;
