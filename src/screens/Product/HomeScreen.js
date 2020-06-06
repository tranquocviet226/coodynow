import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import SlideImage from '../../components/SlideImage';
import SearchBar from '../../components/SearchBar';
import FoodCategory from '../../components/FoodCategory';
import FoodMenuItem from '../../components/FoodMenuItem';
import * as AuthAction from '../../store/action/AuthAction';
import * as CartAction from '../../store/action/CartAction';
import {useDispatch, useSelector} from 'react-redux';

const W = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [menuData, setMenuData] = useState(categoryData[0].data);

  const onSelectedHandler = (index, data) => {
    setIsLoading(true);
    setTimeout(() => {
      Promise.resolve(setMenuData(data)).then(() => {
        setIsLoading(false);
      });
    }, 400);

    setCounter(index);
  };

  const submitHandler = value => {
    navigation.navigate('Search', {
      value: value,
    });
  };

  const selectMenuHandler = item => {
    navigation.navigate('List', {
      title: item.title,
      image: item.image,
    });
  };

  const id = useSelector(state => state.authReducer.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id != undefined) {
      try {
        dispatch(AuthAction.fetchProfile(id));
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(CartAction.fetchCart(id));
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : null}

      <FlatList
      showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <SlideImage />
            <SearchBar onSubmit={value => submitHandler(value)} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoryData.map((category, index) => (
                <FoodCategory
                  key={category.id}
                  item={category}
                  index={index}
                  counter={counter}
                  onSelected={() => onSelectedHandler(index, category.data)}
                />
              ))}
            </ScrollView>
            <Text style={styles.title}>Food Menu</Text>
          </View>
        )}
        numColumns={2}
        data={menuData}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <FoodMenuItem
            title={itemData.item.title}
            image={itemData.item.image}
            bgColor={itemData.item.bgColor}
            onSelectMenu={() => selectMenuHandler(itemData.item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(30, 42, 44)',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  loading: {
    position: 'absolute',
    top: 250,
    right: W / 2 - 20,
    zIndex: 1,
    opacity: 0.3,
  },
});

const categoryData = [
  {
    id: 1,
    title: 'Food',
    icon: 'food',
    data: [
      {
        id: 1,
        title: 'Pizza',
        image: require('../../../assets/images/pizza.png'),
        bgColor: 'rgb(228, 239, 222)',
      },
      {
        id: 2,
        title: 'BBQ',
        image: require('../../../assets/images/bbq.png'),
        bgColor: 'rgb(227, 227, 240)',
      },
      {
        id: 3,
        title: 'Sushi',
        image: require('../../../assets/images/sushi.png'),
        bgColor: 'rgb(219, 234, 243)',
      },
      {
        id: 4,
        title: 'Burgers',
        image: require('../../../assets/images/burger.png'),
        bgColor: 'rgb(245, 223, 212)',
      },
    ],
  },
  {
    id: 2,
    title: 'Drink',
    icon: 'food-fork-drink',
    data: [
      {
        id: 1,
        title: 'Coffee',
        image: require('../../../assets/images/sushi.png'),
        bgColor: 'rgb(228, 239, 222)',
      },
      {
        id: 2,
        title: 'Water',
        image: require('../../../assets/images/sushi.png'),
        bgColor: 'rgb(227, 227, 240)',
      },
      {
        id: 3,
        title: 'Fruit Juice',
        image: require('../../../assets/images/sushi.png'),
        bgColor: 'rgb(219, 234, 243)',
      },
      {
        id: 4,
        title: 'Cocktails',
        image: require('../../../assets/images/sushi.png'),
        bgColor: 'rgb(245, 223, 212)',
      },
      {
        id: 5,
        title: 'Fruit Juice',
        image: require('../../../assets/images/sushi.png'),
        bgColor: 'rgb(219, 234, 243)',
      },
    ],
  },
  {id: 3, title: 'Cream', icon: 'ice-cream', data: []},
  {id: 4, title: 'Fruit', icon: 'food-apple', data: []},
  {id: 5, title: 'Other', icon: 'food-variant', data: []},
];
