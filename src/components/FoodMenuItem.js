import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';

const FoodMenuItem = ({bgColor, title, image, onSelectMenu}) => {
  return (
    <View
      style={{
        flex: 1,
        elevation: 3,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginHorizontal: 10,
        marginVertical: 7,
      }}>
      <TouchableOpacity
        onPress={onSelectMenu}
        style={[styles.container, {backgroundColor: bgColor}]}>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

export default FoodMenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
  img: {
    position: 'absolute',
    right: -20,
    bottom: -30,
    resizeMode: 'stretch',
    width: '100%',
    height: 200,
  },
});
