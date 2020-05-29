import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Header = ({navigation, title, iconName, isCartIcon}) => {
  const navigationOp = useNavigation();
  return (
    <View style={styles.headerCon}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconLeft}>
        <Icon name="chevron-left" color="black" size={30} />
      </TouchableOpacity>
      <Text ellipsizeMode="clip" numberOfLines={1} style={styles.title}>
        {`${title}`.toLocaleUpperCase()}
      </Text>
      {isCartIcon && (
        <TouchableOpacity
          onPress={() => navigationOp.navigate('Cart')}
          style={styles.iconRight}>
          <Icon name="cart-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.iconRight}>
        <Icon name={iconName} size={30} color={isCartIcon ? "yellow" : "#FFF"} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerCon: {
    marginTop: Platform.OS === 'android' ? 25 : 0,
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
  iconRight: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 5,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4c4c4c',
    width: '50%',
  },
});
