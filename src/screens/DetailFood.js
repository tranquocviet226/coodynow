import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Header from '../components/Header';
import {Colors} from '../Constrains/Colors';
import StarRating from '../components/StarRating';
import CurrencyFormat from '../components/CurrencyFormat';
import {useDispatch} from 'react-redux'
import * as CartAction from '../store/action/CartAction'

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const DetailFood = ({navigation, route}) => {
  const {item} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const move = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const size = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch();
  const addToCart = (item) => {
    setIsLoading(true);
    //sequence : tuần tự
    // parallel: song song
    Animated.sequence([
      Animated.parallel([
        Animated.timing(move, {
          toValue: {x: 0, y: H / 2},
          duration: 1200,
          easing: Easing.inOut(Easing.elastic(2)),
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1300,
          useNativeDriver: false,
        }),
        Animated.timing(size, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(size, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(move, {
        toValue: {x: 0, y: 0},
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      dispatch(CartAction.addToCart(item))
      setIsLoading(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} title={item.title} isCartIcon={true} iconName="heart-outline"/>
        <SharedElement id={item.id} style={styles.sharedElement}>
          <View style={styles.shadow}>
            <Animated.Image
              source={{uri: item.image}}
              style={[
                styles.image,
                {
                  opacity,
                  transform: [
                    {translateX: move.x},
                    {translateY: move.y},
                    {scale: size},
                  ],
                },
              ]}
            />
          </View>
        </SharedElement>
        <Text
          ellipsizeMode="middle"
          numberOfLines={3}
          style={[styles.title, {color: Colors.green}]}>
          {item.title.toUpperCase()}
        </Text>
        <Text style={styles.author}>with Sauteed Shrimp</Text>
        <View style={styles.content}>
          <View>
            <Text style={[styles.text, {color: '#676767'}]}>20</Text>
            <Text style={[styles.text, {color: '#d8d8d8'}]}>Mins</Text>
          </View>
          <View>
            <Text style={[styles.text, {color: '#676767'}]}>225</Text>
            <Text style={[styles.text, {color: '#d8d8d8'}]}>People</Text>
          </View>
          <StarRating rate={item.rate} />
        </View>
        <Text style={styles.price}>
          {'\u20AB'} {CurrencyFormat(item.price)}
        </Text>
        <Text
          style={[
            styles.author,
            {color: '#a6a6a6', textAlign: 'justify', marginHorizontal: 15},
          ]}>
          Something in the way she moves Attracts me like no other lover
          Something in the way she woos me, I don't want to leave her now You
          know I believe and how.
        </Text>
        <TouchableOpacity
          disabled={isLoading ? true : false}
          onPress={() => addToCart(item)}
          style={styles.btnCon}>
          {isLoading ? (
            <ActivityIndicator
              size={28}
              color= "#FFF"
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          ) : (
            <Text style={styles.textOrder}>ADD TO CARD</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailFood;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f7f7f7'},
  sharedElement: {alignItems: 'center', marginVertical: 20},
  shadow: {
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  image: {
    width: (W * 2) / 3,
    height: (W * 2) / 3,
    borderRadius: W / 3,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  author: {
    color: '#cccdcc',
    letterSpacing: 2,
    fontSize: 18,
    textAlign: 'center',
  },
  price: {
    letterSpacing: 2,
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingBottom: 20,
    paddingRight: 20,
  },
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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    letterSpacing: 2,
  },
  btnCon: {
    marginTop: 50,
    marginBottom: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: Colors.green,
    width: '80%',
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  textOrder: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 23,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
