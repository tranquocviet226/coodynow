import React, {useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import * as AuthAction from '../../store/action/AuthAction';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const getToken = await AsyncStorage.getItem('userToken');
        if (getToken != null) {
          const transformData = JSON.parse(getToken);
          const {token, id} = transformData;
          dispatch(AuthAction.authenticate(token, id));
          navigation.replace('Home');
          return;
        }
        navigation.replace('Login');
      } catch (error) {
        console.log(error);
      }
    };
    tryLogin();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
