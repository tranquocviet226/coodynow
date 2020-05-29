import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Easing,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import StarRating from '../components/StarRating';
import {SharedElement} from 'react-navigation-shared-element';
import CurrencyFormat from './CurrencyFormat';

const colors = [
  '#f5dfd4',
  '#dbeaf3',
  '#e4efde',
  '#e3e3f0',
  '#fdceb7',
  '#dbe2d0',
  '#d6d8ff',
  '#fbe5e7',
  '#fff3eb',
  '#ffccb7',
];
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const CardVertical = ({item, onSelectFood, onAddToCart}) => {
  const randomColor = Math.floor(Math.random() * colors.length);
  const [isLoading, setIsLoading] = useState(false);

  const move = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const size = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const addToCart = () => {
    setIsLoading(true);
    //sequence : tuần tự
    // parallel: song song
    Animated.sequence([
      Animated.parallel([
        Animated.timing(move, {
          toValue: {x: -20, y: -20},
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(size, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.back(),
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
      onAddToCart();
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.bgImg, {backgroundColor: colors[randomColor]}]}>
        <TouchableOpacity onPress={onSelectFood} style={styles.imgCon}>
          <SharedElement id={item.id}>
            <Animated.Image
              source={{uri: item.image}}
              style={[
                styles.cardImg,
                {
                  top: move.y,
                  right: move.x,
                  opacity,
                  transform: [{scale: size}],
                },
              ]}
            />
          </SharedElement>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={onSelectFood}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.cardTitle}>
            {item.title}
          </Text>
        </TouchableOpacity>
        <StarRating rate={Math.round(item.rate)} />
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardPrice}>
          {'\u20AB'} {CurrencyFormat(item.price)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isLoading ? true : false}
            onPress={addToCart}
            style={styles.btn}>
            {isLoading ? (
              <ActivityIndicator size={17} color="#FFF" />
            ) : (
              <Text style={styles.txtBtn}>Buy</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelectFood} style={styles.btn}>
            <Text style={styles.txtBtn}>More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardVertical;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 160,
    flexDirection: 'row',
    paddingTop: 23,
    margin: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  bgImg: {width: 130, height: 130, borderRadius: 20, marginRight: 30},
  imgCon: {
    position: 'absolute',
    top: -20,
    right: -10,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  cardImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  cardTitle: {
    width: 150,
    textAlign: 'center',
    fontWeight: '700',
  },
  cardPrice: {
    width: W / 2 - 30,
    fontSize: 19,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    width: '100%',
    justifyContent: 'space-between',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(251, 108, 37, 0.8)',
    borderRadius: 10,
    width: 60,
  },
  txtBtn: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
