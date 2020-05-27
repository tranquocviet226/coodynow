import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StarRating = ({rate}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {[...Array(5)].map((star, index) => (
        <Icon
          key={index.toString()}
          name="star"
          size={25}
          color={rate >= index + 1 ? 'yellow' : "#d8d8d8"}
        />
      ))}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({});
