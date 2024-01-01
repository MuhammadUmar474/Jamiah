import axios from 'axios';
import getRoute from '../../helper/ApiUrls';

import {ToastMessage} from '../../utils/toastMessage';

import {
  ADD_EXAMS_FAILURE,
  CLASS_SUBJECTS,
  EXAMS,
  FILTERED_EXAMS,
  GET_STD_TO_ADD_EDIT_EXAM_MARKS,
  GET_TEACHER_CLASSES,
  STUDENTS_TO_ADD_EDIT_MARKS,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

export const allExamsAction =
  (page?: number, pagination?: boolean) => async (dispatch: any) => {
    dispatch(loadingAction());
    try {
      const response = await axios.get(`/exams?page=${page}`);
      dispatch({
        type: EXAMS,
        payload: response?.data?.data?.exams?.data,
        pagination,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log('Error while getting Exams ==> ', error);
    }
  };

export const filteredExamsAction =
  (
    class_id?: any,
    subject_id?: any,
    exam_type_id?: any,
    date?: any,
    page?: number,
  ) =>
  async (dispatch: any) => {
    try {
      const response = await axios.get(
        `/exams?class_id=${class_id ? class_id : null}&subject_id=${
          subject_id ? subject_id : null
        }&exam_type_id=${exam_type_id ? exam_type_id : null}&date=${
          date ? date : ''
        }&page=${page}`,
      );
      dispatch({
        type: FILTERED_EXAMS,
        payload: response?.data?.data?.exams?.data,
      });
    } catch (error: any) {
      console.log('Error while getting Filtered Exams ==> ', error);
    }
  };
export const filteredStdExamsAction =
  (status?: any, from?: any, to?: any) => async (dispatch: any) => {
    try {
      const response = await axios.get(
        `/exams?status=${status ? status : null}&from=${from ? from : ''}&to=${
          to ? to : ''
        }`,
      );
      dispatch({
        type: FILTERED_EXAMS,
        payload: response?.data?.data?.exams?.data,
      });
    } catch (error: any) {
      console.log('Error while getting Filtered Exams ==> ', error);
    }
  };

export const getTeacherClassesAction = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`/teacher-classes`);
    dispatch({
      type: GET_TEACHER_CLASSES,
      payload: response?.data?.data?.classes,
    });
  } catch (error: any) {
    console.log('Error while getting Leaves types ==> ', error);
  }
};

export const getClassSubjectsAction =
  (class_id?: any) => async (dispatch: any) => {
    try {
      const response = await axios.get(
        `/class-subjects?class_id=${class_id ? class_id : null}`,
      );
      dispatch({
        type: CLASS_SUBJECTS,
        payload: response?.data?.data?.subjects,
      });
    } catch (error: any) {
      console.log('Error while getting Leaves types ==> ', error);
    }
  };

export const addExamAction =
  (
    class_id: number,
    subject_id: number,
    name: string,
    valueExamType: number,
    exam_date: string,
    time_from: string,
    time_to: string,
    room: string,
    total_mark: string,
    successCall: any,
    exam_id?: number,
  ) =>
  async (dispatch: any) => {
    dispatch(loadingAction());
    const addExamRoute = getRoute('addExams');
    axios
      .post(`${addExamRoute}?exam_id=${exam_id}`, {
        class_id: class_id,
        subject_id: subject_id,
        exam_type_id: valueExamType,
        name: name,
        exam_date: exam_date,
        time_from: time_from,
        time_to: time_to,
        room: room,
        total_mark: total_mark,
      })
      .then(() => {
        dispatch(allExamsAction());
        dispatch(clearLoadingAction());
        successCall && successCall();
      })
      .catch((error: any) => {
        dispatch(clearLoadingAction());
        if (error?.response) {
          console.log('Error Adding Exam', error?.response?.data); // => the response payload
          dispatch({
            type: ADD_EXAMS_FAILURE,
            payload: error?.response?.data,
          });
        }
        ToastMessage('Error while adding Exam', 3000);
      });
  };

export const getStdToAddEditExamMarksAction =
  (id: number) => async (dispatch: any) => {
    const editExamMarkRoute = getRoute('editExamMark');

    dispatch(loadingAction());
    try {
      const response = await axios.get(`${editExamMarkRoute}/${id}/marks`);
      dispatch({
        type: GET_STD_TO_ADD_EDIT_EXAM_MARKS,
        payload: response?.data?.data,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log(
        'Error while getting Students for editing Exam Marks ==> ',
        error,
      );
    }
  };

export const deleteExamAction = (id: Number) => async (dispatch: any) => {
  const examTypeRoute = getRoute('addExams');

  dispatch(loadingAction());
  try {
    const response = await axios.delete(`${examTypeRoute}/${id}`);
    ToastMessage(response?.data?.message, 3000);
    dispatch(allExamsAction());
    dispatch(clearLoadingAction());
  } catch (error: any) {
    dispatch(clearLoadingAction());
    console.log('Error while Deleting Exam Types ==> ', error);
  }
};

export const addmarksOfStdAction =
  (stdData: any, marks: any, stdToAddMarks: any) => (dispatch: any) => {
    let currentStdIndex = stdToAddMarks?.findIndex(
      (student: any) => student?.id === stdData?.id,
    );
    if (currentStdIndex < 0) {
      stdData['mark'] = marks;
      stdToAddMarks.push(stdData);
    } else if (currentStdIndex >= 0) {
      stdToAddMarks[currentStdIndex].mark = marks;
    }

    dispatch({
      type: STUDENTS_TO_ADD_EDIT_MARKS,
      payload: {
        stdToAddMarks: stdToAddMarks,
      },
    });
  };

export const storeStdExamMarksAction =
  (exam_id: any, stdMarksList: any, successCall: any) =>
  async (dispatch: any) => {
    const storeStdExamMarksRoute = getRoute('storeExamMark');
    const exam_mark = {exam_mark: stdMarksList};
    dispatch(loadingAction());
    try {
      await axios.post(
        `${storeStdExamMarksRoute}/${exam_id}/create`,
        exam_mark,
      );
      ToastMessage('Marks Added Successfully', 3000);

      dispatch(allExamsAction());
      dispatch(clearLoadingAction());
      successCall && successCall();
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log(
        'Error while storing student Exam Marks ==> ',
        error?.response?.data,
      );
    }
  };

export const updateStdExamMarksAction =
  (exam_id: any, stdMarksList: any, successCall: any) =>
  async (dispatch: any) => {
    const storeStdExamMarksRoute = getRoute('storeExamMark');
    const exam_mark = {exam_mark: stdMarksList};
    dispatch(loadingAction());
    try {
      const data = await axios.post(
        `${storeStdExamMarksRoute}/${exam_id}/create`,
        exam_mark,
      );
      ToastMessage('Marks updated Successfully', 3000);
      dispatch(allExamsAction());
      dispatch(clearLoadingAction());
      successCall && successCall();
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log(
        'Error while storing student Exam Marks ==> ',
        error?.response?.data,
      );
    }
  };
