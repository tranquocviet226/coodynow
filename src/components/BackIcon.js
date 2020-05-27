import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BackIcon = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.iconLeft}>
      <Icon name="chevron-left" color="black" size={30} />
    </TouchableOpacity>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  iconLeft: {
    position: 'absolute',
    backgroundColor: 'rgba(243, 243, 243, 0.7)',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    padding: 7,
    top: 37,
    left: 20,
    zIndex: 1,
  },
});
