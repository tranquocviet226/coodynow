import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions,
  Easing
} from 'react-native';

const W = Dimensions.get('window').width;

const RequireLogin = ({onGoToLogin}) => {
  const logoAnimated = useRef(new Animated.Value(0)).current;
  Animated.spring(logoAnimated, {
    toValue: 1,
    tension: 2,
    friction: 0.5,
    delay: 500,
    useNativeDriver: false,
  }).start();

  const randomAnim = useRef(new Animated.Value(0)).current;
  const anim = () => {
    Animated.timing(randomAnim, {
      toValue: W/2,
      duration: 5000,
      easing: Easing.bezier(0, 2, 1, -1),
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(randomAnim, {
        toValue: -W/2,
        duration: 5000,
        easing: Easing.bezier(0, 2, 1, -1),
        useNativeDriver: false,
      }).start(() => {
        anim(0);
      });
    });
  };

  useEffect(() => {
    anim();
  }, []);

  return (
    <Animated.View
      style={[
        styles.content,
        {
          top: logoAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [-5, 0],
          }),
        },
      ]}>
      <Animated.Image
        source={require('../../assets/images/Logo.png')}
        style={{
          width: '40%',
          height: 70,
          resizeMode: 'stretch',
          transform: [{translateX: randomAnim}],
        }}
      />
      <View style={[styles.btnCon]}>
        <Image
          source={require('../../assets/images/Landing.png')}
          style={{
            width: '50%',
            height: 200,
            marginVertical: 20,
            resizeMode: 'stretch',
          }}
        />
        <Text
          style={{
            fontSize: 18,
            color: 'gray',
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Vui lòng đăng nhập hoặc đăng kí để sử dụng toàn bộ tính năng
        </Text>
        <Animated.View
          style={{
            width: '70%',
            left: logoAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          }}>
          <TouchableOpacity onPress={onGoToLogin} style={styles.btnTouch}>
            <Text style={styles.btnTxt}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default RequireLogin;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    paddingVertical: 5,
  },
  inputCon: {
    flexDirection: 'row',
    margin: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  input: {minWidth: '70%', paddingHorizontal: 10, fontSize: 16},
  btnCon: {width: '100%', alignItems: 'center', marginTop: 10},
  btnTouch: {
    backgroundColor: '#299889',
    padding: 10,
    width: '100%',
    borderRadius: 7,
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  signupCon: {flexDirection: 'row', marginVertical: 10},
});
