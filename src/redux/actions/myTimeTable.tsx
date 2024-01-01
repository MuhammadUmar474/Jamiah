import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {TIMETABLE} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

export const timeTableAction = (day?: any) => async (dispatch: any) => {
  dispatch(loadingAction());
  try {
    const response = await axios.get(`/my-timetable?day=${day ? day : ''}`);
    dispatch({
      type: TIMETABLE,
      payload: response?.data?.data,
    });
    dispatch(clearLoadingAction());
  } catch (error: any) {
    console.log('Error while getting my Time Table ==> ', error);
    dispatch(clearLoadingAction());
  }
};
