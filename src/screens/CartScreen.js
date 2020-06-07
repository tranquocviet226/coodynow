import React, {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardCart from '../components/CardCart';
import CurrencyFormat from '../components/CurrencyFormat';
import RequireLogin from '../components/RequireLogin';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import * as CartAction from '../store/action/CartAction';
import * as AuthAction from '../store/action/AuthAction';
import * as OrderAction from '../store/action/OrderAction';
import {Colors} from '../Constrains/Colors';

const W = Dimensions.get('window').width;

const CartScreen = ({navigation}) => {
  const user_info = useSelector(state => state.authReducer.user_info);
  const id = useSelector(state => state.authReducer.id);

  const total = useSelector(state => state.cartItems.total);

  const onSignoutHandle = () => {
    dispatch(AuthAction.signOut());
    navigation.replace('Login');
  };

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

  // ADD ORDER
  const items = useSelector(state => state.cartItems.items);
  const payHandle = () => {
    if (user_info != null) {
      if (total !== 0) {

        const newItems = [];
        for (const key in items) {
          newItems.push({
            key: key,
            title: items[key].title,
            price: items[key].price,
            quantity: items[key].quantity,
          });
        }
        dispatch(OrderAction.addOrder(id, total, newItems));
        alert('Đặt hàng thành công!');
      } else {
        alert('Vui lòng lựa chọn một vài sản phẩm');
      }
    } else {
      alert('Vui lòng đăng nhập để thanh toán');
    }
  };

  const cart = {total, items: items};
  useEffect(() => {
    dispatch(CartAction.cartToServer(id, cart));
  }, [dispatch, inCreaseItem, deCreaseItem]);

  if (!user_info) {
    return (
      <View>
        <LinearGradient
          colors={['#ffbbdc', '#ffbbdc', '#ffbbdc', '#7ae1f2']}
          style={styles.cardBg}
        />
        <RequireLogin onGoToLogin={() => onSignoutHandle()} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.totalContent}>
        <View style={styles.totalCom}>
          <Text style={styles.total}>Tổng tiền: </Text>
          <Text style={styles.totalTxt}>
            {'\u20AB'} {CurrencyFormat(total)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => payHandle()}>
          <Icon name="send" size={30} color={Colors.orange} />
        </TouchableOpacity>
      </View>
      {total === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/shopping_cart.png')}
            style={styles.shoppingCart}
          />
          <Text style={styles.noProduct}>
            Không có sản phẩm nào trong giỏ hàng. Hãy thêm một vài sản phẩm!
          </Text>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f3',
    marginTop: Platform.OS === 'android' ? 25 : null,
  },
  cardBg: {
    position: 'absolute',
    height: W * 2,
    width: W * 2,
    backgroundColor: Colors.green,
    borderRadius: W,
    left: -W / 2,
    top: -((W * 5) / 4),
  },
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
  totalTxt: {fontSize: 20, fontWeight: 'bold', color: Colors.orange},
  noProduct: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    paddingHorizontal: 15,
  },
  shoppingCart: {
    width: 130,
    height: 80,
    resizeMode: 'stretch',
    marginBottom: 10,
  },
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
