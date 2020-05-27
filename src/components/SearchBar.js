import React, {useRef, useState} from 'react';
import {
  View,
  Animated,
  TextInput,
  Dimensions,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const W = Dimensions.get('window').width;

const SearchBar = ({onSubmit}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [widVal, setWidVal] = useState(50);
  const width = useRef(new Animated.Value(widVal)).current;
  const searchHandler = () => {
    if (isSearch) {
      setSearchValue('');
      Animated.timing(width, {
        toValue: 50,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setWidVal(50);
        setIsSearch(false);
      });
    } else {
      setIsSearch(true);
      Animated.timing(width, {
        toValue: W - 20,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setWidVal(W - 20);
      });
    }
  };
  return (
    <View style={styles.container}>
      {isSearch ? (
        <View />
      ) : (
        <View style={styles.imgCon}>
          <Image
            source={{
              uri:
                'https://brasol.vn/public/ckeditor/uploads/tin-tuc/brasol.vn-logo-instargram-logo-instagram-vector.png',
            }}
            style={styles.img}
          />
          <Text style={styles.txtLogo}>COODY NOW</Text>
        </View>
      )}

      <Animated.View style={[styles.animatedCon, {width: width}]}>
        <TextInput
          placeholder="Type something..."
          placeholderTextColor="gray"
          value={searchValue}
          onChangeText={newVal => setSearchValue(newVal)}
          onSubmitEditing={() => onSubmit(searchValue)}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          autoCompleteType="off"
          style={styles.input}
        />
        <Icon
          name={isSearch ? 'close' : 'magnify'}
          size={30}
          color="black"
          style={styles.searchIcon}
          onPress={() => searchHandler()}
        />
      </Animated.View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgCon: {paddingLeft: 20, flexDirection: 'row', alignItems: 'center'},
  img: {width: 40, height: 40},
  txtLogo: {paddingLeft: 10, fontSize: 18},
  animatedCon: {
    backgroundColor: 'rgba(243, 243, 243, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 40,
    borderRadius: 40,
    overflow: 'hidden',
    margin: 10,
  },
  input: {paddingLeft: 10, paddingRight: 50, width: '90%', color: 'black'},
  searchIcon: {position: 'absolute', width: 50, right: -10},
});
