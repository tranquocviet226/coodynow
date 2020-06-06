import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = ({navigation, title, iconName, isCartIcon}) => {
  const navigationOp = useNavigation();
  const badgeCount = useSelector(state => {
    const newCartData = [];
    for (const key in state.cartItems.items) {
      newCartData.push({key});
    }
    return newCartData.length;
  });
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
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigationOp.navigate('Cart')}
            style={styles.iconRight}>
            <Icon name="cart-outline" size={30} color="#FFF" />
            {badgeCount > 0 && (
              <View style={styles.viewBadge}>
                <Text style={styles.badge}>{badgeCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          {iconName != null ? (
            <TouchableOpacity style={styles.iconRight}>
              <Icon name={iconName} size={30} color="#FFF" />
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerCon: {
    marginTop: Platform.OS === 'android' ? 25 : 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  iconLeft: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 44,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  iconRight: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 5,
    marginLeft: 5,
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
  viewBadge: {
    position: 'absolute',
    backgroundColor: '#f96c2a',
    top: 0,
    right: 0,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    color: 'white',
    fontSize: 15,
  },
});
