import axios from 'axios';
import Toast from 'react-native-simple-toast';

import getRoute from '../../helper/ApiUrls';
import {
  CLEAR_LEAVES,
  FILTERED_LEAVES,
  LEAVES,
  LEAVE_TYPES,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

const showToast = (message: string, duration: number | undefined) => {
  Toast.show(message, duration ? Toast.LONG : Toast.SHORT);
};

export const LeavesTypesAction = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`/leave-type`);
    dispatch({
      type: LEAVE_TYPES,
      payload: response?.data?.data?.leave_types,
    });
  } catch (error: any) {
    console.log('Error while getting Leaves types ==> ', error);
  }
};

export const LeavesAction =
  (page?: number, pagination?: any) => async (dispatch: any) => {
    try {
      dispatch(loadingAction());
      const response = await axios.get(`/leaves?page=${page}`);
      dispatch({
        type: LEAVES,
        payload: response?.data?.data?.leaves?.data,
        pagination,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      console.log('Error while getting Leaves ==> ', error);
      dispatch(clearLoadingAction());
    }
  };
export const FilteredLeavesAction =
  (from_date: any, to_date: any, type?: any) => async (dispatch: any) => {
    try {
      dispatch(loadingAction());
      const response = await axios.get(
        `/leaves?leave_type_id=${type ? type : ''}&from_date=${
          from_date ? from_date : ''
        }&to_date=${to_date ? to_date : ''}`,
      );
      dispatch({
        type: FILTERED_LEAVES,
        payload: response?.data?.data?.leaves?.data,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      console.log('Error while getting filtered Leaves ==> ', error);
      dispatch(clearLoadingAction());
    }
  };

export const ApplyLeavesAction =
  (
    from_date: any,
    to_date: any,
    leave_type_id: any,
    description: string,
    successCall: any,
  ) =>
  async (dispatch: any) => {
    const studentApplyLeaveRoute = getRoute('studentApplyLeave');
    try {
      dispatch(loadingAction());
      await axios
        .post(studentApplyLeaveRoute, {
          from_date: from_date,
          to_date: to_date,
          leave_type_id: leave_type_id,
          description: description,
        })
        .then(response => {
          successCall && successCall();
          showToast(response?.data?.message, 3000);
          dispatch(clearLoadingAction());
          dispatch(LeavesAction(1, true));
        });
    } catch (error) {
      dispatch(clearLoadingAction());
      console.log('Error while applying Leaves ==> ', error);
    }
  };

export const clearLeavesAction = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_LEAVES,
  });
};
