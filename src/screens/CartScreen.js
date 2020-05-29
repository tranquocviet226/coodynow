import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardCart from '../components/CardCart';
import {useDispatch, useSelector} from 'react-redux';
import * as CartAction from '../store/action/CartAction';

const CartScreen = ({navigation}) => {
  const [isLoading, setIsLoading]= useState(false);
  const total = useSelector(state => state.cartItems.total);

  const cartData = useSelector(state => {
    const newCartData = [];
    for (const key in state.cartItems.items) {
      newCartData.push({
        id: key,
        price: state.cartItems.items[key].price,
        title: state.cartItems.items[key].title,
        quantity: state.cartItems.items[key].quantity,
        sum: state.cartItems.items[key].sum,
        date: state.cartItems.items[key].date,
        image: state.cartItems.items[key].image,
      });
    }
    return newCartData.sort((a, b) => {
      a.date > b.date ? -1 : 1;
    });
  });

  const dispatch = useDispatch();
  const inCreaseItem = items => {
    dispatch(CartAction.addToCart(items));
  };
  const deCreaseItem = id => {
    dispatch(CartAction.removeCart(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.totalContent}>
        <View style={styles.totalCom}>
          <Text style={styles.total}>Total: </Text>
          <Text style={styles.totalTxt}>
            {'\u20AB'} {total}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="send" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartData}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <CardCart
            item={itemData.item}
            onIncrease={() => inCreaseItem(itemData.item)}
            onDecrease={() => deCreaseItem(itemData.item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ecf0f3'},
  totalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 10,
  },
  totalCom: {flexDirection: 'row', alignItems: 'center'},
  total: {fontSize: 16, fontWeight: 'bold'},
  totalTxt: {fontSize: 20, fontWeight: 'bold', color: '#2cc879'},
});

const data = [
  {
    id: 1,
    title: 'Pizza Hut',
    image:
      'https://esteemgift.vn/_cache/e/e9f64a45efff3db7a2a8fcffaed3827d.jpg',
    price: 29000,
    description:
      'Quây quần bên bạn bè và người thân để cùng thưởng thức hương vị pizza với nhân phủ hảo hạng và đế bánh vàng giòn. Bữa ăn tràn ngập yêu thương đang chờ đợi bạn tại nhà hàng Pizza Hut chúng tôi!',
    rate: 2.4,
    people: 1276,
  },
  {
    id: 2,
    title: 'Pizza VietNam',
    image:
      'https://www.itourvn.com/images/easyblog_images/banh_trang_nuong/vietnamese-pizza-how-to-make.jpg',
    price: 250009898356345,
    description:
      'Quây quần bên bạn bè và người thân để cùng thưởng thức hương vị pizza với nhân phủ hảo hạng và đế bánh vàng giòn. Bữa ăn tràn ngập yêu thương đang chờ đợi bạn tại nhà hàng Pizza Hut chúng tôi!',
    rate: 5.0,
    people: 9831,
  },
  {
    id: 3,
    title:
      'Pizza Camuchia Pizza He He Hut Pizza Hut Pizza Hut Pizza Hut Pizza Hut Pizza Hut Pizza Hut Pizza Hut',
    image:
      'https://media-cdn.tripadvisor.com/media/photo-s/0d/21/4e/e9/vietnamese-pizza.jpg',
    price: 20900,
    description:
      'Quây quần bên bạn bè và người thân để cùng thưởng thức hương vị pizza với nhân phủ hảo hạng và đế bánh vàng giòn. Bữa ăn tràn ngập yêu thương đang chờ đợi bạn tại nhà hàng Pizza Hut chúng tôi!',
    rate: 4.0,
    people: 12,
  },
  {
    id: 4,
    title: 'Pizza French',
    image:
      'https://esteemgift.vn/_cache/e/e9f64a45efff3db7a2a8fcffaed3827d.jpg',
    price: 2900900,
    description:
      'Quây quần bên bạn bè và người thân để cùng thưởng thức hương vị pizza với nhân phủ hảo hạng và đế bánh vàng giòn. Bữa ăn tràn ngập yêu thương đang chờ đợi bạn tại nhà hàng Pizza Hut chúng tôi!',
    rate: 3.3,
    people: 126,
  },
  {
    id: 5,
    title: 'Pizza Imdia',
    image:
      'https://esteemgift.vn/_cache/e/e9f64a45efff3db7a2a8fcffaed3827d.jpg',
    price: 229000,
    description:
      'Quây quần bên bạn bè và người thân để cùng thưởng thức hương vị pizza với nhân phủ hảo hạng và đế bánh vàng giòn. Bữa ăn tràn ngập yêu thương đang chờ đợi bạn tại nhà hàng Pizza Hut chúng tôi!',
    rate: 4.1,
    people: 24,
  },
];
