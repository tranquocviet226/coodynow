import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Header from '../components/Header';
import {Colors} from '../Constrains/Colors';
import StarRating from '../components/StarRating';

const W = Dimensions.get('window').width;

const DetailFood = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} title={item.title}/>
        <SharedElement id={item.id} style={styles.sharedElement}>
          <View style={styles.shadow}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
        </SharedElement>
        <Text ellipsizeMode="middle" numberOfLines={3} style={[styles.title, {color: Colors.green}]}>
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
        <Text
          style={[
            styles.author,
            {color: '#a6a6a6', textAlign: 'justify', marginHorizontal: 15},
          ]}>
          Something in the way she moves Attracts me like no other lover
          Something in the way she woos me, I don't want to leave her now You
          know I believe and how.
        </Text>
        <TouchableOpacity style={styles.btnCon}>
          <Text style={styles.textOrder}>ADD TO CARD</Text>
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
    padding: 15,
    borderRadius: 20,
    backgroundColor: Colors.green,
    width: '80%',
    alignSelf: 'center',
  },
  textOrder: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 23,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
