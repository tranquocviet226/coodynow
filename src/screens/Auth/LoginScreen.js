import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Signin from '../../components/Signin';
import Signup from '../../components/Signup';
import FBLoginButton from '../../components/FBLoginButton';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import * as AuthAction from '../../store/action/AuthAction';

const LoginScreen = ({navigation}) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const switchSignUp = () => {
    setIsSignup(prev => !prev);
  };

  const dispatch = useDispatch();

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '1094780278424-abi3g4iqiatn4ua0r6aek420l1lns75t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId:
      '1094780278424-hc47i2jsq9p6jjqqdnriau9tga79orfr.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  const googleSignInHandle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      try {
        dispatch(
          AuthAction.checkEmail(
            userInfo.user.email,
            userInfo.user.name,
            userInfo.user.photo,
          ),
        );
      } catch (error) {}

      navigation.replace('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google play not available');
      } else {
        console.log(error);
      }
    }
  };

  const signInHandle = async (email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(AuthAction.signIn(email, password));
      navigation.replace('Home');
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const signUpHandle = async (
    email,
    password,
    passwordConfirmation,
    fullname,
    phone,
    birthday,
  ) => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        AuthAction.signUp(
          email,
          password,
          passwordConfirmation,
          fullname,
          phone,
          birthday,
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Replace_this_image_female.svg/1200px-Replace_this_image_female.svg.png',
        ),
      );
      switchSignUp();
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => navigation.replace('Home')}
          style={styles.btnSkip}>
          <Text>Skip</Text>
          <Icon name="chevron-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../../../assets/images/loginBg.png')}
          style={styles.bg}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <Image
              source={require('../../../assets/images/Landing.png')}
              style={styles.landing}
            />
            {isSignup ? (
              <Signup
                onSignUp={(
                  email,
                  password,
                  passwordConfirmation,
                  fullname,
                  phone,
                  birthday,
                ) =>
                  signUpHandle(
                    email,
                    password,
                    passwordConfirmation,
                    fullname,
                    phone,
                    birthday,
                  )
                }
                navigation={navigation}
                isSignup={() => switchSignUp()}
                isLoading={isLoading}
              />
            ) : (
              <View>
                <Signin
                  navigation={navigation}
                  isSignup={() => switchSignUp()}
                  isLoading={isLoading}
                  onSignIn={(email, password) => signInHandle(email, password)}
                />
                <View style={styles.btnCon}>
                  <FBLoginButton navigation={navigation} />
                  <GoogleSigninButton
                    style={{width: '40%', height: 40}}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleSignInHandle()}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    resizeMode: 'stretch',
  },
  btnSkip: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 35 : 20,
    width: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  landing: {
    width: '50%',
    height: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
});
