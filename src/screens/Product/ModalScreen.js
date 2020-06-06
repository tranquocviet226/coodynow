import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import io from 'socket.io-client';
import Header from '../../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import * as AuthReducer from '../../store/action/AuthAction';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfile from '../../components/EditProfile';

const socket = io('http://172.16.39.236:3000');

const ModalScreen = ({route, navigation}) => {
  const {key} = route.params;
  //-----------------EDIT
  if (key === 'edit') {
    const user_info = useSelector(state => state.authReducer.user_info);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);

    const [path, setPath] = useState(user_info.image);
    const openGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          let newImage = {
            uri: image.path,
            type: image.mime,
            name: image.filename,
          };
          setAvatarLoading(true);
          uploadImageHandle(newImage);
        })
        .catch(err => {
          console.log(err);
        });

      const uploadImageHandle = image => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'order_food');
        data.append('cloud_name', 'employeern');
        fetch('https://api.cloudinary.com/v1_1/employeern/image/upload', {
          method: 'POST',
          body: data,
        })
          .then(res => res.json())
          .then(data => {
            setPath(data.url);
            setAvatarLoading(false);
          })
          .catch(err => {
            console.log(err);
            setAvatarLoading(false);
          });
      };
    };

    const dispatch = useDispatch();
    const updateHandle = async (
      newEmail,
      fullname,
      gender,
      phone,
      birthday,
    ) => {
      setAvatarLoading(true);
      try {
        setError(null);
        await dispatch(
          AuthReducer.updateUser(
            user_info.id,
            user_info.email,
            newEmail,
            user_info.password,
            fullname,
            gender,
            phone,
            birthday,
            path,
          ),
        );
        setAvatarLoading(false);
        Alert.alert('Thành công', "Cập nhật thông tin thành công", [{text: 'Okay'}]);
      } catch (error) {
        setError(error.message);
        setAvatarLoading(false);
      }
    };

    useEffect(() => {
      dispatch(AuthReducer.fetchProfile(user_info.id));
    }, []);

    useEffect(() => {
      if (error) {
        Alert.alert('Error!', error, [{text: 'Okay'}]);
      }
    }, [error]);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f7f7f7'}}>
        {isLoading ? (
          <ActivityIndicator size="large" style={{alignSelf: 'center'}} />
        ) : (
          <EditProfile
            onOpenGallery={() => openGallery()}
            user_info={user_info}
            path={path}
            navigation={navigation}
            avatarLoading={avatarLoading}
            onUpdate={(newEmail, fullname, gender, phone, birthday) =>
              updateHandle(newEmail, fullname, gender, phone, birthday)
            }
          />
        )}
      </SafeAreaView>
    );
  }
  //-----------------ORDER
  if (key === 'order') {
    return (
      <SafeAreaView>
        <View>
          <Text>ORDER</Text>
        </View>
      </SafeAreaView>
    );
  }
  //------------------ BILL
  if (key === 'bill') {
    return (
      <SafeAreaView>
        <View>
          <Text>BILL</Text>
        </View>
      </SafeAreaView>
    );
  }
  //---------------- MESSAGE
  if (key === 'message') {
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    useEffect(() => {
      socket.on('Chat message', msg => {
        setChatMessages([...chatMessages, msg]);
      });
    }, [chatMessages]);

    const submitChatMessage = () => {
      socket.emit('Chat message', chatMessage);
      setChatMessage('');
    };
    return (
      <SafeAreaView>
        <Header
          title="MESSAGE"
          isCartIcon={true}
          navigation={navigation}
          iconName={null}
        />
        <TextInput
          value={chatMessage}
          autoCorrect={false}
          onChangeText={newMess => setChatMessage(newMess)}
          onSubmitEditing={() => submitChatMessage()}
          style={{
            borderWidth: 1,
            padding: 15,
            backgroundColor: '#FFF',
            borderRadius: 20,
            marginBottom: 10,
          }}
        />
        {chatMessages.map(mess => (
          <View
            key={mess}
            style={{borderWidth: 1, borderRadius: 20, padding: 10}}>
            <Text>{mess}</Text>
          </View>
        ))}
      </SafeAreaView>
    );
  }
  return (
    <View>
      <Text>Model</Text>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({});
