import {
  CHILD_LOGIN,
  CLEAR_AUTH_STATE,
  FORGOT_PASSWORD,
  LOGIN,
  LOGIN_FAILED,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
} from '../types/types';

const initial_state = {
  user: {},
  error: {},
  isLoggedIn: false,
  childLoggedIn: false,
  isEmailVerified: false,
};

export const authReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case CHILD_LOGIN:
      return {
        ...state,
        childLoggedIn: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        user: payload,
        isLoggedIn: false,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        user: payload,
        isEmailVerified: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_AUTH_STATE:
      return {
        isLoggedIn: false,
        isEmailVerified: false,
      };

    default:
      return {...state};
  }
};
