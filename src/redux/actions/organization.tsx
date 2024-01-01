import axios from 'axios';
import getRoute from '../../helper/ApiUrls';

import {
  CLEAR_ORGANIZATION,
  CURRENT_ORGANIZATION,
  FIND_ORGANIZATION,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

export const findOrganizationAction =
  (name: string) => async (dispatch: any) => {
    dispatch(loadingAction());
    const findOrganizationRoute = getRoute('findOrganization');
    try {
      const response = await axios.get(`${findOrganizationRoute}?name=${name}`);
      dispatch({
        type: FIND_ORGANIZATION,
        payload: response?.data,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log('Error while getting Organization ==> ', error);
    }
  };

export const currentOrganizationAction =
  (organization: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: CURRENT_ORGANIZATION,
        payload: organization,
      });
    } catch (error: any) {
      console.log('Error while saving Current Organization ==> ', error);
    }
  };

export const clearOrganizationAction = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_ORGANIZATION,
  });
};
