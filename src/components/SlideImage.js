import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {Colors} from '../Constrains/Colors';

const W = Dimensions.get('window').width;
const images = [
  require('../../assets/images/burger.png'),
  require('../../assets/images/sushi.png'),
  require('../../assets/images/pizza.png'),
  require('../../assets/images/bbq.png'),
];

// let flatlist;
// const ifiniteScroll = datalist => {
//   const numbberOfData = datalist.length;
//   let scrollValue = 0;
//   let scrolled = 0;

//   setInterval(() => {
//     scrolled++;
//     if (scrolled < numbberOfData) scrollValue = scrollValue + W;
//     else {
//       scrollValue = 0;
//       scrolled = 0;
//     }
//     this.flatlist.scrollToOffset({animated: true, offset: scrollValue});
//   }, 3000);
// };

const SlideImage = () => {
  const scrollX = new Animated.Value(0);
  // const [dataList, setDataList] = useState(images);

  // useEffect(() => {
  //   setDataList(images);
  //   ifiniteScroll(dataList);
  // });
  //   const position = Animated.divide(scrollX, W);
  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <FlatList
          // ref={flatlist => {
          //   this.flatlist = flatlist;
          // }}
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={{width: W, height: 250}} key={index}>
              <Image source={item} style={styles.card} />
              {/* <View style={styles.textContainer}>
              <Text style={styles.infoText}>{'Image ' + index}</Text>
            </View> */}
            </View>
          )}
          style={styles.scrollViewStyle}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
        />
        <View style={styles.indicatorContainer}>
          {images.map((img, index) => {
            let cl = Animated.divide(scrollX, W).interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: ['lightblue', Colors.orange, 'lightblue'],
              extrapolate: 'clamp',
            });
            let wid = scrollX.interpolate({
              inputRange: [W * (index - 1), W * index, W * (index + 1)],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.normalDot, {backgroundColor: cl, width: wid}]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default SlideImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContainer: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: 250,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    bottom: 10,
    justifyContent: 'center',
  },
});
