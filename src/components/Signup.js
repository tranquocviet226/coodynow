import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Signin = ({isLoading, isSignup, onSignUp}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  return (
    <View style={styles.content}>
      <Image
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
      <View style={styles.inputCon}>
        <Icon name="lock" size={30} color="gray" />
        <TextInput
          value={passwordConfirmation}
          onChangeText={newVal => setPasswordConfirmation(newVal)}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Confirm Password"
          style={styles.input}
        />
      </View>
      <View style={styles.inputCon}>
        <Icon name="account" size={30} color="gray" />
        <TextInput
          value={fullname}
          onChangeText={newVal => setFullname(newVal)}
          placeholder="Full name"
          style={styles.input}
        />
      </View>
      <View style={styles.inputCon}>
        <Icon name="phone" size={30} color="gray" />
        <TextInput
          value={phone}
          onChangeText={newVal => setPhone(newVal)}
          autoCapitalize="none"
          placeholder="Phone number"
          style={styles.input}
        />
      </View>
      <View style={styles.inputCon}>
        <Icon name="calendar" size={30} color="gray" />
        <TextInput
          value={birthday}
          onChangeText={newVal => setBirthday(newVal)}
          autoCapitalize="none"
          placeholder="Birthday"
          style={styles.input}
        />
      </View>
      <View style={[styles.btnCon]}>
        <View style={{width: '70%'}}>
          <TouchableOpacity
            onPress={() =>
              onSignUp(
                email,
                password,
                passwordConfirmation,
                fullname,
                phone,
                birthday,
              )
            }
            style={styles.btnTouch}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnTxt}>SIGN UP</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.signupCon}>
          <Text style={{}}>Do you have a account?</Text>
          <TouchableOpacity onPress={isSignup}>
            <Text style={{color: '#299889'}}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
