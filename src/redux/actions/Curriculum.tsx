import axios from 'axios';
import Toast from 'react-native-simple-toast';

import getRoute from '../../helper/ApiUrls';
import {
  CURRICULUM_LIST,
  MAIN_HEADING,
  SHOW_CURRICULUM,
  SUBJECTS_GRADES,
  SUB_HEADING,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

const showToast = (message: string, duration: number | undefined) => {
  Toast.show(message, duration ? Toast.LONG : Toast.SHORT);
};

export const allCurriculumsAction = () => async (dispatch: any) => {
  const curriculumListRoute = getRoute('curriculumList');
  dispatch(loadingAction());
  try {
    const response = await axios.get(`${curriculumListRoute}`);
    dispatch({
      type: CURRICULUM_LIST,
      payload: response?.data?.data?.grades,
    });
    dispatch(clearLoadingAction());
  } catch (error: any) {
    dispatch(clearLoadingAction());
    console.log('Error while getting curriculum list ==> ', error);
  }
};
export const showCurriculumAction =
  (grade_id: number, subject_id: number) => async (dispatch: any) => {
    const curriculumListRoute = getRoute('curriculumList');
    dispatch(loadingAction());
    try {
      const response = await axios.get(
        `${curriculumListRoute}?grade_id=${grade_id}&subject_id=${subject_id}`,
      );
      dispatch({
        type: SHOW_CURRICULUM,
        payload: response?.data?.data?.curriculums,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log('Error while getting single curriculum ==> ', error);
    }
  };

export const addCurriculumAction =
  (
    name: string,
    description: string,
    grade_id: number,
    subject_id: number,
    parent_id: number,
    successCall: any,
  ) =>
  async (dispatch: any) => {
    dispatch(loadingAction());

    const addCurriculumRoute = getRoute('addCurriculum');
    try {
      await axios.post(addCurriculumRoute, {
        name: name,
        description: description ? description : '',
        selectedGrade: grade_id,
        selectedSubject: subject_id,
        parent_id: parent_id,
      });
      dispatch(clearLoadingAction());
      dispatch(allCurriculumsAction());
      successCall && successCall();
    } catch (error: any) {
      dispatch(clearLoadingAction());

      console.log('Error while Adding curriculum ==> ', error);
    }
  };

export const deleteCurriculumAction = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.delete(`/curriculums/${id}`);
    showToast(response?.data?.message, 3000);
  } catch (error: any) {
    console.log('Error while deleting Curriculum Action ==> ', error);
  }
};

export const getSubjectsGradesAction = () => async (dispatch: any) => {
  dispatch(loadingAction());
  const subjectGradesRoute = getRoute('subjectGrades');
  try {
    const response = await axios.get(subjectGradesRoute);
    dispatch({
      type: SUBJECTS_GRADES,
      payload: response?.data?.data,
    });
    dispatch(clearLoadingAction());
  } catch (error: any) {
    console.log('Error while subjects gardes ==> ', error);
    dispatch(clearLoadingAction());
  }
};

export const getMainHeadingsAction =
  (grade_id: any, subject_id: any) => async (dispatch: any) => {
    const mainHeadingRoute = getRoute('mainHeading');

    try {
      const response = await axios.get(
        `${mainHeadingRoute}?grade_id=${
          grade_id ? grade_id : null
        }&subject_id=${subject_id ? subject_id : null}`,
      );
      dispatch({
        type: MAIN_HEADING,
        payload: response?.data?.data?.mainHeadings,
      });
    } catch (error: any) {
      console.log('Error while getting Main Headings ==> ', error);
    }
  };

export const getSubHeadAction = (parent_id: any) => async (dispatch: any) => {
  const subHeadingRoute = getRoute('subHeading');

  try {
    const response = await axios.get(
      `${subHeadingRoute}?parent_id=${parent_id ? parent_id : null}`,
    );
    dispatch({
      type: SUB_HEADING,
      payload: response?.data?.data?.subHeadings,
    });
  } catch (error: any) {
    console.log('Error while getting Sub Headings ==> ', error);
  }
};
