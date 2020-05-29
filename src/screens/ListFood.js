import React from 'react';
import {Text, Image, FlatList, View} from 'react-native';
import CardHorizontal from '../components/CardHorizontal';
import CardVertical from '../components/CardVertical';
import BackIcon from '../components/BackIcon';
import {useDispatch} from 'react-redux';
import * as CartAction from '../store/action/CartAction';

const ListFood = ({route, navigation}) => {
  const {title, image} = route.params;

  const selectFoodHandler = item => {
    navigation.navigate('Detail', {
      item: item,
    });
  };

  const dispatch = useDispatch();

  const addToCart = items => {
    dispatch(CartAction.addToCart(items));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10}}>
      <FlatList
        ListHeaderComponent={
          <View>
            <BackIcon navigation={navigation} />
            <Image
              source={image}
              style={{width: '100%', height: 200, resizeMode: 'stretch'}}
            />
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
              {title}
            </Text>
            <Text
              style={{fontWeight: 'bold', fontSize: 16, paddingHorizontal: 5}}>
              Recommend Today
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pizzaData}
              keyExtractor={item => item.id.toString()}
              renderItem={itemData => (
                <CardHorizontal
                  item={itemData.item}
                  onSelectFood={() => selectFoodHandler(itemData.item)}
                  onAddToCart={() => addToCart(itemData.item)}
                />
              )}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                paddingHorizontal: 5,
                marginVertical: 5,
              }}>
              All Specal Today
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={pizzaData}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <CardVertical
            item={itemData.item}
            onSelectFood={() => selectFoodHandler(itemData.item)}
            onAddToCart={() => addToCart(itemData.item)}
          />
        )}
      />
    </View>
  );
};

export default ListFood;

const pizzaData = [
  {
    id: 10,
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
    id: 20,
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
    id: 30,
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
    id: 40,
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
    id: 50,
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
