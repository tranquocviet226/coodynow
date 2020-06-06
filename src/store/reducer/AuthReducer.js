import {USER_INFO, AUTHENTICATE, SIGN_OUT} from '../action/AuthAction';
const initialState = {
  token: null,
  id: null,
  user_info: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        id: action.id,
      };
    case SIGN_OUT:
      return initialState;
    case USER_INFO:
      return {
        ...state,
        user_info: {
          id: action.id,
          email: action.email,
          password: action.password,
          fullname: action.fullname,
          gender: action.gender,
          phone: action.phone,
          birthday: action.birthday,
          image: action.image,
        },
      };
    default:
      return state;
  }
};
