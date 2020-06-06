import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import { CardStyleInterpolators } from '@react-navigation/stack';

import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Product/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ListFood from '../screens/Product/ListFood';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailFood from '../screens/Product/DetailFood';
import {useSelector} from 'react-redux';
import ModalScreen from '../screens/Product/ModalScreen';

const IconWithBadge = ({name, badgeCount, color, focused, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.viewCart}>
      <Icon name={name} size={38} color={color} />
      {badgeCount > 0 && (
        <View
          style={[
            styles.viewBadge,
            {backgroundColor: focused ? '#ff3660' : 'lightblue'},
          ]}>
          <Text style={styles.badge}>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const RootTab = createBottomTabNavigator();
const TabScreen = () => {
  const badgeCountNum = useSelector(state => {
    const newCartData = [];
    for (const key in state.cartItems.items) {
      newCartData.push({key});
    }
    return newCartData.length;
  });
  return (
    <RootTab.Navigator
      tabBarOptions={{activeTintColor: '#f96c2a', showLabel: false}}
      screenOptions={({route, navigation}) => ({
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'magnify-plus' : 'magnify';
          } else if (route.name === 'Cart') {
            return (
              <IconWithBadge
                name={focused ? 'cart' : 'cart-outline'}
                size={size}
                color={color}
                badgeCount={badgeCountNum}
                focused={focused}
                navigation={navigation}
              />
            );
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }

          return <Icon name={iconName} color={color} size={30} />;
        },
      })}>
      <RootTab.Screen name="Home" component={HomeScreen} />
      <RootTab.Screen
        name="Search"
        component={SearchScreen}
        initialParams={(value = '')}
      />
      <RootTab.Screen name="Cart" component={CartScreen} />
      <RootTab.Screen name="Favorite" component={FavoriteScreen} />
      <RootTab.Screen name="Profile" component={ProfileScreen} />
    </RootTab.Navigator>
  );
};

const config = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const HomeStack = createSharedElementStackNavigator();
const HomeStackScreen = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}>
        <HomeStack.Screen name="Splash" component={SplashScreen} />
        <HomeStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <HomeStack.Screen name="Home" component={TabScreen} />
        <HomeStack.Screen name="List" component={ListFood} />
        <HomeStack.Screen
          name="Detail"
          component={DetailFood}
          sharedElementsConfig={route => {
            const {item} = route.params;
            return Platform.OS === 'ios' ? [{id: item.id}] : null;
          }}
          options={{
            transitionSpec: {
              open: config,
              close: {...config, config: {duration: 350}},
            },
          }}
        />
        <HomeStack.Screen name="Modal" component={ModalScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStackScreen;

const styles = StyleSheet.create({
  viewCart: {
    bottom: 25,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  viewBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff3660',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
