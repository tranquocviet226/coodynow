import React from 'react';
import {
  StyleSheet,
  Text,
  YellowBox,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import * as AuthAction from '../store/action/AuthAction';
import * as CartAction from '../store/action/CartAction';
import {Colors} from '../Constrains/Colors';
import ListItemProfile from '../components/ListItemProfile';
import LinearGradient from 'react-native-linear-gradient';
import RequireLogin from '../components/RequireLogin';

const W = Dimensions.get('window').width;
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

const ProfileScreen = ({navigation}) => {
  const user_info = useSelector(state => state.authReducer.user_info);

  const dispatch = useDispatch();
  const onSignoutHandle = () => {
    dispatch(AuthAction.signOut());
    // dispatch(CartAction.cleanCart());
    navigation.replace('Login');
  };

  const selectHandle = key => {
    navigation.navigate('Modal', {
      key: key,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <LinearGradient
        colors={['#ffbbdc', '#ffbbdc', '#ffbbdc', '#7ae1f2']}
        style={styles.cardBg}
      />
      {user_info != null ? (
        <SafeAreaView style={styles.cardCon}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Modal', {
                key: 'edit',
              });
            }}
            style={styles.avatarBorder}>
            <Image source={{uri: user_info.image}} style={styles.avatar} />
            <Icon
              name="circle-edit-outline"
              size={30}
              color="gray"
              style={{position: 'absolute', right: 0, bottom: 0}}
            />
          </TouchableOpacity>
          <Text style={{paddingTop: 10, fontSize: 16, color: 'gray'}}>
            {user_info.fullname}
          </Text>
          <Text style={{fontSize: 16, color: 'gray'}}>{user_info.email}</Text>
          {items.map(item => (
            <ListItemProfile
              key={item.id}
              item={item}
              onSelect={() => selectHandle(item.key)}
            />
          ))}
          <TouchableOpacity
            onPress={() => onSignoutHandle()}
            style={styles.logoutBtn}>
            <Icon name="logout" size={25} color="#FFF" />
            <Text style={styles.logout}>Log out</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
          <RequireLogin onGoToLogin={() => onSignoutHandle()} />
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  cardBg: {
    position: 'absolute',
    height: W * 2,
    width: W * 2,
    backgroundColor: Colors.green,
    borderRadius: W,
    left: -W / 2,
    top: -((W * 5) / 4),
  },
  cardHeader: {
    paddingTop: 35,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderWidth: 20,
    borderRadius: 60,
    borderColor: Colors.orange,
  },
  cardCon: {padding: 10, alignItems: 'center'},
  avatar: {width: 100, height: 100, borderRadius: 50},
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginVertical: 15,
    padding: 10,
    backgroundColor: Colors.orange,
    borderRadius: 10,
  },
  logout: {fontSize: 18, fontWeight: 'bold', color: '#FFF'},
});

const items = [
  {id: 1, title: 'Đơn đặt hàng', icon: 'clipboard-text-outline', key: 'order'},
  {id: 2, title: 'Hoá đơn ', icon: 'cash-usd', key: 'bill'},
  {id: 3, title: 'Sản phẩm đã mua', icon: 'cart', key: 'product'},
  {id: 4, title: 'Sản phẩm yêu thích', icon: 'heart', key: 'favorite'},
  {id: 5, title: 'Lịch sử tin nhắn', icon: 'forum', key: 'message'},
];
