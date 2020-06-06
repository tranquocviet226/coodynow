import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Signin = ({navigation, isSignup, onSignIn, isLoading}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoAnimated = useRef(new Animated.Value(0)).current;
  Animated.spring(logoAnimated, {
    toValue: 1,
    tension: 2,
    friction: 0.5,
    delay: 500,
    useNativeDriver: false,
  }).start();
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
        }}
      />
      <View style={styles.inputCon}>
        <Icon name="email" size={30} color="gray" />
        <TextInput
          value={email}
          onChangeText={newVal => setEmail(newVal)}
          autoCapitalize="none"
          placeholder="E-mail"
          style={styles.input}
        />
      </View>
      <View style={styles.inputCon}>
        <Icon name="lock" size={30} color="gray" />
        <TextInput
          value={password}
          onChangeText={newVal => setPassword(newVal)}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          style={styles.input}
        />
      </View>
      <View style={[styles.btnCon]}>
        <Animated.View
          style={{
            width: '70%',
            left: logoAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          }}>
          <TouchableOpacity
            onPress={() => onSignIn(email, password)}
            style={styles.btnTouch}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnTxt}>LOGIN</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.signupCon,
            {
              top: logoAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: [-5, 0],
              }),
            },
          ]}>
          <Text style={{}}>Don't have a account?</Text>
          <TouchableOpacity onPress={isSignup}>
            <Text style={{color: '#299889'}}> Sign up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.2)',
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
