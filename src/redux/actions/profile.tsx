import axios from 'axios';

import getRoute from '../../helper/ApiUrls';
import {USER_PROFILE} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

export const profileAction = () => async (dispatch: any) => {
  dispatch(loadingAction());
  const profileRoute = getRoute('profile');
  try {
    const response = await axios.get(profileRoute);
    dispatch({
      type: USER_PROFILE,
      payload: response?.data?.data,
    });
    dispatch(clearLoadingAction());
  } catch (error: any) {
    console.log('Error while getting profile ==> ', error);
    dispatch(clearLoadingAction());
  }
};
