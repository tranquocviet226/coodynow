import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({navigation}) => {
  return (
    <View style={styles.headerCon}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconLeft}>
        <Icon name="chevron-left" color="black" size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{`Menu`.toLocaleUpperCase()}</Text>
      <TouchableOpacity>
        <Icon name="heart-outline" size={30} color="yellow" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerCon: {
    marginTop: Platform.OS === "android" ? 25 : 0,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  iconLeft: {
    backgroundColor: 'rgba(243, 243, 243, 0.7)',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    padding: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4c4c4c"
  },
});
