import axios from 'axios';

import getRoute from '../../helper/ApiUrls';
import {TEACHER_CLASSES} from '../types/types';

export const teacherClassesAction =
  (class_id?: any) => async (dispatch: any) => {
    const teacherClassesRoute = getRoute('teacherClasses');
    try {
      const response = await axios.get(
        `${teacherClassesRoute}?class_id=${class_id ? class_id : null}`,
      );
      dispatch({
        type: TEACHER_CLASSES,
        payload: response?.data?.data?.classes,
      });
    } catch (error: any) {
      console.log('Error while getting teacher classes ==> ', error);
    }
  };
