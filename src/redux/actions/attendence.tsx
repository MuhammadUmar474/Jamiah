import axios from 'axios';

import getRoute from '../../helper/ApiUrls';
import {ToastMessage} from '../../utils/toastMessage';
import {
  CLASS_TEACHER_CLASSES,
  CLEAR_ATTENDENCE_ERRORS,
  SHOW_ATTENDENCE,
  SHOW_ATTENDENCE_ERROR,
  STORE_ATTENDENCE_SUCCESS,
  STUDENTS_EXAMS_RESULT,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

export const stdAttendenceViewAction =
  (date?: any) => async (dispatch: any) => {
    dispatch(loadingAction());
    try {
      const response = await axios.get(
        `student-attendance?date=${date ? date : ''}`,
      );
      dispatch({
        type: SHOW_ATTENDENCE,
        payload: response?.data?.data,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      dispatch({
        type: SHOW_ATTENDENCE_ERROR,
        payload: 'NO CLASS FOUND',
      });
      // @ts-ignore
      dispatch(clearLoadingAction());
    }
  };

export const classTeacherClassesAction = () => async (dispatch: any) => {
  const classTeacherClasses = getRoute('classTeacherClasses');
  try {
    const response = await axios.get(classTeacherClasses);
    dispatch({
      type: CLASS_TEACHER_CLASSES,
      payload: response?.data?.data?.classes,
    });
  } catch (error: any) {
    console.log('Error while getting class teacher classes ==> ', error);
  }
};

// Used to Mark Student Attendence Collectively

// export const markStdAction =
//   (stdData: any, stdAttendence: any, isEvening?: boolean) =>
//   (dispatch: any) => {
//     let currentStdIndex = stdAttendence?.findIndex(
//       (student: any) => student?.id === stdData?.id,
//     );
//     if (isEvening) {
//       if (currentStdIndex < 0) {
//         stdData['mark2'] = 2;
//         stdData['mark1'] = 0;
//         stdAttendence.push(stdData);
//       } else if (currentStdIndex >= 0) {
//         stdAttendence[currentStdIndex].mark2 = 2;
//       }
//     } else {
//       if (currentStdIndex < 0) {
//         stdData['mark1'] = 1;
//         stdData['mark2'] = 0;
//         stdAttendence.push(stdData);
//       } else if (currentStdIndex >= 0) {
//         stdAttendence[currentStdIndex].mark1 = 1;
//       }
//     }

//     dispatch({
//       type: STD_ATTENDENCE,
//       payload: {
//         stdAttendence: stdAttendence,
//       },
//     });
//   };

// Used to Remove Student Attendence Collectively

// export const removeStdAction =
//   (stdData: any, stdAttendence: any, isEvening?: boolean) =>
//   (dispatch: any) => {
//     let currentStdIndex = stdAttendence?.findIndex(
//       (student: any) => student?.id === stdData?.id,
//     );
//     if (isEvening) {
//       if (currentStdIndex >= 0) {
//         stdAttendence[currentStdIndex]['mark2'] = 0;
//       }
//     } else {
//       if (currentStdIndex >= 0) {
//         stdAttendence[currentStdIndex]['mark1'] = 0;
//       }
//     }
//     dispatch({
//       type: STD_ATTENDENCE,
//       payload: {
//         stdAttendence: stdAttendence,
//       },
//     });
//   };

export const storeAttendenceAction =
  (attendance: any) => async (dispatch: any) => {
    const storeStdAttendence = getRoute('storeStdAttendence');
    dispatch(loadingAction());
    try {
      const response = await axios.post(`${storeStdAttendence}`, attendance);
      ToastMessage('Attendence Marked Successfully', 3000);

      dispatch(clearLoadingAction());
      dispatch({
        type: STORE_ATTENDENCE_SUCCESS,
        payload: response?.data,
      });
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log(
        'Error while storing student attendence ==> ',
        error?.response?.data,
      );
    }
  };

export const examResultAction = (exam_id: any) => async (dispatch: any) => {
  const showExamResultRoute = getRoute('showExamResult');
  dispatch(loadingAction());
  try {
    const response = await axios.get(`${showExamResultRoute}/${exam_id}`);
    dispatch(clearLoadingAction());
    dispatch({
      type: STUDENTS_EXAMS_RESULT,
      payload: response?.data?.data,
    });
  } catch (error: any) {
    dispatch(clearLoadingAction());
    console.log('Error while getting exams result ==> ', error);
  }
};

export const clearAttendenceAction = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_ATTENDENCE_ERRORS,
  });
};
