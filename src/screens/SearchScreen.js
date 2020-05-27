import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SearchScreen = ({route}) => {
  const {value} = route.params;
  return (
    <View>
      <Text>SEARCH</Text>
      <Text>SEARCH</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
