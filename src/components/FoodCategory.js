import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FoodCategory = ({item, index, onSelected, counter}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onSelected}
        style={[
          styles.touchContainer,
          {
            backgroundColor:
              counter === index ? '#0e181b' : 'rgb(243, 243, 243)',
          },
        ]}>
        <Icon
          name={item.icon}
          size={40}
          color={counter === index ? 'white' : '#5d5d5d'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

export default FoodCategory;

const styles = StyleSheet.create({
  touchContainer: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  title: {fontSize: 18, textAlign: 'center'},
});
