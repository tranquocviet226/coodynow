import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

const FBLoginButton = ({navigation}) => {
  return (
    <View style={{width: '40%', height: 35}}>
      <LoginButton
      style={{height: '100%'}}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              navigation.navigate('Home');
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  );
};

export default FBLoginButton;

const styles = StyleSheet.create({});
