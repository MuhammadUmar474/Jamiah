import {
  ADD_ASSIGNMENT_FAILURE,
  ADD_ASSIGNMENT_SUCCESS,
  ALL_ASSIGNMENTS,
  FILTERED_ASSIGNMENTS,
  STUDENTS_TO_ADD_EDIT_ASSIGNMENT_MARKS,
} from '../types/types';

const initial_state = {
  assignments: [],
  filtered_assignments: [],
  students_to_add_assignment_marks: [],
  errors: {},
};

export const assignmentReducer = (state = initial_state, action: any) => {
  const {payload, pagination} = action;
  switch (action.type) {
    case ALL_ASSIGNMENTS:
      return {
        ...state,
        assignments: pagination ? [...state.assignments, ...payload] : payload,
      };

    case FILTERED_ASSIGNMENTS:
      return {
        ...state,
        filtered_assignments: payload,
      };

    case ADD_ASSIGNMENT_FAILURE:
      return {
        ...state,
        errors: payload,
      };

    case STUDENTS_TO_ADD_EDIT_ASSIGNMENT_MARKS:
      return {
        ...state,
        students_to_add_assignment_marks: payload?.stdToAddAssignmentMarks?.map(
          (item: any) => ({
            id: item?.id,
            mark: item?.mark,
            ...item,
          }),
        ),
      };

    default:
      return {...state};
  }
};
