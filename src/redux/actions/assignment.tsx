import axios from 'axios';
import getRoute from '../../helper/ApiUrls';

import {ToastMessage} from '../../utils/toastMessage';

import {
  ADD_ASSIGNMENT_FAILURE,
  ALL_ASSIGNMENTS,
  FILTERED_ASSIGNMENTS,
} from '../types/types';
import {clearLoadingAction, loadingAction} from './loading';

export const allAssignmentsAction =
  (page?: number, pagination?: boolean) => async (dispatch: any) => {
    dispatch(loadingAction());
    try {
      const assignmentRoute = getRoute('assignment');
      const response = await axios.get(`${assignmentRoute}?page=${page}`);
      dispatch({
        type: ALL_ASSIGNMENTS,
        payload: response?.data?.data?.data,
        pagination,
      });
      dispatch(clearLoadingAction());
    } catch (error: any) {
      dispatch(clearLoadingAction());
      console.log('Error while getting Assignments ==> ', error);
    }
  };

export const filteredAssignmentsAction =
  (class_id?: any, subject_id?: any) => async (dispatch: any) => {
    const assignmentRoute = getRoute('assignment');
    try {
      // &subject_id=${subject_id}&page=${page}
      const response = await axios.get(
        `${assignmentRoute}?class_id=${class_id}&subject_id=${subject_id}`,
      );
      dispatch({
        type: FILTERED_ASSIGNMENTS,
        payload: response?.data?.data?.data,
      });
    } catch (error: any) {
      console.log('Error while getting Filtered Assignments ==> ', error);
    }
  };

export const addAssignmentAction =
  (
    class_id: number,
    subject_id: number,
    name: string,
    assignment_deadline: any,
    total_mark: string,
    assignment_file?: any,
    description?: string,
    successCall?: any,
    assign_id?: number,
  ) =>
  async (dispatch: any) => {
    dispatch(loadingAction());
    const assignmentRoute = getRoute('assignment');
    axios
      .post(`${assignmentRoute}?assignment_id=${assign_id}`, {
        class_id: class_id,
        subject_id: subject_id,
        name: name,
        description: description ? description : '',
        assignment_deadline: assignment_deadline,
        total_mark: total_mark,
        assignment_file: assignment_file ? assignment_file : '',
      })
      .then(response => {
        console.log('addAssignmentAction', response?.data);
        dispatch(clearLoadingAction());
        dispatch(allAssignmentsAction());
        successCall && successCall();
      })
      .catch((error: any) => {
        dispatch(clearLoadingAction());
        if (error?.response) {
          console.log('Error Adding Assignment', error?.response?.data); // => the response payload
          dispatch({
            type: ADD_ASSIGNMENT_FAILURE,
            payload: error?.response?.data,
          });
        }
        ToastMessage('Error while adding Assignment', 3000);
      });
  };

export const deleteAssignmentAction = (id: Number) => async (dispatch: any) => {
  const assignmentRoute = getRoute('assignment');
  dispatch(loadingAction());
  try {
    const response = await axios.delete(`${assignmentRoute}/${id}`);
    ToastMessage(response?.data?.message, 3000);
    dispatch(allAssignmentsAction());
    dispatch(clearLoadingAction());
  } catch (error: any) {
    dispatch(clearLoadingAction());
    console.log('Error while Deleting Assignment ==> ', error);
  }
};

// export const addAssignmentMarksOfStdAction =
//   (stdData: any, marks: any, stdToAddMarks: any) => (dispatch: any) => {
//     let currentStdIndex = stdToAddMarks?.findIndex(
//       (student: any) => student?.id === stdData?.id,
//     );
//     if (currentStdIndex < 0) {
//       stdData['mark'] = marks;
//       stdToAddMarks.push(stdData);
//     } else if (currentStdIndex >= 0) {
//       stdToAddMarks[currentStdIndex].mark = marks;
//     }

//     dispatch({
//       type: STUDENTS_TO_ADD_EDIT_ASSIGNMENT_MARKS,
//       payload: {
//         stdToAddAssignmentMarks: stdToAddMarks,
//       },
//     });
//   };

// export const storeStdAssignmentMarksAction =
//   (assignment_id: any, stdMarksList: any, successCall: any) =>
//   async (dispatch: any) => {
//     const assignmentRoute = getRoute('assignment');
//     const exam_mark = {exam_mark: stdMarksList};
//     dispatch(loadingAction());
//     try {
//       await axios.post(`${assignmentRoute}/${assignment_id}/create`, exam_mark);
//       ToastMessage('Assignment Marks Added Successfully', 3000);

//       dispatch(allAssignmentsAction());
//       dispatch(clearLoadingAction());
//       successCall && successCall();
//     } catch (error: any) {
//       dispatch(clearLoadingAction());
//       console.log(
//         'Error while storing student Assignment Marks ==> ',
//         error?.response?.data,
//       );
//     }
//   };
