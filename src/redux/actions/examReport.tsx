import axios from 'axios';
import * as RootNavigation from '../../navigation/RootNavigator';
import getRoute from '../../helper/ApiUrls';
import {
  CLASS_STUDENTS,
  SELECT_ALL_STDS,
  SELECT_SPECIFIC_STDS,
  STUDENTS_EXAMS_RESULT,
  UNSELECT_ALL_STDS,
  UNSELECT_SPECIFIC_STDS,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

export const getAllStudentsAction =
  (class_id: any) => async (dispatch: any) => {
    const classStudentsRoute = getRoute('classStudents');
    try {
      const response = await axios.get(
        `${classStudentsRoute}?class_id=${class_id ? class_id : null}`,
      );
      dispatch({
        type: CLASS_STUDENTS,
        payload: response?.data?.data?.class_students,
      });
    } catch (error: any) {
      console.log('Error while getting Class Student ==> ', error);
    }
  };

export const getExamReportAction =
  (class_id: any, exam_type_id: any, date: any, stds: []) =>
  async (dispatch: any) => {
    dispatch(loadingAction());
    const studentsReportRoute = getRoute('studentsReport');
    const class_students = {class_students: stds};
    try {
      const response = await axios.post(
        `${studentsReportRoute}?class_id=${
          class_id ? class_id : null
        }&exam_type_id=${exam_type_id ? exam_type_id : null}&date=${
          date ? date : null
        }`,
        class_students,
      );

      dispatch(clearLoadingAction());
      RootNavigation.navigate('Exam-Result');

      dispatch({
        type: STUDENTS_EXAMS_RESULT,
        payload: response?.data?.data,
      });
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log('Error while getting Exam Report ==> ', error);
    }
  };

export const selectAllStdAction = (classStds: []) => async (dispatch: any) => {
  try {
    dispatch({
      type: SELECT_ALL_STDS,
      payload: classStds.map((data: any) => ({
        name: data?.name,
        id: data?.id,
        image: data?.image,
        checked: true,
      })),
    });
  } catch (error: any) {
    console.log('Error while Selecting all Students ==> ', error);
  }
};

export const unSelectAllStdAction =
  (classStds: []) => async (dispatch: any) => {
    try {
      dispatch({
        type: UNSELECT_ALL_STDS,
        payload: classStds.map((data: any) => ({
          name: data?.name,
          id: data?.id,
          image: data?.image,
          checked: false,
        })),
      });
    } catch (error: any) {
      console.log('Error while unSelecting all Students ==> ', error);
    }
  };

export const selectSpecificStdAction =
  (stdData: any, classStudents: any) => async (dispatch: any) => {
    let currentStdIndex = classStudents?.findIndex(
      (student: any) => student?.id === stdData,
    );
    try {
      if (currentStdIndex >= 0) {
        classStudents[currentStdIndex]['checked'] = true;
      }
      dispatch({
        type: SELECT_SPECIFIC_STDS,
        payload: classStudents,
      });
    } catch (error: any) {
      console.log('Error while Selecting specific Student ==> ', error);
    }
  };

export const unSelectSpecificStdAction =
  (stdData: any, classStudents: any) => async (dispatch: any) => {
    let currentStdIndex = classStudents?.findIndex(
      (student: any) => student?.id === stdData,
    );
    try {
      if (currentStdIndex >= 0) {
        classStudents[currentStdIndex]['checked'] = false;
      }
      dispatch({
        type: UNSELECT_SPECIFIC_STDS,
        payload: classStudents,
      });
    } catch (error: any) {
      console.log('Error while unSelecting specific Student ==> ', error);
    }
  };
