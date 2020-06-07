const URL = 'http://172.16.39.236:3000';
import AsyncStorage from '@react-native-community/async-storage';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const USER_INFO = 'USER_INFO';
export const UPDATE = 'UPDATE';

export const authenticate = (token, id) => {
  return {
    type: AUTHENTICATE,
    token: token,
    id: id,
  };
};

export const checkEmail = (email, fullname, image) => {
  return async dispatch => {
    const password = Math.floor(Math.random() * 100000) + 100000;

    const response = await fetch(`${URL}/checkEmail`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email}),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(authenticate(json.accessToken, json.id));
      saveDataToStorage(json.accessToken, json.id);
      return;
    }

    dispatch(signUp(email, password, password, fullname, '', '', image));
  };
};

export const signUp = (
  email,
  password,
  passwordConfirmation,
  fullname,
  phone,
  birthday,
  image,
) => {
  return async dispatch => {
    const response = await fetch(`${URL}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        fullname: fullname,
        phone: phone,
        birthday: birthday,
        image: image,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error(errorResData[0]);
    }
    const json = await response.json();

    dispatch(authenticate(json.accessToken, json.id));
    saveDataToStorage(json.accessToken, json.id);
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    const response = await fetch(`${URL}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error(errorResData[0]);
    }
    const json = await response.json();

    dispatch(authenticate(json.accessToken, json.id));
    saveDataToStorage(json.accessToken, json.id);
  };
};

export const signOut = () => {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: SIGN_OUT,
    });
  };
};

export const fetchProfile = id => {
  return async dispatch => {
    const response = await fetch(`${URL}/profile`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error('Lỗi');
    }

    dispatch({
      type: USER_INFO,
      id: json._id,
      email: json.email,
      password: json.password,
      fullname: json.fullname,
      gender: json.gender,
      phone: json.phone,
      birthday: json.birthday,
      image: json.image,
    });
  };
};

export const updateUser = (
  id,
  email,
  newEmail,
  password,
  fullname,
  gender,
  phone,
  birthday,
  image,
) => {
  return async dispatch => {
    const response = await fetch(`${URL}/update`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        email: email,
        newEmail: newEmail,
        fullname: fullname,
        gender: gender,
        phone: phone,
        birthday: birthday,
        image: image,
      }),
    });

    const json = await response.json();

    console.log(response);
    console.log(json);
    if (!response.ok) {
      throw new Error(json[0]);
    }

    dispatch({
      type: USER_INFO,
      id: id,
      email: newEmail,
      password: password,
      fullname: fullname,
      gender: gender,
      phone: phone,
      birthday: birthday,
      image: image,
    });
  };
};

const saveDataToStorage = async (token, id) => {
  try {
    await AsyncStorage.setItem(
      'userToken',
      JSON.stringify({token: token, id: id}),
    );
  } catch (error) {}
};
