import axios from 'axios';

import * as RootNavigation from '../../navigation/RootNavigator';
import getRoute from '../../helper/ApiUrls';
import {
  ADD_EXAM_TYPE_FAILURE,
  ADD_EXAM_TYPE_SUCCESS,
  CLEAR_EXAM_TYPES_ERRORS,
  GET_ALL_EXAM_TYPES,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';
import {ToastMessage} from '../../utils/toastMessage';

export const addExamTypeAction = (name: string) => async (dispatch: any) => {
  const examTypeRoute = getRoute('examType');
  dispatch(loadingAction());
  try {
    const response = await axios.post(examTypeRoute, {
      name: name,
    });
    RootNavigation.navigate('Exam-type');
    ToastMessage(response?.data?.message, 3000);
    dispatch(getExamTypesAction());
    dispatch({
      type: ADD_EXAM_TYPE_SUCCESS,
      payload: response?.data,
    });
    dispatch(clearLoadingAction());
  } catch (error: any) {
    dispatch(clearLoadingAction());
    console.log('Error while adding Exam Type ==> ', error?.response?.data);
    dispatch({
      type: ADD_EXAM_TYPE_FAILURE,
      payload: error?.response?.data,
    });
  }
};

export const getExamTypesAction = () => async (dispatch: any) => {
  const examTypeRoute = getRoute('examType');

  dispatch(loadingAction());
  try {
    const response = await axios.get(examTypeRoute);
    dispatch({
      type: GET_ALL_EXAM_TYPES,
      payload: response?.data?.data?.exam_types,
    });
    dispatch(clearLoadingAction());
  } catch (error: any) {
    dispatch(clearLoadingAction());
    console.log('Error while getting Exam Types ==> ', error);
  }
};

export const editExamTypesAction =
  (id: Number, name: string) => async (dispatch: any) => {
    const examTypeRoute = getRoute('examType');

    dispatch(loadingAction());
    try {
      const response = await axios.put(`${examTypeRoute}/${id}`, {name: name});
      RootNavigation.navigate('Exam-type');
      ToastMessage(response?.data?.message, 3000);
      dispatch(getExamTypesAction());
      dispatch(clearLoadingAction());
    } catch (error: any) {
      dispatch(clearLoadingAction());
      dispatch({
        type: ADD_EXAM_TYPE_FAILURE,
        payload: error?.response?.data,
      });
      console.log('Error while getting Exam Types ==> ', error);
    }
  };
export const deleteExamTypesAction = (id: Number) => async (dispatch: any) => {
  const examTypeRoute = getRoute('examType');

  dispatch(loadingAction());
  try {
    await axios.delete(`${examTypeRoute}/${id}`);
    dispatch(getExamTypesAction());
    dispatch(clearLoadingAction());
  } catch (error: any) {
    dispatch(clearLoadingAction());
    console.log('Error while deleting Exam Types ==> ', error);
  }
};

export const clearExamTypeErrorsAction = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_EXAM_TYPES_ERRORS,
  });
};
