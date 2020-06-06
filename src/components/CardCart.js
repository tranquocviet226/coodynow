import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import {Colors} from '../Constrains/Colors';

const W = Dimensions.get('window').width;
const CardCart = ({item, onIncrease, onDecrease}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgCon}>
        <TouchableOpacity style={styles.imgTouch}>
          <Image source={{uri: item.image}} style={styles.img} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.price}>
          {'\u20AB'} {CurrencyFormat(item.price)}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <View
          style={[styles.btnCon, {marginTop: Platform.OS === 'ios' ? 5 : -10}]}>
          <TouchableOpacity onPress={onDecrease} style={styles.btnTouch}>
            <Text style={styles.btnTxt}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTouch}>
            <TextInput
              style={styles.txtInput}
              value={item.quantity.toFixed(0)}
              // onChangeText={newVal => setQuantity(newVal)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrease} style={styles.btnTouch}>
            <Text style={styles.btnTxt}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgCon: {
    width: W / 3,
    height: W / 3,
    backgroundColor: '#ecf0f3',
    borderRadius: 20,
    elevation: 8,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  imgTouch: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: W / 3 + 10,
    height: W / 3 + 10,
    borderRadius: W / 6 + 5,
    borderWidth: 10,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 3,
    backgroundColor: '#ecf0f3',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: W / 6,
    resizeMode: 'cover',
  },
  content: {width: W / 2, justifyContent: 'center', margin: 5},
  price: {fontSize: 19, fontWeight: 'bold', color: Colors.orange},
  title: {fontWeight: 'bold', fontSize: 16, marginVertical: 10},
  btnCon: {flexDirection: 'row', alignItems: 'center'},
  btnTouch: {
    elevation: 3,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  btnTxt: {
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 30,
    backgroundColor: '#ecf0f3',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  txtInput: {
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    minWidth: 30,
    maxWidth: W / 3 - 50,
    backgroundColor: '#ecf0f3',
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 5,
  },
});
