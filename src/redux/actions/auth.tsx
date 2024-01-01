import axios from 'axios';

import {
  CHILD_LOGIN,
  CLEAR_AUTH_STATE,
  FORGOT_PASSWORD,
  LOGIN,
  LOGIN_FAILED,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
} from '../types/types';
import getRoute from '../../helper/ApiUrls';
import * as RootNavigation from '../../navigation/RootNavigator';
import {postRequest} from '../../helper/ApiHelper';
import {ToastMessage} from '../../utils/toastMessage';
import {clearLoadingAction, loadingAction} from './loading';
import {
  getItemFromAsyncStorage,
  removeItemFromAsyncStorage,
  saveItemInAsyncStorage,
} from '../../utils/storage/asyncStorage';
import {saveUserListInAsyncStorage} from '../../utils/storage/saveUserList';

export const checkUserLoginAction = () => async (dispatch: any) => {
  const token = await getItemFromAsyncStorage('token');
  if (token) {
    dispatch({
      type: LOGIN,
    });
  } else
    dispatch({
      type: LOGIN_FAILED,
    });
};

export const logInAction =
  (serialNo: string, password: string, organization_id: any) =>
  async (dispatch: any) => {
    dispatch(loadingAction());
    const loginRoute = getRoute('login');

    postRequest(loginRoute, {
      serial_no: serialNo,
      password: password,
      organization_id: organization_id,
    })
      .then(async response => {
        const userData = {
          token: response?.data?.token,
          user_id: response?.data?.user_id,
          serial_no: response?.data?.user?.serial_no,
          profileImage: response?.data?.user?.profile_photo_path,
        };
        await saveUserListInAsyncStorage(userData);
        console.log('response?.data?.user_role', response?.data?.user_role);
        await saveItemInAsyncStorage('user_role', response?.data?.user_role);
        await saveItemInAsyncStorage('token', response?.data?.token);
        await saveItemInAsyncStorage('parentToken', response?.data?.token);
        dispatch({
          type: LOGIN,
        });
        dispatch(clearLoadingAction());
      })
      .catch((error: any) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        dispatch(clearLoadingAction());
        console.log('Error while Login User ==> ', error);
        ToastMessage('Invalid Credentials', 3000);
      });
  };

export const ParentChildlogInAction =
  (child_id: string) => async (dispatch: any) => {
    dispatch(loadingAction());
    const loginRoute = getRoute('login');

    postRequest(loginRoute, {
      child_id: child_id,
    })
      .then(async response => {
        const userData = {
          token: response?.data?.token,
          user_id: response?.data?.user_id,
          serial_no: response?.data?.user?.serial_no,
          profileImage: response?.data?.user?.profile_photo_path,
        };
        await saveUserListInAsyncStorage(userData);
        await saveItemInAsyncStorage('user_role', response?.data?.user_role);
        await saveItemInAsyncStorage('token', response?.data?.token);
        await saveItemInAsyncStorage('parentLogin', 'true');
        dispatch({
          type: LOGIN,
        });
        dispatch({
          type: CHILD_LOGIN,
        });
        dispatch(clearLoadingAction());
      })
      .catch((error: any) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        dispatch(clearLoadingAction());
        console.log('Error while Login User ==> ', error);
        ToastMessage('Invalid Credentials', 3000);
      });
  };

export const forgotPasswordAction =
  (email: string) => async (dispatch: any) => {
    dispatch(loadingAction());
    const resetLinkRoute = getRoute('resetlink');

    postRequest(resetLinkRoute, {
      email: email,
    })
      .then(response => {
        dispatch({
          type: FORGOT_PASSWORD,
          payload: response,
        });
      })
      .catch((error: any) => {
        console.log('Error while forgot password ==> ', error);
        dispatch(clearLoadingAction());
        ToastMessage('No email found', 3000);
      });
  };

export const resetPasswordAction =
  (pin_code: any, password: any, password_confirmation: any) =>
  async (dispatch: any) => {
    dispatch(loadingAction());
    const resetPasswordRoute = getRoute('resetPassword');

    postRequest(resetPasswordRoute, {
      pin_code: pin_code,
      password: password,
      password_confirmation: password_confirmation,
    })
      .then(response => {
        dispatch(clearLoadingAction());
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: response,
        });
        ToastMessage('Your password has been changed!', 3000);
        RootNavigation.navigate('Log-in');
      })
      .catch((error: any) => {
        dispatch(clearLoadingAction());
        if (error?.response) {
          console.log('Error While Reseting Password', error?.response?.data);
          dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error?.response?.data,
          });
        }
        ToastMessage('Error While Reseting Password', 3000);
      });
  };

export const logOutAction =
  () => async (dispatch: (arg0: {type: any; payload: any}) => any) => {
    const logoutRoute = getRoute('logout');
    try {
      await axios.post(logoutRoute, {});
      await removeItemFromAsyncStorage('token');
      // @ts-ignore
      dispatch(clearAuthAction());
      // @ts-ignore
      dispatch(clearLoadingAction());

      ToastMessage('Logged out Successfully', 3000);
    } catch (error) {
      console.log('Error while logout user ==>', error);
    }
  };

export const clearAuthAction = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};
