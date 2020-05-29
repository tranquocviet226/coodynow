import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Easing,
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

const CardHorizontal = ({item, onSelectFood, onAddToCart}) => {
  const randomColor = Math.floor(Math.random() * colors.length);
  const [isLoading, setIsLoading] = useState(false);
  const size = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const addToCart = () => {
    setIsLoading(true);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(size, {
          toValue: 0.3,
          easing: Easing.back(),
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(size, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsLoading(false);
      onAddToCart();
    });
  };
  return (
    <View
      style={[styles.cardContainer, {backgroundColor: colors[randomColor]}]}>
      <TouchableOpacity onPress={onSelectFood} style={styles.imgShadow}>
        <SharedElement id={item.id}>
          <Animated.Image
            source={{uri: item.image}}
            style={[
              styles.cardImg,
              {
                opacity,
                transform: [{scale: size}],
              },
            ]}
          />
        </SharedElement>
      </TouchableOpacity>
      <Text ellipsizeMode="tail" numberOfLines={2} style={styles.cardTitle}>
        {item.title}
      </Text>
      <StarRating rate={Math.round(item.rate)} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardPrice}>
        {'\u20AB'} {CurrencyFormat(item.price)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={addToCart}
          disabled={isLoading ? true : false}
          style={styles.btn}>
          {isLoading ? (
            <ActivityIndicator size={17} />
          ) : (
            <Text style={styles.txtBtn}>Buy</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onSelectFood} style={styles.btn}>
          <Text style={styles.txtBtn}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardHorizontal;

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    height: 250,
    margin: 8,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  imgShadow: {
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    borderRadius: 45,
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  cardTitle: {
    width: 150,
    textAlign: 'center',
    fontWeight: '700',
  },
  cardPrice: {
    width: 150,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
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
