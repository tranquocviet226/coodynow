import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import Header from './Header';
import moment from 'moment';
import CurrencyFormat from './CurrencyFormat';

export default function Invoice({orders, navigation, isShow, showDetail, counter}) {
  return (
    <View style={{flex: 1}}>
      <Header title="HOÁ ĐƠN" navigation={navigation} isCartIcon={true} />
      <FlatList
        data={orders}
        keyExtractor={item => item._id}
        renderItem={itemData => (
          <TouchableOpacity onPress={() => showDetail(itemData.item._id)} style={styles.invoiceCon}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.index}>
                <Text style={styles.indexTxt}>#0{itemData.index + 1}</Text>
              </View>

              <View>
                <Text style={styles.total}>
                  {'\u20AB'} {CurrencyFormat(itemData.item.total)}
                </Text>
                <Text style={{color: 'gray'}}>
                  {moment(itemData.item.date).format('LLL')}
                </Text>
              </View>
            </View>
            {isShow && counter === itemData.item._id &&
              itemData.item.items.map(it => (
                <View key={it.key} style={styles.itemDetail}>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {it.title}
                  </Text>
                  <View>
                    <Text style={styles.price}>
                      {CurrencyFormat(it.price)} {'\u20AB'}
                    </Text>
                    <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
                      {it.quantity}
                    </Text>
                  </View>
                </View>
              ))}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  invoiceCon: {
    flex: 1,
    padding: 20,
    margin: 10,
    borderRadius: 20,
    borderColor: 'gray',
    backgroundColor: '#FFF',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  index: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#ff8788',
    marginRight: 20,
  },
  indexTxt: {fontWeight: 'bold', color: '#FFF', fontSize: 18},
  total: {fontSize: 18, fontWeight: 'bold', marginBottom: 5},
  itemDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 5,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  price: {textAlign: 'right', fontSize: 16, fontWeight: '500', marginBottom: 5},
});
