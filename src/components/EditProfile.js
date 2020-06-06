import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import {Colors} from '../Constrains/Colors';

const EditProfile = ({
  onOpenGallery,
  user_info,
  path,
  navigation,
  onUpdate,
  avatarLoading,
}) => {
  const [newEmail, setNewEmail] = useState(user_info.email);
  const [fullname, setFullname] = useState(user_info.fullname);
  const [gender, setGender] = useState(user_info.gender);
  const [phone, setPhone] = useState(user_info.phone);
  const [birthday, setBirthday] = useState(user_info.birthday);
  const [showGender, setShowGender] = useState(false);

  const [color, setColor] = useState('gray');
  const [counter, setCounter] = useState(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      {showGender && (
        <View style={styles.picker}>
          <TouchableOpacity
            onPress={() => setShowGender(false)}
            style={{top: 10, left: 10, width: 30}}>
            <Icon name="close" size={30} />
          </TouchableOpacity>
          <Picker
            selectedValue={gender}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              setShowGender(false);
            }}>
            <Picker.Item label="Khác" value="Khác" />
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Nữ" value="Nữ" />
          </Picker>
        </View>
      )}
      <Header
        title="EDIT"
        isCartIcon={false}
        navigation={navigation}
        iconName={null}
      />
      <TouchableOpacity onPress={onOpenGallery} style={styles.avatarBorder}>
        {avatarLoading ? (
          <ActivityIndicator size="large" style={{alignSelf: 'center'}} />
        ) : (
          <Image source={{uri: path}} style={styles.avatar} />
        )}
      </TouchableOpacity>
      <View
        style={[
          styles.inputCon,
          {borderColor: counter === newEmail ? color : 'gray'},
        ]}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          value={newEmail}
          onChangeText={newVal => {
            setNewEmail(newVal);
          }}
          onFocus={() => {
            setColor(Colors.orange);
            setCounter(newEmail);
          }}
          onSubmitEditing={() => {
            setColor('gray');
          }}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <View
        style={[
          styles.inputCon,
          {borderColor: counter === fullname ? color : 'gray'},
        ]}>
        <Text style={styles.inputTitle}>Họ và tên</Text>
        <TextInput
          value={fullname}
          onChangeText={newVal => setFullname(newVal)}
          onFocus={() => {
            setColor(Colors.orange);
            setCounter(fullname);
          }}
          onSubmitEditing={() => {
            setColor('gray');
          }}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          placeholder="Họ và tên"
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowGender(!showGender);
          setColor(Colors.orange);
          setCounter(gender);
        }}
        style={[
          styles.inputCon,
          {borderColor: counter === gender ? color : 'gray'},
        ]}>
        <Text style={styles.inputTitle}>Giới tính</Text>
        <View>
          {gender ? (
            <Text style={styles.input}>{gender}</Text>
          ) : (
            <Text style={styles.input}>Khác</Text>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={[
          styles.inputCon,
          {borderColor: counter === phone ? color : 'gray'},
        ]}>
        <Text style={styles.inputTitle}>Số điện thoại</Text>
        <TextInput
          value={phone}
          onChangeText={newVal => setPhone(newVal)}
          onFocus={() => {
            setColor(Colors.orange);
            setCounter(phone);
          }}
          onSubmitEditing={() => {
            setColor('gray');
          }}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          placeholder="Số điện thoại"
          style={styles.input}
        />
      </View>
      <View
        style={[
          styles.inputCon,
          {borderColor: counter === birthday ? color : 'gray'},
        ]}>
        <Text style={styles.inputTitle}>Ngày sinh</Text>
        <TextInput
          value={birthday}
          onChangeText={newVal => setBirthday(newVal)}
          onFocus={() => {
            setColor(Colors.orange);
            setCounter(birthday);
          }}
          onSubmitEditing={() => {
            setColor('gray');
          }}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          placeholder="Ngày sinh"
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        onPress={() => onUpdate(newEmail, fullname, gender, phone, birthday)}
        style={styles.btnUpdate}>
        <Icon name="pen" size={30} color="#FFF" />
        <Text style={styles.update}>Cập nhật</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  avatarBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 140,
    height: 140,
    borderWidth: 10,
    borderRadius: 70,
    borderColor: Colors.orange,
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 250,
    borderWidth: 3,
    borderColor: Colors.orange,
    margin: 20,
    borderRadius: 20,
  },
  avatar: {width: 110, height: 110, borderRadius: 55},
  inputCon: {
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    marginHorizontal: 15,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 30,
  },
  inputTitle: {
    position: 'absolute',
    top: -10,
    left: 30,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    borderRadius: 20,
    color: 'gray',
  },
  input: {fontSize: 16, paddingVertical: 3},
  btnUpdate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.orange,
    borderRadius: 20,
    width: 200,
  },
  update: {color: '#FFF', fontSize: 18, fontWeight: 'bold'},
});
