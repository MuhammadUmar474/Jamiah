import axios from 'axios';

import getRoute from '../../helper/ApiUrls';
import {DASHBOARD} from '../types/types';

export const dashBoardAction = () => async (dispatch: any) => {
  const dashBoardRoute = getRoute('dashBoard');
  try {
    const response = await axios.get(dashBoardRoute);
    dispatch({
      type: DASHBOARD,
      payload: response?.data?.data,
    });
  } catch (error: any) {
    console.log('Error while getting DashBoard ==> ', error);
  }
};
