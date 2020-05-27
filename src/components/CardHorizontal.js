import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
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

const CardHorizontal = ({item, onSelectFood}) => {
  const randomColor = Math.floor(Math.random() * colors.length);
  return (
    <View style={[styles.cardContainer, {backgroundColor: colors[randomColor]}]}>
      <TouchableOpacity onPress={onSelectFood}>
        <SharedElement id={item.id}>
          <Image source={{uri: item.image}} style={styles.cardImg} />
        </SharedElement>
      </TouchableOpacity>
      <Text ellipsizeMode="tail" numberOfLines={2} style={styles.cardTitle}>
        {item.title}
      </Text>
      <StarRating rate={Math.round(item.rate)} />
      <Text  ellipsizeMode="tail" numberOfLines={1}  style={styles.cardPrice}>
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
    shadowColor: "gray",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover"
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
    textAlign:'center'
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
