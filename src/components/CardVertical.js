import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import StarRating from '../components/StarRating';
import {SharedElement} from 'react-navigation-shared-element';

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

const CardVertical = ({item, onSelectFood}) => {
  const randomColor = Math.floor(Math.random() * colors.length);
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.bgImg, {backgroundColor: colors[randomColor]}]}>
        <TouchableOpacity onPress={onSelectFood} style={styles.imgCon}>
          <SharedElement id={item.id}>
            <Image source={{uri: item.image}} style={styles.cardImg} />
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
          {'\u20AB'} {item.price}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.txtBtn}>Buy</Text>
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
    elevation: 5,
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
