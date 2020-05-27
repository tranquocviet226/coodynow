import React from 'react';
import {StatusBar, View} from 'react-native';
import Navigation from './src/Navigation/Navigation';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Navigation />
    </View>
  );
};

export default App;
